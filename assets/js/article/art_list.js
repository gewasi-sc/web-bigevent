$(function () {
    var layer = layui.layer
    //定义一个需要查询的参数对象，将来请求数据的时候
    //需要将请求数据对象提交到服务器
    var q = {
        pagenum: 1,//页码值 默认为1
        pagesize: 2,//每页显示几条数据默认为两条
        cate_id: '',//文章分类的 Id
        state: ''//文章的状态，可选值有：已发布、草稿
    }

    initTable()
    // 获取文章的列表数据
    function initTable() {
        $.ajax({
            methdo: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if(res.status !== 0) {
                    return layer.msg('获取文章的列表数据失败')
                }
                console.log(res);
                //获取数据拼接模板引擎
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }



})