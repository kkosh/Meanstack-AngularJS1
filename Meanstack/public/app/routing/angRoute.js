var app = angular.module('routing', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    
    
    $routeProvider
    
    .when('/', {
        
        templateUrl : "app/views/home.html",
        visible: true
                
    })
    
    .when('/profile', {
        
        templateUrl : "app/views/profile.html",
        controller: "profileCtrl",
        controllerAs: "profile",
        visible: false
                
    })
    
    .when('/message', {
        
        templateUrl : "app/views/message.html",
        controller: "messageCtrl",
        controllerAs: "message",
        visible: false
                
    })
    
    .when('/login', {
        
        templateUrl : "app/views/login.html",
        controller: "loginCtrl",
        controllerAs: "login",
        visible: true        
    })
    .when('/register', {
        
        templateUrl : "app/views/register.html",
        controller: "registerCtrl",
        controllerAs: "register",
        visible: true
                
    })
    
    .when('/about', {
        
        templateUrl : "app/views/about.html",
        visible: true
                
    })
    .when('/edit', {
        
        templateUrl : "app/views/edit.html",
        controller: "profileCtrl",
        controllerAs: "profile",
        visible: false
                
    })
    
    .when('/logout', {
        
        template : "<h1>Bbye..We'll miss you<h1>",
        visible: true        
    })
    
    .otherwise('/', {
        
        redirectTo : '/'
        
    });
        
    $locationProvider
    .html5Mode({
        
        enabled: true,
        requireBase:false
    });
    
});
