$(function () {
    // 先得到id
    // 我们曾经封装过一个kits.js 里面封装好了一个可以把url参数转换为对象的方法 - 直接拿过来使用
    let id = location.search.substring(4);
    console.log(id);
    // 通过ajax请求原来的数据=>还可以使用模板引擎的方式替换掉这个ajax请求
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:8080/getHeroById',
        data: { id },
        success: function (res) {
            console.log(res)

            if (res.code === 200) {
                // 把数据填入表单=>姓名、性别、图片
                $('#name').val(res.data.name);
                // 性别（三元表达式）
                let selector = res.data.gender === '男' ? '#nan' : '#nv';
                $(selector).prop('checked', true);
                // 图片 - 没有做图片上传，就先改隐藏域地址
                $('#headSrc').val(res.data.img);
                // 把id的隐藏域也修改
                $('#id').val(res.data.id);
            }
        }
    });
    // 给修改完成注册事件
    $('#sub').on('click', function () {
        // 非空判断
        // 收集数据
        let data = $('#form').serialize();
        // 通过ajax请求
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:8080/editHeroById',
            data,
            success: function (res) {
                if (res.code == 200) {
                    alert(res.msg);
                    location.href = '/index';
                }
            }
        })
    })
})