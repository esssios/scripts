//config.js
//查询今日是否签到成功接口  https://api.juejin.cn/growth_api/v1/get_today_status
module.exports = {
    //掘金相关参数
    jueJinConfig: {
        // 请求地址
        baseUrl: 'https://api.juejin.cn',
        // api地址
        api: {
            // 签到
            checkIn: '/growth_api/v1/check_in',
            // 查询签到
            checkSignInStatus: '/growth_api/v1/get_today_status',
            // 查询签到天数
            getSignInDays: '/growth_api/v1/get_counts',
            // 查询当前矿石
            getCurrentPoint: '/growth_api/v1/get_cur_point',
            // 查询抽奖
            getlotteryStatus: '/growth_api/v1/lottery_config/get',
            // 抽奖
            draw: '/growth_api/v1/lottery/draw',
            // 获取沾喜气列表用户
            getLuckyUserList: '/growth_api/v1/lottery_history/global_big',
            // 沾喜气
            dipLucky: '/growth_api/v1/lottery_lucky/dip_lucky'
        },
        cookie: ``, //用自己的
    },
    //消息推送相关参数 关注pushplus微信公众号可以获得一对一推送的调用参数，不是推广
    pushPlus: {
        url: `http://www.pushplus.plus/send`, //微信推送URL
        token: ``, //没有广告啊，这是免费的
    }
}