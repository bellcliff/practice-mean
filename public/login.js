(function(){

  'use strict'

  angular.module('login', ['ngCookies']).directive('loginDirect', function(){
    return {
      templateUrl: 'login.html',
      controller: function($http, $cookies, $scope){
        $scope.login = function(usr, pwd){
          $http.post('login', {usr:usr, pwd:pwd}).success(function(info){
              $scope.usr = usr
          });
        };
  
        $scope.logout = function(){
          $scope.usr = undefined;
          $http.get('logout').success(function(){
          })
        }
  
        $scope.del = function(){
          $scope.usr = undefined;
          $http.delete('del').success(function(){
          })
        }
  
        $scope.check = function(){
          $http.get('check').success(function(info){
            $scope.usr = info.usr;
          }).catch(function(){});
        }
  
        $scope.sign = function(usr, pwd){
          $http.post('sign', {usr: usr, pwd: pwd}).success(function(){
             $scope.usr = usr
          })
        }
  
        $scope.check();
      }
    }
  });

})()
