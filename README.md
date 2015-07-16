# edpx-git

基于 edp 的 git 命令。

使用 edp 对 git 命令进行一层封装，可以做一些提交之前的预处理。

目前包含的功能：

* **git commit**

    在 commit 之前会对修改的 js 文件做规范检查。如果检查不通过，则拒绝 commit ；如果检查通过，则成功 commit 。

* **git push**

    在 push 之前主要会做一次 rebase ，具体要 rebase 远程哪个分支，可以在项目根目录下的 edp-git-config.js 中配置，例如：

    ```js
    module.exports = {
        upstream: 'origin/master'
    };
    ```

# 系统要求

* [node 0.12.*](https://nodejs.org/)
* [edp 1.1.1](https://github.com/ecomfe/edp)
* [git](https://git-scm.com/)
* [fecs](https://github.com/ecomfe/fecs/)

# 安装

```
git clone https://github.com/yibuyisheng/edpx-git
cd edpx-git
npm link .
```

# 使用

在使用 git 进行管理的项目目录下，可以执行任何 git 命令，只不过需要在 git 前面加上 edp ，例如：

```
edp git status
edp git commit -m "test"
```

