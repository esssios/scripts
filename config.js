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
        cookie: `_ga=GA1.2.2043563656.1641540359; MONITOR_WEB_ID=93f844fe-ccb7-488f-86e2-decd5877a454; passport_csrf_token_default=62adea46285c484a07c05258c400f383; passport_csrf_token=62adea46285c484a07c05258c400f383; passport_auth_status=8415e76ff1d6dec412b7aec5ed9adbf5%2C; passport_auth_status_ss=8415e76ff1d6dec412b7aec5ed9adbf5%2C; sid_guard=a8b51e068bc76130e43721aff2561607%7C1642404985%7C5184000%7CFri%2C+18-Mar-2022+07%3A36%3A25+GMT; uid_tt=a25d422681f54146a43c18d749146550; uid_tt_ss=a25d422681f54146a43c18d749146550; sid_tt=a8b51e068bc76130e43721aff2561607; sessionid=a8b51e068bc76130e43721aff2561607; sessionid_ss=a8b51e068bc76130e43721aff2561607; sid_ucp_v1=1.0.0-KDY4YTg4YmNmZGU1Yjg5M2ZmMGIyNzM5NGM2MTQ0OGFkYWJjNmI4NmQKFwiN-7DS0Y2kBBD5uJSPBhiwFDgCQPEHGgJsZiIgYThiNTFlMDY4YmM3NjEzMGU0MzcyMWFmZjI1NjE2MDc; ssid_ucp_v1=1.0.0-KDY4YTg4YmNmZGU1Yjg5M2ZmMGIyNzM5NGM2MTQ0OGFkYWJjNmI4NmQKFwiN-7DS0Y2kBBD5uJSPBhiwFDgCQPEHGgJsZiIgYThiNTFlMDY4YmM3NjEzMGU0MzcyMWFmZjI1NjE2MDc; n_mh=s6vgIgOcsB7fM94IfasqIIuMZ2pGbusWUSsircygZ9E; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227050362121100297758%2522%252C%2522ssid%2522%253A%25224e171765-3e82-45e2-82bd-dad7a0c05725%2522%252C%2522user_unique_id%2522%253A%25227050362121100297758%2522%252C%2522timestamp%2522%253A1641540358940%257D; _gid=GA1.2.702385174.1643034724`, //用自己的
    },
    //消息推送相关参数 关注pushplus微信公众号可以获得一对一推送的调用参数，不是推广
    pushPlus: {
        url: `http://www.pushplus.plus/send`, //微信推送URL
        token: `0e588d81cd3f4858bbc302009c51ff0f`, //没有广告啊，这是免费的
    }
}