$(function(){
  // 给所有的删除的A标签注册点击事件=>事件委托的方式
  $('#tbody').on('click','a:last-child',function(){
    // 交互常识-弹框确认是否删除
    if(!confirm('你确定要删除吗？')){
      return;
    }
    // 获取对应的id
    let id = $(this).attr('data-id');
    // 用一个闭包把this保存
    let _this = this;
    // 发送ajax请求到服务器删除数据
    $.ajax({
      type:'get',
      url:'http://127.0.0.1:8080/deleteHeroID',
      data:{id},
      success:function(res){
        if(res.code===200){
          // 提示用户，并把对应的行删除
          alert(res.msg);
          $(_this).parents('tr').remove();
        }
      }
    })
  })
})