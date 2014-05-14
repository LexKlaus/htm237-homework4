// jQuery objects
//
var startButton = $('.hw4-start-button'), //  Œé å§‹æ  ã€æ   
    results = $('.hw4-result'); //  Œæ  ç  œã€  table

//  uœ¾ç¤¾å  —è¡¨
var junkGroups = [];

//    Ajax    http://spamgroup.tonyq.org/groups/jsonp  –å  uœ¾ç¤¾å  —è¡¨

$.getJSON("http://jsbin.com/jaziroja/1", {}, function(data){
  // å°‡æ ç­†è  ™ç  GID  ¾é€  junkGroups    ä¸­ã€ 
  data.forEach(function(record){
    junkGroups.push(record.GID);
  });
  startButton.removeAttr('disabled').removeClass('disabled');
});

// è¨­å  Facebook AppID
window.fbAsyncInit = function(){
  FB.init({
    appId: '238262619701898', //  ¥å¯ä»¥ï è«‹æ  è‡ªå·±ç  App ID !
    status: true
  });

  // æ¯”å æ¯å€‹ä½¿ ¨è€…ç  group  ¯å¦ ‰åœ¨ junkGroups ä¸­å‡º  
  //
  startButton.click(function(){
    results.empty(); // æ¸…é™¤çµæ  §å®¹
    $('.hw4-complete').remove(); // ç§»é™¤ Œæ  å  ã€ 

    // 1. è®“ä½¿ ¨è€…ç™» ¥æ­¤ Facebook App (FB.login)
    FB.login(function(){
      // 2. ä»  FB.api  ¿åˆ°ä½¿ç”¨ …ç  group  —è¡¨
      //  ¿åˆ°ä½¿ç”¨   group  —è¡¨   response ä¹‹å ï¼ 
      FB.api('/me/groups', function(resp){
        var i;
        for(i=0; i<resp.data.length; i+=1){
          if( junkGroups.indexOf( resp.data[i].id ) !== -1 ){
            // resp.data[i]  ¯å  ¾ç¤¾ ˜ï 
            //  ¨è¡¨ ¼è£¡ ¢é¡¯ç¤ 
            results.append('<tr><td>'+resp.data[i].id+'</td><td>'+resp.data[i].name+'</td></tr>');
          }
        }
        results.after('<div class="hw4-complete alert alert-info"> v å®Œæ </div>');
      });
    }, {scope: 'user_groups'});

  });
};