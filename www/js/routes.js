angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController', {
    url: '/tabsPage',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tabsController.attendance', {
    url: '/attendance',
    views: {
      'tab1': {
        templateUrl: 'templates/attendance.html',
        controller: 'attendanceCtrl'
      }
    }
  })

  .state('tabsController.attitude', {
    url: '/attitude',
    views: {
      'tab2': {
        templateUrl: 'templates/attitude.html',
        controller: 'attitudeCtrl'
      }
    }
  })

  .state('tabsController.ability', {
    url: '/ability',
    views: {
      'tab3': {
        templateUrl: 'templates/ability.html',
        controller: 'abilityCtrl'
      }
    }
  })

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('playerMenu', {
    url: '/playerMenu',
    templateUrl: 'templates/playerMenu.html',
    controller: 'playerMenuCtrl'
  })

  .state('page', {
    url: '/page11',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

  .state('team1', {
    url: '/roster',
    templateUrl: 'templates/team1.html',
    controller: 'team1Ctrl'
  })

  .state('viewStats', {
    url: '/stats',
    templateUrl: 'templates/viewStats.html',
    controller: 'viewStatsCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});