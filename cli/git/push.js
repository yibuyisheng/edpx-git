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
        var stashPop = helper.execPromise.bind(null, 'git stash pop');
        helper.execPromise('git stash')
            .then(function () {
                var upstream = (config.upstream ? config.upstream.split('/').join(' ') : 'bat master');
                return helper.execPromise('git pull --rebase ' + upstream);
            }).then(function () {
                return helper.execPromise(helper.restoreCmdFromArgv(process.argv));
            }).catch(function (error) {
                helper.print('[git push error]'.red.bold);
                helper.print(error.message);
                helper.print(error.stdout ? error.stdout : '');
            }).then(stashPop, stashPop);
    }
};
