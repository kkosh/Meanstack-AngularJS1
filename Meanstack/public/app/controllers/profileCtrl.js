var app = angular.module('profileModule',['SessionServiceModule', 'UserDetailsModule']);

app.controller('profileCtrl', function(SessionCheck ,$http, $timeout, $location, UserDetailFactory){
    
    
    var app = this;
    
           
    
    UserDetailFactory.getUser().then(function(responseDetails) {
                
    console.log(responseDetails);
                 
        app._id = responseDetails.data._id;
        app.username = responseDetails.data.username;
        app.password = responseDetails.data.password;
        app.firstname = responseDetails.data.firstname;
        app.lastname = responseDetails.data.lastname;
        app.phone = responseDetails.data.phone;
        app.email = responseDetails.data.email;
        app.location = responseDetails.data.location;

    });
            
    
    app.updateUser = function(){
                
        console.log(app);
                
        return $http.post('/api/editUser', app).then(function(response){
            console.log(response);
        });  
        
    };
    
});