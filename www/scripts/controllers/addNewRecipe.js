'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:AddNewRecipeCtrl
 * @description
 * # AddNewRecipeCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('AddNewRecipeCtrl', function ($scope, $rootScope, $timeout) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
      
      $scope.addRecipe = function () {
            if(typeof($scope.recipeTitle) != 'undefined'){
                var Recipe = Parse.Object.extend("Recipe");
                var newRecipe = new Recipe();
                newRecipe.set("name", $scope.recipeTitle);
                newRecipe.set("user", $rootScope.currentUser);
                newRecipe.set("description", $scope.recipeDescription);
                
                var fileUploadControl = $("#recipePicture")[0];
                if(fileUploadControl.files.length > 0){
                    var file = fileUploadControl.files[0];
                    var fileName = $scope.recipeTitle + ".jpg";
                    var parseFile = new Parse.File(fileName, file);
                    newRecipe.set("image", parseFile);
                }
                newRecipe.save(null,{
                    success: function(recipe){
                        alert("Your recipe is created!");   
                    },
                    error: function(recipe, error){
                        alert(error.message);
                    }
                });
                
                
                
            }
          
      }
    
  });