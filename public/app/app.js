angular.module('fleetAdmiral',['appRoutes','mainCtrl','authService','userCtrl','userService','equipService','equipCtrl','macCtrl','reverseDirective'])

    .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });