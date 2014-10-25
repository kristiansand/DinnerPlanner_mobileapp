'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:NewsFeedCtrl
 * @description
 * # NewsFeedCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('NewsFeedCtrl', function ($scope, $rootScope, $timeout) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
      var poll = function() {
        $timeout(function() {
            getNewsfeed();
            poll();
        }, 1000);
    };
      
      $scope.recipeList = [];
      
      if($scope.recipeList.length < 1){
        poll();
      }
      
      
      
     function getNewsfeed() {
        var Recipe = Parse.Object.extend("Recipe");
        var recipeQuery = new Parse.Query(Recipe);
        recipeQuery.find({
            success: function(recipes){
                $scope.recipeList.length = 0;
                for(var i = 0; i < recipes.length; i++){
                    var recipe = recipes[i];
                    var recipeData = [recipe.get("name"), recipe.get("description"), recipe.get("image").url(), recipe.get("username")];
                    $scope.recipeList.push(recipeData);   
                }
            },
            error: function(error){
                alert(error.message);   
            }
        });
         
     }
  });