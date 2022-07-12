$(function () {
    // 调用getUserInfo() 函数
    getUserInfo()

    var layer = layui.layer
    // 点击退出按钮退出页面
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token')
            location.href = '/login.html'
            
            layer.close(index)
    })
})
})



// 获取用户基本信息
function getUserInfo() {
    $.ajax ({
        methods: 'GET',
        url : '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status == 0) {
                renderAvatar(res.data)
            }
        },
        // 验证是否正确登录
        // complete: function (res) {
        //      console.log(res);
        //    if (res.responseJSON.status ===1 && res.responseJSON.message === '身份认证失败！') {
        //     localStorage.removeItem('token')
        //     location.href = '/login.html'
        //    }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    console.log(user);
    // 获取用户的名称
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}