/**
 * @file 辅助方法
 * @author yibuyisheng(yibuyisheng@163.com)
 */

var exec = require('child_process').exec;

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

        return new Promise(function (resolve, reject) {
            args.push(function (error, stdout, stderr) {
                if (error || stderr) {
                    reject(new Error((error ? error.message : String(stderr)) + String(stdout)));
                }
                resolve(String(stdout));
            });

            exec.apply(null, args);
        });
    }
};