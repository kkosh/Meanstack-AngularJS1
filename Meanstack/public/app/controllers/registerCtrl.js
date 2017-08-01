var app = angular.module('registerModule', []);


app.controller('registerCtrl', function($http, $timeout, $location){
    
    var app = this;
    
    this.userRegistration = function(regUser) {
        
        return $http.post('/api/register', app.regUser).then(function(response){
            
            console.log(response);
            
            if(response.data.result)
            {
            
                app.successMsg = response.data.message + "...Redirecting";
                
                $timeout(function(){
                    $location.path('/login');                    
                }, 2000);
                    
            } else {
                
               app.errorMsg = response.data.message;
                
            }
            
        });
                
    };
        
});