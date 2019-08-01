$(function(){
    // 注册点击新增按钮，点击事件
    $('#sub').on('click',function(){
        // 收集数据
        let data = $('#myform').serialize();
        // ajax请求
        $.ajax({
            type:'post',
            url:'http://127.0.0.1:8080/addNewHero',
            data,
            // dataType 用于告诉ajax对象，服务器返回的格式是什么，不需要根据Content-Type自己解析了
            dataType:'json',
            success:function(res){
                if(res.code === 200){
                    alert(res.msg);
                    // location.href = '../../views/index.ejs';
                    location.href = './index';
                }
            }
        })
    })
})