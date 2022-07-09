$(function() {
    //点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

     //点击“去登录”的链接
     $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui获取 form对象
var form = layui.form
var layer = layui.layer
form.verify({
    // 自定义了PWD校验规则
    pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
    repwd: function(value) {
        var pwd = $('.reg-box [name=password]').val()
        if (pwd !== value) {
            return '两次密码不一致'
        }
    }
   
})


    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data =  {
            username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()
        }
      
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功！')
            // 注册成功后模拟人的点击行为发生自动跳转
            $('#link_login').click()
        })
    })

    //监听表单登陆事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                //将登录得到的token字符存储到localStorage 中
                localStorage.setItem('token', res.token)
                //跳转到后台主页
               location.href = 'index.html'
            }
        })
    })


















})


