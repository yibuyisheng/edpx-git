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
                return helper.spawnPromise(process.argv[2], process.argv.slice(3));
            })
            .catch(function (error) {
                helper.print(colorsSafe.red(error.message));
            });
    }
};

function checkJs() {
    return helper.spawnPromise('git', ['diff', '--cached', '--name-only'])
        .then(function (result) {
            var changedFiles = result.stdout.split(/\s/).filter(function (file) {
                return file && /\.js$/.test(file);
            });

            if (!changedFiles.length) {
                return;
            }

            return helper.spawnPromise('fecs', changedFiles.concat(['--reporter=baidu', '--type=js']));
        })
        .then(function (result) {
            if (/fecs  (ERROR)|(WARN) /.test(result)) {
                throw new Error(result);
            }
        });
}
