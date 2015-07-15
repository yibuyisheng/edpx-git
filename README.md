# edpx-git

基于 edp 的 git 命令。

使用 edp 对 git 命令进行一层封装，可以做一些提交之前的预处理。

目前只对 git commit 做了预处理，在 commit 之前会检查已修改的 js 文件的代码格式。其余的 edp git 命令与 git 命令一致。

# 系统要求

* git
* node 0.12.*
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

