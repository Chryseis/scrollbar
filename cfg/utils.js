/**
 * Created by Administrator on 2017/12/10.
 */
const path = require('path')
const os = require("os")


/**
 * 获取本机ip地址
 */
exports.ip = getIp()


function getIp() {
    var ip = "127.0.0.1";

    let ipObj = os.networkInterfaces()['本地连接'] || os.networkInterfaces()['en0'];

    for (var i = 0; i < ipObj.length; i++) {
        if (ipObj[i].family == 'IPv4') {
            ip = ipObj[i].address;
        }
    }
    return ip
}