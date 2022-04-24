# nets
基于xhr的一个网络请求工具库

1. 支持使用常见请求
  - request([config])
  - get(url,[config])
  - head(url,[config])
  - options(url,[config])
  - delete(url,[config])
  - post(url,data,[config])
  - put(url,data,[config])
  - patch(url,data,[config])

2. defaults默认属性
  - content-type:application/json
  - methods:get
  - base_url:配置基本路径，每次请求自动添加

支持create创建一个新的实例
执行使用defaults来定义一些默认变量

支持promise链式调用，返回参数格式
  - data:真正返回数据
  - headers:请求头
  - config:配置参数

支持interceptors对请求拦截
  - request:请求拦截
  - response:响应拦截
     - use(resolve,reject):添加拦截
     - eject(id):删除拦截

设置了防御CSRF攻击

