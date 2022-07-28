$(function () {
    var layer = layui.layer
    var form = layui.form

    initArtCateList()
    // 获取文章分类的列表
    function initArtCateList () {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 点击添加类别按钮调出弹出层
    var indexAdd = null
    $('#btnAddCath').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
          })
    })

    //弹出层增加表单提交事件
    //通过代理的形式，为form-add 表单绑定submit事件

    $('body').on('submit','#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('新增文章分类失败！')
                }
                initArtCateList()
                layer.msg('新增文章分类成功！')
                layer.close(indexAdd)
            }
        })
    })

    // 点击编辑按钮调出弹出层
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: $('#dialog-edit').html()
          })
          
          var id = $(this).attr('data-id')
          $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
          })
    })

    // 点击确认按钮修改数据
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('更新分类信息成功')
                }
                layer.msg('更新分类信息成功')
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })

    //点击删除按钮删除数据
    $('tbody').on('click', '.btn-delete', function() {
        console.log(111);
        var id = $(this).attr('data-id') 
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if(res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index)
                    initArtCateList()
                }
            })
            
        })
    })

})