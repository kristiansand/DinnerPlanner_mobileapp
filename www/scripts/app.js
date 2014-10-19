'use strict';

/**
 * @ngdoc overview
 * @name angularjsApp
 * @description
 * # angularjsApp
 *
 * Main module of the application.
 */
var app = angular.module('angularjsApp', [
    'ngCookies'
	]);

app.run(function($rootScope, $cookies, $cookieStore) {
            parseInitialize();
	        $rootScope.$on('$viewContentLoaded', function () {
        	$(function() {
                FastClick.attach(document.body);
            });
	        $(document).foundation();
    	});
        $rootScope.title = "DinnerPlanner";
    
       
    
    $rootScope.isLoggedIn = function(){
        return window.localStorage.getItem("user") != null;  
      }
    
    $rootScope.logOut = function(){
        window.localStorage.removeItem("user");
        location.reload();
    }
    
    if(!$rootScope.isLoggedIn()){
        window.location.replace('login.html');
    }
    
    $rootScope.currentUser = Parse.User.current();
    
    $rootScope.currentUser.getFullName = function(){
        return $rootScope.currentUser.get("firstname") + " " + $rootScope.currentUser.get("lastname");   
    }
    
    $rootScope.currentUser.getAboutMe = function(){
        return $rootScope.currentUser.get("aboutMe");   
    }
    
	});

function parseInitialize(){
    Parse.initialize("KJ7VlLWVQDlpbksXpY4cCgJRWq0jzl8HlXodhRJm", "oOTlG5iSxkBTzIraN6OJuFdPGYhOvcrKM2wVrdhF");   
}