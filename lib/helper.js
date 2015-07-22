/**
 * @file 辅助方法
 * @author yibuyisheng(yibuyisheng@163.com)
 */

var exec = require('child_process').exec;
var pty = require('pty');
var spawn = pty.spawn;
var MyPromise = require('promise');
var colorsSafe = require('colors/safe');

module.exports = {
    restoreCmdFromArgv: function (argv, start) {
        start = typeof start === 'undefined' ? 2 : start;
        return argv.slice(start).map(function (arg) {
            if (/\s/.test(arg)) {
                return '\"' + arg.replace(/\"/g, '\\"') + '\"';
            }
            return arg;
        }).join(' ');
    },
    removeColors: function (colorsStr) {
        return colorsStr.replace(
            /(\u001b\[[0-9|;]+m)|(\u001b\[m)|(\u001b\[\?1h\u001b\=)|(\u001b\[K\u001b\[\?1l\u001b>)/g,
            ''
        );
    },
    spawnPromise: function () {
        var args = Array.prototype.slice.call(arguments);
        if (!args.length) {
            return;
        }
        if (args[args.length - 1] instanceof Function) {
            args = args.slice(0, -1);
        }

        this.print(colorsSafe.blue.bold('[ ' + args[0] + ' ' + this.restoreCmdFromArgv(args[1], 0) + ' ]'));

        return new MyPromise(function (resolve, reject, notify) {
            var child = spawn.apply(pty, args);
            var output = [];
            child.on('close', function () {
                resolve({stdout: module.exports.removeColors(output.join(''))});
            });
            child.stdout.on('data', function (data) {
                output.push(data);
                module.exports.print(data);
            });
        });
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
            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
        });
    },
    print: function () {
        /* eslint-disable no-console */
        console.log.apply(console, arguments);
        /* eslint-enable no-console */
    }
};
