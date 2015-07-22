/**
 * @file git push
 * @author yibuyisheng(yibuyisheng@163.com)
 */

require('colors');
var helper = require('../../lib/helper');
var config = require('../../lib/config') || {};

exports.cli = {
    description: '包装一下 git push',
    main: function (args, opts) {
        helper.spawnPromise('git', ['stash'])
            .then(function () {
                var upstream = config.upstream.split('/');
                return helper.spawnPromise('git', ['pull', '--rebase', upstream[0], upstream[1]]);
            }).then(function () {
                return helper.spawnPromise(process.argv[2], process.argv.slice(3));
            }).then(function () {
                return helper.spawnPromise('git', ['stash', 'pop']);
            });
    }
};
