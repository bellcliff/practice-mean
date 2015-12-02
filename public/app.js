(function(){

  'use strict'

  angular.module('main', ['ngCookies']).controller('LoginCtrl', function($http, $cookies, $scope){
    var self = this;
    self.usr = $cookies.get('usr')
    self.login = function(usr, pwd){
      $http.post('login', {usr:usr, pwd:pwd}).success(function(usrs){
        console.log(usrs);
        delete $scope.loginUser;
        delete $scope.loginPwd;
        if (usrs.length > 0) {
          self.usr = usrs[0].usr;
          $cookies.put('usr', self.usr);
        }
      });
    };

    self.logout = function(){
      $cookies.remove('usr')
      self.usr = undefined;
    }
  });
})()
