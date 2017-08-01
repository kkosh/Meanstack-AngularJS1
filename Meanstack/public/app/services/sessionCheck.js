var app = angular.module('SessionServiceModule', []);


app.factory('SessionCheck', function($http){
    
    sessionCheck = {};
    
    sessionCheck.getSessionStatus = function() {
        
        return $http.post('/api/sessionCheck').then(function(data){
            //console.log(data);
            return data;
        });
            
        };
        
    
    
    sessionCheck.clearSession = function() {
      
        
        return $http.post('/api/sessionOut').then(function(response) {
                 
            if(response.data.result) {
                //return true if session destroyed
                console.log(response.data.message);
                return true;
            } else {
                //return false if user aleady logged out : no session 
                console.log(response.data.message);
                return false;
            }
            
        });
        
    };
    
    return sessionCheck;    
    
});