'use strict';

/**
 * @ngdoc overview
 * @name angularjsApp
 * @description
 * # angularjsApp
 *
 * Main module of the application.
 */
var app = angular.module('login', [
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
    
    
    // Strings
      $rootScope.loginStr = "Login";
      $rootScope.usernameStr = "Username";
      $rootScope.passwordStr = "Enter password";
        $rootScope.forgotPasswordStr = "Forgot password?";
      
    $rootScope.isLoggedIn = function(){
        return window.localStorage.getItem("user") != null;
      }
    
      $rootScope.logIn = function(){
          var username = document.getElementById("username").value;
          var password = document.getElementById("password").value;
            if(username.length > 0 && password.length > 0){
                Parse.User.logIn(username, password, {
                  success: function(user) {
                    window.localStorage.setItem("user", user.id);
					window.location.replace('index.html');
                  },
                  error: function(user, error) {
                    alert("Du er ikke logget inn!");
                  }
                });
            }
            else{
                //Username and/or password not input   
				alert("Username and/or password not input");
            }
		}
      if($rootScope.isLoggedIn()){
          window.location.replace('index.html');
      }

    
	});


function parseInitialize(){
    Parse.initialize("KJ7VlLWVQDlpbksXpY4cCgJRWq0jzl8HlXodhRJm", "oOTlG5iSxkBTzIraN6OJuFdPGYhOvcrKM2wVrdhF");   
}