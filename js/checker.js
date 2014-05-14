// jQuery objects
//
var startButton = $('.hw4-start-button'), //  �� 始�  �」�   
    results = $('.hw4-result'); //  ��  ��  ��  table

//  u��社�  �表
var junkGroups = [];

//    Ajax    http://spamgroup.tonyq.org/groups/jsonp  ��  u��社�  �表

$.getJSON("http://jsbin.com/jaziroja/1", {}, function(data){
  // 將� 筆�  ��  GID  ��  junkGroups    中� 
  data.forEach(function(record){
    junkGroups.push(record.GID);
  });
  startButton.removeAttr('disabled').removeClass('disabled');
});

// 設�  Facebook AppID
window.fbAsyncInit = function(){
  FB.init({
    appId: '238262619701898', //  �可以� 請�  �自己�  App ID !
    status: true
  });

  // 比� 每個使 �者�  group  �否 �在 junkGroups 中出  
  //
  startButton.click(function(){
    results.empty(); // 清除結�  �容
    $('.hw4-complete').remove(); // 移除 ��  ��  �� 

    // 1. 讓使 �者登 �此 Facebook App (FB.login)
    FB.login(function(){
      // 2. �  FB.api  �到使用 ��  group  �表
      //  �到使用   group  �表   response 之� � 
      FB.api('/me/groups', function(resp){
        var i;
        for(i=0; i<resp.data.length; i+=1){
          if( junkGroups.indexOf( resp.data[i].id ) !== -1 ){
            // resp.data[i]  ��  �社 �� 
            //  �表 �裡 �顯� 
            results.append('<tr><td>'+resp.data[i].id+'</td><td>'+resp.data[i].name+'</td></tr>');
          }
        }
        results.after('<div class="hw4-complete alert alert-info"> v 完� </div>');
      });
    }, {scope: 'user_groups'});

  });
};