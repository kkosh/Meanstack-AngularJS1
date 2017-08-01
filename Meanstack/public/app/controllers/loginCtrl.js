var app = angular.module('loginModule',['SessionServiceModule']);

app.controller('loginCtrl', function($http, $timeout, $location, SessionCheck){
    
    var app = this;
    
    SessionCheck.getSessionStatus().then(function(responseStatus) {
      
        if(responseStatus.data.result) {
            
        app.loginV = false;
        app.registerV = false;
        app.profileV = true;
        app.messageV = true;
        app.logoutV = true;
        
            
        } else {
        
        app.loginV = true;
        app.registerV = true;
        app.profileV = false;
        app.messageV = false;
        app.logoutV = false;
            
        }
         
     });
    
    
    this.userLogin = function(loginUser) {
        
        return $http.post('/api/login', app.loginUser).then(function(response){
            
            if(response.data.result) {
                
                app.successMsg = response.data.message + "...Redirecting";

                $timeout(function(){
                   $location.path('/profile');
                },2000);
                
            } else {
                
                app.errorMsg = response.data.message;
                
            }
            
        });    
        
    };
    
    this.logout = function() {
            
        SessionCheck.clearSession();
        
        $timeout(function(){
            $location.path('/');
        }, 2000);
        
    
    };
    
});