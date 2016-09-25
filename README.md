## apiProxy 异步接口反向代理

## 目的
> 旨在解决前端开发时无法跨域调用服务器接口，需要把代码部署到服务器上的问题，而开发的服务。

## 安装使用
> 进入项目，执行以下命令

```
npm install
```

## 开启服务

```
node apiProxy.js
```

## 设置代理参数
> 访问http://qinmudi.qq.com:9000/config?host=dev.erikqin.com&port=80  
> 看到『恭喜设置成功，你的host：dev.erikqin.com，port：80』，表示设置成功！

* host为代理服务器的地址，不加http
* port为端口
* 初始 host为dev.erikqin.com，端口为80
* 设置以后所有的请求都会被转发到代理服务器

## ajax调用
> 默认服务地址为 http://127.0.0.1:9000

```javascript
$.ajax({
    url: 'http://127.0.0.1:9000/common/scenic/get_list_by_city_id',
    type: 'POST',
    dataType: 'json',
    data: {
        username: '王五',
        sex: '男',
        hobby: ['吃饭', '睡觉', '打豆豆']
    }
})
.done(function(res) {
    console.log(res);
})
.fail(function() {
    console.log("error");
})
.always(function() {
    console.log("complete");
});
```