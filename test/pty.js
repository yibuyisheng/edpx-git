/**
 * @file 检查 pty 功能
 * @author yibuyisheng
 */
var pty = require('pty');
var spawn = pty.spawn;

describe('#file and directory', function () {

    it('the output', function (done) {
        this.timeout(0);
        var child = spawn('git', ['diff', '--cached', '--name-only']);
        var output = [];
        child.stdout.on('data', function (data) {
            output.push(data);
        });
        child.on('close', function () {
            output = output.join('');
            output = output.replace(
                /(\u001b\[[0-9|;]+m)|(\u001b\[m)|(\u001b\[\?1h\u001b\=)|(\u001b\[K\u001b\[\?1l\u001b>)/g, ''
            );

            var fs = require('fs');
            fs.writeFile('/Users/baidu/bat/edpx-git/test/stdout.txt', output, done);
        });
    });

});
