angular.module('app.controllers', [])

.controller('AppCtrl', function($scope) {

})

  .controller('LoginCtrl', function($scope, $state, $http, $ionicPlatform) {
    $scope.input = {
      email:  "",
      password: ""
    }
    $scope.login = function() {
      $http({
        method: "GET",
        url: "http://soccer-pro-file.com/verification.php",
        params: {email: $scope.input.email, password: $scope.input.password, select: ""}
      }).then(function success(response) {
        //$scope.result = response.data;
        if(response.data == "coach"){
          $state.go('app.home');
          $ionicPlatform.registerBackButtonAction(function (event) {
            event.preventDefault();
          }, 100);
        }else if(response.data == "admin"){
          $state.go('app.admin');
          $ionicPlatform.registerBackButtonAction(function (event) {
            event.preventDefault();
          }, 100);
        } else{
          alert(response.data);
        }
      }, function error(response) {
        alert(response.data);
      });

    };
  })

.controller('HomeCtrl', function($scope, $http, $state, coachName, coachTeams, TeamEvaluationFactory) {
	// sets the coach name which was returned by the resolve (look in routes.js and services.js)
	$scope.coachName = coachName;
	// sets the coach's teams which was returned by the resolve (look in routes.js and services.js)
	$scope.teams = coachTeams;

	// when a team is clicked, change to activity view send over the team name
	$scope.teamClicked = function(teamName) {
		// alert(teamName);
		// sets team to be evaluated
		TeamEvaluationFactory.setTeam(teamName);
		$state.go('app.activity');
	};
})

.controller('EvaluationHistoryCtrl', function($scope) {

})

.controller('ActivityCtrl', function($scope, $state, TeamEvaluationFactory) {
	// the types of evaluations (more can be added in the future)
	$scope.types = ["Game", "Practice"];
	// bind team name heading
	$scope.teamName; 
  
  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.teamName = TeamEvaluationFactory.getTeam();
  });

	// sets the evaluation type, and sends over the team name as data to the evaluation view
	$scope.evaluationClicked = function(evalType) {
		// alert(evalType);
		// sets type of evaluation based on button clicked
		TeamEvaluationFactory.setType(evalType);
		// switches to evaluation view
		$state.go('app.evaluation.attendance');
	};
})

.controller('EvaluationCtrl', function($scope, $state, initializeEvaluation, TeamEvaluationFactory) {
	$scope.players = initializeEvaluation;
  // Present is represented in the data base as a 1, Late is 2, Absent is 3
	$scope.attendanceValues = [{text: "Present", value: 1},
								{text: "Late", value: 2},
								{text: "Absent", value: 3}];

	$scope.submit = function() {
		TeamEvaluationFactory.addPlayerData($scope.players);
		TeamEvaluationFactory.insertEvaluation();
		$state.go('app.home');
	};

	$scope.toggleGroup = function(group) {
		group.show = !group.show;
	};
	$scope.isGroupShown = function(group) {
		return group.show;
	};
})

.controller('AttendanceCtrl', function($scope, initializeEvaluation) {

})

.controller('AttitudeCtrl', function($scope) {

})

.controller('AbilityCtrl', function($scope) {

})

  /*.controller('AdminCtrl', function($scope) {

  })*/


  .controller('AdminCtrl', function($scope, $http, $state, coachName, coachTeams, TeamEvaluationFactory) {
    // sets the coach name which was returned by the resolve (look in routes.js and services.js)
    $scope.coachName = coachName;
    // sets the coach's teams which was returned by the resolve (look in routes.js and services.js)
    $scope.teams = coachTeams;

    // when a team is clicked, change to activity view send over the team name
    $scope.teamClicked = function(teamName) {
      // alert(teamName);
      // sets team to be evaluated
      TeamEvaluationFactory.setTeam(teamName);
      $state.go('app.activity');
    };
  })
