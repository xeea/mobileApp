angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('app', {
		url: '/',
		abstract: true,
		templateUrl: 'templates/app.html',
		controller: 'AppCtrl'
	})
	
	.state('app.home', {
		url: 'home',
		views: {
			'menuContent': {
				templateUrl: 'templates/home.html',
				controller: 'HomeCtrl'
			}
		},
		resolve: {
			coachName: ['CoachInfoFactory', function(CoachInfoFactory) {
				return CoachInfoFactory.retrieveCoachName();
			}],
			coachTeams: ['CoachInfoFactory', function(CoachInfoFactory) {
				return CoachInfoFactory.retrieveCoachTeams();
			}]
		}
	})

    .state('app.admin', {
      url: '/admin',
      views: {
        'menuContent': {
          templateUrl: 'templates/admin.html',
          controller: 'AdminCtrl'
        }
      },
      resolve: {
        coachName: ['CoachInfoFactory', function(CoachInfoFactory) {
          return CoachInfoFactory.retrieveCoachName();
        }],
        coachTeams: ['CoachInfoFactory', function(CoachInfoFactory) {
          return CoachInfoFactory.retrieveCoachTeams();
        }]
      }
    })
	
	.state('app.activity', {
		url: 'activity/',
		views: {
			'menuContent': {
				templateUrl: 'templates/activity.html',
				controller: 'ActivityCtrl'
			}
		}
	})
  
	.state('login', {
		url: '/login',
		templateUrl: 'templates/login.html',
		controller: 'LoginCtrl'
	})
  
    .state('app.evaluation', {
		url: 'evaluation',
		abstract: true,
		cache: false,
		views: {
			'menuContent': {
				templateUrl: 'templates/evaluation.html',
				controller: 'EvaluationCtrl'
			}
		},
		resolve: {
			initializeEvaluation: ['TeamEvaluationFactory', function(TeamEvaluationFactory) {
				return TeamEvaluationFactory.initializeEvaluation();
			}]
		}
	})

	.state('app.evaluation.attendance', {
		url: '/attendance',
		views: {
			'tab-attendance': {
				templateUrl: 'templates/attendance.html',
				controller: 'AttendanceCtrl'
			}
		}
	})

	.state('app.evaluation.attitude', {
		url: '/attitude',
		views: {
			'tab-attitude': {
				templateUrl: 'templates/attitude.html',
				controller: 'AttitudeCtrl'
			}
		}
	})

	.state('app.evaluation.ability', {
		url: '/ability',
		views: {
			'tab-ability': {
				templateUrl: 'templates/ability.html',
				controller: 'AbilityCtrl'
			}
		}
	})

$urlRouterProvider.otherwise('/login')

});
