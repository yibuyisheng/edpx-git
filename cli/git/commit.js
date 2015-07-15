/**
 * @file 包装一下 git commit
 * @author yibuyisheng(yibuyisheng@163.com)
 */

require('colors');
var helper = require('../../lib/helper');

exports.cli = {
    description: '包装一下 git commit',
    main: function (args, opts) {
        checkJs().then(function () {
            return helper.execPromise(helper.restoreCmdFromArgv(process.argv));
        }).catch(function (error) {
            helper.print('[git commit error]'.red.bold, error);
        });
    }
};

function checkJs() {
    return helper.execPromise('git diff --cached --name-only')
        .then(function (result) {
            var changedFiles = result.split(/\s/).filter(function (file) {
                return file && /\.js$/.test(file);
            });

            if (!changedFiles.length) {
                return;
            }

            return helper.execPromise('fecs ' + changedFiles.join(' ') + ' --reporter=baidu --type=js');
        })
        .then(function (result) {
            if (/fecs  (ERROR)|(WARN) /.test(result)) {
                throw new Error(result);
            }
            return;
        });
}
