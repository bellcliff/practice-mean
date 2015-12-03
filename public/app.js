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
      $http.get('logout').success(function(){
        self.usr = undefined;
      })
    }

    self.check = function(){
      $http.get('check').success(function(info){
        self.usr = info.usr;
      }).catch(function(){});
    }
    self.check();
  });
})()
