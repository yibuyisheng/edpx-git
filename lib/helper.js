/**
 * @file 辅助方法
 * @author yibuyisheng(yibuyisheng@163.com)
 */

var exec = require('child_process').exec;
var MyPromise = require('promise');
var colorsSafe = require('colors/safe');

module.exports = {
    restoreCmdFromArgv: function (argv) {
        return argv.slice(2).map(function (arg) {
            if (/\s/.test(arg)) {
                return '\"' + arg.replace(/\"/g, '\\"') + '\"';
            }
            return arg;
        }).join(' ');
    },
    execPromise: function () {
        var args = Array.prototype.slice.call(arguments);
        if (!args.length) {
            return;
        }
        if (args[args.length - 1] instanceof Function) {
            args = args.slice(0, -1);
        }

        this.print(colorsSafe.blue.bold('[ ' + args[0] + ' ]'));

        var _this = this;
        return new MyPromise(function (resolve, reject, notify) {
            args.push(function (error, stdout, stderr) {
                if (error) {
                    error.stdout = String(stdout);
                    error.stderr = String(stderr);
                    reject(error);
                }

                resolve({stdout: stdout, stderr: stderr});
            });

            var child = exec.apply(null, args);
            child.stdout.on('data', function (data) {
                data = String(data);
                _this.print(data);
            });
            child.stderr.on('data', function (data) {
                data = String(data);
                _this.print(colorsSafe.red(data));
            });
        });
    },
    print: function () {
        /* eslint-disable no-console */
        console.log.apply(console, arguments);
        /* eslint-enable no-console */
    }
};
