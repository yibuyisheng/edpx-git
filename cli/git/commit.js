/**
 * @file 包装一下 git commit
 * @author yibuyisheng(yibuyisheng@163.com)
 */

var colorsSafe = require('colors/safe');
var helper = require('../../lib/helper');

exports.cli = {
    description: '包装一下 git commit',
    main: function (args, opts) {
        checkJs()
            .then(function () {
                return helper.execPromise(helper.restoreCmdFromArgv(process.argv));
            })
            .catch(function (error) {
                helper.print(colorsSafe.red(error.message));
            });
    }
};

function checkJs() {
    return helper.execPromise('git diff --cached --name-only')
        .then(function (result) {
            var changedFiles = result.stdout.split(/\s/).filter(function (file) {
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
        });
}
