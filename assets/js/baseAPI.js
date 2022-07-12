//注意：每次调用$.get() 或 $.post() 或$.ajax的时候会先调用ajaxPrefilter 这个函数 在这个函数中可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url ='http://api-breakingnews-web.itheima.net' + options.url

    // 统一为有权限的接口设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 挂载全局complete
    options.complete = function (res) {
        console.log(res);
      if (res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！') {
       localStorage.removeItem('token')
       location.href = '/login.html'
      }
    }
})


