const axios = require("axios");
//相关参数保存在文件内
const {
    jueJinConfig,
    pushPlus
} = require("./config");

// 请求配置
axios.defaults.baseURL = jueJinConfig.baseUrl
axios.defaults.headers['cookie'] = jueJinConfig.cookie

// 相应拦截处理
axios.interceptors.response.use((response) => {
    const {
        data
    } = response
    if (data.err_msg === 'success' && data.err_no === 0) {
        return data
    } else {
        return Promise.reject(data.err_msg)
    }
}, (error) => {
    return Promise.reject(error)
})

/**
 * pushplus消息推送，关注wx公众号可以调用他们的接口进行wx消息推送
 * @param {String} title 
 * @param {JSON} content 
 */
const pushMsg = async (title, content) => {
    console.log(`\n------${getNowTime(`toLocaleString`)} 开始推送wx消息 ------`);
    //获取配置参数
    const {
        url,
        token
    } = pushPlus;
    const res = await axios({
        url,
        method: `get`,
        params: {
            token,
            template: `json`,
            title,
            content,
        }
    });
    if (res && res.data) {
        console.log(res);
        console.log(`\n ${JSON.stringify(res.data)} \n\n------ ${getNowTime(`toLocaleTimeString`)} 推送成功 ------\n`);
    } else {
        console.log(res);
        console.log(`\n------ ${getNowTime(`toLocaleTimeString`)} 推送失败 ------ \n`);
    }
}

/**
 * 获取当前时间的格式化时间
 * @param {String} key 调用js日期函数字符串
 * @returns 当前时间格式化的字符串
 */
const getNowTime = (key) => {
    let nowTime = ``;
    try {
        nowTime = new Date()[key]();
    } catch (e) {
        nowTime = `获取时间函数错误！`;
        console.error(`请传入日期函数 —— ${e}`);
    }
    return nowTime;
}

/**
 * 查看今天是否已经签到
 *
 * @return {Boolean} 是否签到过 
 */
const checkSignInStatus = async () => {
    try {
        const signInStatusRes = await axios({
            url: jueJinConfig.api.checkSignInStatus,
            method: 'get'
        })
        return signInStatusRes.data
    } catch (error) {
        throw `查询签到失败!【${error}】`
    }
}

/**
 * 签到
 *
 * @return {string} 签到详情  
 */
const signIn = async () => {
    try {
        const signInRes = await axios({
            url: jueJinConfig.api.checkIn,
            method: 'post'
        })
        console.log(`签到成功+${signInRes.data.incr_point}矿石`)
        return `签到成功+${signInRes.data.incr_point}矿石}`
    } catch (error) {
        throw `签到失败!【${error}】`
    }
}

/**
 * 查询当前矿石
 *
 * @return {string} 返回当前的矿石数
 */
const getCurrentPoints = async () => {
    try {
        const currentPointRes = await axios({
            url: jueJinConfig.api.getCurrentPoint,
            method: 'get'
        })
        console.log(`当前总矿石数: ${currentPointRes.data}`)
        return `当前总矿石数: ${currentPointRes.data}`
    } catch (error) {
        throw `查询矿石失败!${error.err_msg}`
    }
}

/**
 * 查询免费抽奖次数
 *
 * @return {Boolean} 是否有免费抽奖次数
 */
const getlotteryStatus = async () => {
    try {
        const getlotteryStatusRes = await axios({
            url: jueJinConfig.api.getlotteryStatus,
            method: 'get'
        })
        return getlotteryStatusRes.data.free_count === 0
    } catch (error) {
        throw `查询免费抽奖失败！【${error}】`
    }
}

/**
 * 获取沾喜气列表用户historyId
 *
 * @return {String} 被沾的幸运儿的history_id
 */
const getLuckyUserHistoryId = async () => {
    try {
        // 接口为分页查询  默认查询条10条数据 {page_no: 0, page_size: 5}
        const luckyList = await axios({
            url: jueJinConfig.api.getLuckyUserList,
            method: 'post'
        })
        // 随机抽取一位幸运儿  沾他
        return luckyList.data.lotteries[Math.floor(Math.random() * luckyList.data.lotteries.length)].history_id
    } catch (error) {
        throw `获取沾喜气列表用户historyId失败`
    }
}

/**
 * 占喜气
 * 
 * @return {string} 当前幸运值
 */
const dipLucky = async () => {
    try {
        // 获取historyId
        const historyId = await getLuckyUserHistoryId()
        // 沾喜气接口   传递lottery_history_id
        const dipLuckyRes = await axios({
            url: jueJinConfig.api.dipLucky,
            method: 'post',
            data: {
                lottery_history_id: historyId
            }
        })
        console.log(`占喜气成功! 🎉 【当前幸运值：${dipLuckyRes.data.total_value}/6000】`)
        return `占喜气成功! 🎉 【当前幸运值：${dipLuckyRes.data.total_value}/6000】`
    } catch (error) {
        throw `占喜气失败！ ${error}`
    }
}

/**
 * 抽奖
 *
 * @return {string} 抽奖结果
 */
const draw = async () => {
    try {
        const freeCount = await getlotteryStatus()
        if (freeCount) {
            // 没有免费抽奖次数
            throw '今日免费抽奖已用完'
        }
        // 开始抽奖
        const drawRes = await axios({
            url: jueJinConfig.api.draw,
            method: 'post'
        })
        console.log(`恭喜你抽到【${drawRes.data.lottery_name}】🎉`)
        return `恭喜你抽到【${drawRes.data.lottery_name}】🎉`
    } catch (error) {
        console.error(`抽奖失败!=======> 【${error}】`)
    }
}

/**
 *查询签到天数
 *
 * @return {string} cont_count 连续签到天数 sum_count 总签到天数
 */
const getSignInDays = async () => {
    try {
        const signInDaysRes = await axios({
            url: jueJinConfig.api.getSignInDays,
            method: 'get'
        })
        console.log(`连续签到【${signInDaysRes.data.cont_count}】天  总签到天数【${signInDaysRes.data.sum_count}】  掘金不停 签到不断💪`)
        return `连续签到【${signInDaysRes.data.cont_count}】天  总签到天数【${signInDaysRes.data.sum_count}】  掘金不停 签到不断💪`
    } catch (error) {
        throw `查询签到天数失败!🙁【${signInDaysRes.err_msg}】`
    }
}

/**
 * 开始签到
 * 
 */
const start = async () => {
    try {
        // 查询今天是否签到没
        const signInStatusRes = await checkSignInStatus()

        if (!signInStatusRes) {
            // 签到
            const signInRes = await signIn()

            // 查询签到天数
            const signInDaysRes = await getSignInDays()

            // 签到成功 去抽奖
            const drawRes = await draw()

            // 沾喜气
            const dipLuckyRes = await dipLucky()

            // 查询总共的矿石数
            const currentPointRes = await getCurrentPoints()

            //签到成功后推送消息
            pushMsg(`掘金签到结果`, {
                '签到详情': signInRes,
                '签到天数': signInDaysRes,
                '抽奖结果': drawRes,
                '沾喜气结果': dipLuckyRes,
                '矿石数': currentPointRes
            });
        } else {
            console.log('今日已经签到 ✅')
        }

    } catch (error) {
        console.error(`签到失败!=======> ${error}`)
    }
}

module.exports = start