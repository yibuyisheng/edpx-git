/**
 * @file 从 edp-git-config.js 配置文件中读取配置信息
 * @author yibuyisheng(yibuyisheng@163.com)
 */

var config;
try {
    config = require(process.cwd() + '/edp-git-config');
}
catch (e) {
    // 默认配置
    config = {
        upstream: 'bat/master'
    };
}
module.exports = config;
