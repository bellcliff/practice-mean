(function(){

  'use strict'

  angular.module('main', ['ngCookies']).controller('LoginCtrl', function($http, $cookies, $scope){
    var self = this;
    self.login = function(usr, pwd){
      $http.post('login', {usr:usr, pwd:pwd}).success(function(info){
          self.usr = usr
      });
    };

    self.logout = function(){
      self.usr = undefined;
      $http.get('logout').success(function(){
      })
    }

    self.del = function(){
      self.usr = undefined;
      $http.delete('del').success(function(){
      })
    }

    self.check = function(){
      $http.get('check').success(function(info){
        self.usr = info.usr;
      }).catch(function(){});
    }

    self.sign = function(usr, pwd){
      $http.post('sign', {usr: usr, pwd: pwd}).success(function(){
         self.usr = usr
      })
    }

    self.check();
  });
})()
