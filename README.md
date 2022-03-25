# nets
基于xhr的一个网络请求工具库

支持使用常见请求
request([config])
get(url,[config])
head(url,[config])
options(url,[config])
delete(url,[config])
post(url,data,[config])
put(url,data,[config])
patch(url,data,[config])

支持create创建一个新的实例
执行使用defaults来定义一些默认变量

支持promise回调函数

支持interceptors对请求拦截
request先添加后执行
response先添加先执行

会对请求返回的data进行JSON处理

