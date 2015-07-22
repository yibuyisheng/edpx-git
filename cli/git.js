/**
 * @file 主命令
 * @author yibuyisheng(yibuyisheng@163.com)
 */

var helper = require('../lib/helper');

exports.cli = {
    description: '主命令',
    main: function (args, opts) {
        helper.spawnPromise(process.argv[2], process.argv.slice(3));
    }
};
