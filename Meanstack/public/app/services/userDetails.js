var app = angular.module('UserDetailsModule', []);


app.factory('UserDetailFactory', function($http){
    
    userDetailFactory = {};
    
    userDetailFactory.getUser = function() {
        
         return $http.get('/api/getDetails').then(function(responseDetails){
                
                return responseDetails;
                
            });
           
        
    };
    
    return userDetailFactory;
    
    
    
    
    
});