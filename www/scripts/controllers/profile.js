'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('ProfileCtrl', function ($scope, $rootScope, $timeout) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  var poll = function() {
        $timeout(function() {
            getProfile();
            poll();
        }, 1000);
    }; 
      
  if($rootScope.profileUser == null){
     poll(); 
  }
      
      $rootScope.profileUser = null;

  function getProfile(){
      var currentProfileUrl = getUrlVars()["user_id"];

      var profileUserQuery = new Parse.Query(Parse.User);
      profileUserQuery.get(currentProfileUrl, {
            success: function(profileUser){
                $rootScope.profileUser = profileUser;
            },
          error: function(object, error){
            console.log(error.message);   
          }
      });

      if($rootScope.profileUser != null){
          
            $scope.profileUser.getFullName = function(){
                return $scope.profileUser.get("firstname") + " " + $scope.profileUser.get("lastname");   
            }

            $scope.profileUser.getAboutMe = function(){
                return $scope.profileUser.get("aboutMe");   
            }
          
      }
  }
      
  });