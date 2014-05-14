

var startButton = $('.hw4-start-button'), 
    results = $('.hw4-result'); 


var junkGroups = [];



$.getJSON("http://jsbin.com/jaziroja/1", {}, function(data){
  
  data.forEach(function(record){
    junkGroups.push(record.GID);
  });
  startButton.removeAttr('disabled').removeClass('disabled');
});


window.fbAsyncInit = function(){
  FB.init({
    appId: '238262619701898', 
    status: true
  });

  
  startButton.click(function(){
    results.empty(); 
    $('.hw4-complete').remove(); 

    
    FB.login(function(){
     
      FB.api('/me/groups', function(resp){
        var i;
        for(i=0; i<resp.data.length; i+=1){
          if( junkGroups.indexOf( resp.data[i].id ) !== -1 ){
           
            results.append('<tr><td>'+resp.data[i].id+'</td><td>'+resp.data[i].name+'</td></tr>');
          }
        }
        results.after('<div class="hw4-complete alert alert-info"> v 完� </div>');
      });
    }, {scope: 'user_groups'});

  });
};
