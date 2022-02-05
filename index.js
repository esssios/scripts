const schedule = require('node-schedule');
const start = require("./jueJinSignIn")
const rule = new schedule.RecurrenceRule();
rule.hour = 10;
rule.minute = 20;
rule.tz = 'Asia/Shanghai';

const autoSign = () => {
    //每天在6:00-6:10随机签到
    schedule.scheduleJob(rule, () => {
        // setTimeout(() => {
        // }, Math.random() * 10 * 60 * 1000)
        start(); //签到函数
    })
}
autoSign()