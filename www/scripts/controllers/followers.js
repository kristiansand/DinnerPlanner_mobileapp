'use strict';

/**
 * @ngdoc function
 * @name angularjsApp.controller:FollowersCtrl
 * @description
 * # FollowersCtrl
 * Controller of the angularjsApp
 */
angular.module('angularjsApp')
  .controller('FollowersCtrl', function ($scope, $rootScope, $timeout) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
        var poll = function() {
        $timeout(function() {
            getFollowers();
            poll();
        }, 1000);
    };
      
      poll();
      
      
    $scope.searchResults = [];
    
    $scope.searchForUser = function(){
        var searchInput = "";
        if(typeof($scope.userSearchInput) != "undefined"){
            searchInput = $scope.userSearchInput;
            var userSearchQuery = new Parse.Query(Parse.User);
            userSearchQuery.startsWith("username", searchInput);
            userSearchQuery.find({
                success: function(results){
                    $scope.searchResults.length = 0;
                    for(var i = 0; i < results.length; i++){
                        $scope.searchResults.push(results[i]);
                    }

                },
                error: function(error){
                    console.log(error.message);   
                }
            });
        }
    }
    
    $rootScope.currentUser.follow = function(user){
        var Follower = Parse.Object.extend("Follower");
        var follower = new Follower();
        follower.set("fromUser", $rootScope.currentUser);
        follower.set("toUser", user);
        follower.save(null, {
            success: function(follower){
                alert("You are now following " + follower.get("toUser").getUsername());
            },
            error: function(follower, error){
                alert(error.message);   
            }
        });
    }
    
    $rootScope.currentUser.unFollow = function(user){
        var Follower = Parse.Object.extend("Follower");
        var followerQuery = new Parse.Query(Follower);
        followerQuery.equalTo("fromUser", $rootScope.currentUser);
        followerQuery.equalTo("toUser", user);
        followerQuery.find({
            success: function(follower){
                follower[0].destroy({
                    success: function(follower){
                        alert("You have stopped following the user");
                    },
                    error: function(follower, error){
                    alert(error.message);
                }
                
                });
                
            },
            error: function(follower, error){
                alert(error.message);   
            }
        });
    }
    
    $rootScope.followers = [];
    
    function getFollowers(){
        var Follower = Parse.Object.extend("Follower");
        var followersQuery = new Parse.Query(Follower);
        followersQuery.equalTo("fromUser", $rootScope.currentUser);
        followersQuery.find({
            success: function(results){
                $rootScope.followers.length = 0;
                for(var i = 0; i < results.length; i++){
                    var userQuery = new Parse.Query(Parse.User);
                    userQuery.get(results[i].get("toUser").id, {
                        success: function(user){
                            $rootScope.followers.push(user);  
                        },
                        error: function(error){
                            console.log(error.message);   
                        }
                    });
                }

            },
            error: function(error){
                console.log(error.message);   
            }
        });
        
    }
      
  });