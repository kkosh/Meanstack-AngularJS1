var app = angular.module('messageModule',['ngRoute']);

app.controller('messageCtrl', function($http, UserDetailFactory, $scope, $route, $window){
    
    console.log("hello from messageCtrl");
    
    var app = this;
    
// !function try(){
// 
//       //alert("kosha");
//       
//       
//       
//       
//       setTimeout(try, 1000);
// 
//   }();
    

    
    UserDetailFactory.getUser().then(function(responseDetails) {
           
        app.email = responseDetails.data.email;
                
        return $http.get('/api/getMsg').then(function (response) {
        $scope.messages = response.data;
        });
    
    });
    
    
    app.sendMsg = function(msgData) {
        
        var allData = { from: app.email, to: app.msgData.to, content: app.msgData.content };

        console.log(allData);
        
        return $http.post('/api/sendMsg', allData).then(function(response) {
        console.log(response);
        app.msg = response.data.message;
        });
    
    };
    
        
    app.getIndex = function(index) {
       
        return $http.post('/api/deleteMsg/' + index).then(function(response){
        console.log(response);
        app.deleteMsg = response.data.message;
        });
       
       // (function () { window.location.reload(); } )();
        
       // $window.location.reload();        
        
   };
    
    app.getUser = function (email) {
        app.to = email;
    };
  
    app.doReply = function() {
        
        var allData = { from: app.email, to: app.to, content: app.msgData.content };

        console.log(allData);
        
        return $http.post('/api/sendMsg', allData).then(function(response) {
        console.log(response);
        app.msg = response.data.message;
        });
        
        
    };
    
});