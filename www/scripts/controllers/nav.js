'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('NavCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  
  });