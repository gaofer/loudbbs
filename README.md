# 基于 Vue+ElementUI 的论坛前端项目
这是我[另一个项目](https://github.com/gaofer/loudbbsback)需要用到的前端vue代码，用到了vue和elementUI，只实现了一些简单的功能，以后还会接着做，因为毕业设计也是它了……

## 上手指南
即克隆即用，最好和后端一起使用，在 global_variable.js 文件中保存了这个项目需要的后台地址和端口数据，只需修改一个位置，全代码受益。😘

## 所用框架
- vue
- vue-cli
- vue-route
- elementUI

## 相关工具
- [wangEditor](http://www.wangeditor.com/)

## 项目相关说明
### 写在最前面 
这个项目到最后也没有完整的完成，只是做了一些相关功能，集合了后台管理和论坛页面两个小项目，论坛还有好多没有做完，像是一开始的搜索，还有类别列表基本都没有做，后边后详细说明已经做完的功能和没有做完的功能。

### 功能详情
已完成的功能前边打钩了，没有完成的是目前已经想到的缺陷，希望在以后可以做完 
- [x] 主界面
- [x] 登录界面
- [x] 注册界面
- [x] 登录功能
- [x] 注册功能
- [x] 主界面加分页
- [x] 正常显示主界面的元素
- [x] 区别管理员和普通用户
- [x] 发帖界面
- [x] 发表评论
- [x] 发帖
- [x] 话题详情界面
- [x] 话题详情界面分页评论
- [x] 管理界面
- [x] 提升权限
- [x] 删除帖子
- [x] 删除类别
- [x] 新建类别
- [ ] 删除评论
- [ ] 设置
- [ ] 个人中心
- [ ] 提交bug
- [ ] 查询功能
- [ ] 类别列表+查询
- [ ] 管理员欢迎页面的显示问题
- [ ] 在刷新页面后所有的页面都需要重新打开一遍，利用sessionStorage大概可以解决这个问题
- [ ] 美化浏览界面
- [ ] 新建评论时按事务提交，避免中途出错

## 项目自带README.md 
### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
