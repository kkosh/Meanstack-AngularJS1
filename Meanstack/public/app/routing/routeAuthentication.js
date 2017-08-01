var app =angular.module('routeAuth', ['routing']);

app.run(['$rootScope','SessionCheck', '$location', function($rootScope, SessionCheck, $location) {
    
    
    $rootScope.$on('$routeChangeStart',  function(event, next, current) {
        
        if(next.$$route.visible == false) {
            
            
            SessionCheck.getSessionStatus().then(function(response){
                
                if(response.data.result == false){
                   
                    event.preventDefault();
                    $location.path('/login');
                   
                }
                
            });            
        } 
    });
        
}]);            