angular.module('app.controllers', [])

	.controller('AppCtrl', function($scope) {
		
	})
	
	.controller('LoginCtrl', function($scope, $state) {
		$scope.login = function() {
			$state.go('app.home');
		}
	})
	
	.controller('HomeCtrl', function($scope, $http, $state) {
		$scope.coach = {};
		$scope.teams = {};
		var coachid = "14";
		
		$http({
			method: "GET",
			url: "http://catchthedragon.ca/getcoachnametest.php",
			params: {CoachID: coachid, select: ""}
		}).then(function success(response) {
			$scope.coach = response.data;
		}, function error(response) {
			// alert(response.statusText);
		});
		
		$http({
			method: "GET",
			url: "http://catchthedragon.ca/getteamlisttest.php",
			params: {CoachID: coachid, select: ""}
		}).then(function success(response) {
			$scope.teams = response.data;
		}, function error(response) {
			// alert(response.statusText);
		});
		
		$scope.teamClicked = function(teamName) {
			// alert(teamName);
			$state.go('app.activity', {teamName: teamName});
		};
	})
	
	.controller('EvaluationHistoryCtrl', function($scope) {
		
	})
	
	.controller('ActivityCtrl', function($scope, $state, $stateParams, TeamEvaluationService) {
		$scope.types = ["Game", "Practice"];
		$scope.teamName = $state.params.teamName;
		
		$scope.evaluationClicked = function(evalType) {
			// alert(evalType);
			TeamEvaluationService.setType(evalType);
			$state.go('app.evaluation.attendance', {teamName: $state.params.teamName});
		};
	})
  
	.controller('EvaluationCtrl', function($scope, $sce, $state, $stateParams, $http, TeamEvaluationService) {
		$scope.players = {}; 
		$scope.attributes = {};
		$scope.attendanceGroup = [];
		$scope.attitudeGroup = [];
		$scope.abilityGroup = [];
		$scope.attendanceStatus = ["Present", "Late", "Absent"];
		// alert($state.params.teamName);
		$http({
			method: "GET",
			url: "http://catchthedragon.ca/getplayerlisttest.php",
			params: {TeamName: $state.params.teamName, select: ""}
		}).then(function success(response) {
			$scope.players = response.data;
			
			for (var i = 0; i < $scope.players.length; i++) {
				$scope.attendanceGroup[i] = {
					name: $scope.players[i].FirstName + " " + $scope.players[i].LastName,
					values: []
				};
				for(var j = 0; j < $scope.attendanceStatus.length; j++){
					$scope.attendanceGroup[i].values.push( "There are " + j + " sub-items here." ); // Push a button element in here
				}
			}
			// alert(JSON.stringify($scope.players, null, 4));
		}, function error(response) {
			// alert(response.statusText);
		});
		
		// Gets the attributes for the current club
		$http({
			method: "GET",
			url: "http://catchthedragon.ca/getattributes.php",
			params: {TeamName: $state.params.teamName, select: ""}
		}).then(
		function success(response) {
			// alert(response.data);
			$scope.attributes = response.data;
		}, 
		function error(response) {
			 // alert(response.statusText);
		});	
		
		$scope.attendanceClicked = function() {
			$state.go('app.evaluation.attendance');
		}
		
		$scope.attitudeClicked = function() {
			$state.go('app.evaluation.attitude');
		}
		
		$scope.abilityClicked = function() {
			$state.go('app.evaluation.ability');
		}
		
		$scope.toggleGroup = function(group) {
			if ($scope.isGroupShown(group)) {
				$scope.shownGroup = null;
			} else {
				$scope.shownGroup = group;
			}
		};
		
		$scope.isGroupShown = function(group) {
			return $scope.shownGroup === group;
		};
		
		
	})
	
	.controller('AttendanceCtrl', function($scope, $ionicPopover) {
		
		/*
		$ionicPopover.fromTemplateUrl('templates/attendencePopover.html', {
		  scope: $scope
		}).then(function(popover) {
		  $scope.popover = popover;
		});

		$scope.openPopover = function($event) {
		  $scope.popover.show($event);
		};

		$scope.closePopover = function() {
		  $scope.popover.hide();
		};

		//Cleanup the popover when we're done with it!
		$scope.$on('$destroy', function() {
		  $scope.popover.remove();
		});

		// Execute action on hide popover
		$scope.$on('popover.hidden', function() {
		  // Execute action
		});

		// Execute action on remove popover
		$scope.$on('popover.removed', function() {
		  // Execute action
		});
		*/
	})

	.controller('AttitudeCtrl', function($scope, $ionicPopover) {
		
		/*
		$ionicPopover.fromTemplateUrl('templates/attitudePopover.html', {
		  scope: $scope
		}).then(function(popover) {
		  $scope.popover = popover;
		});

		$scope.openPopover = function($event) {
		  $scope.popover.show($event);
		};

		$scope.closePopover = function() {
		  $scope.popover.hide();
		};

		//Cleanup the popover when we're done with it!
		$scope.$on('$destroy', function() {
		  $scope.popover.remove();
		});

		// Execute action on hide popover
		$scope.$on('popover.hidden', function() {
		  // Execute action
		});

		// Execute action on remove popover
		$scope.$on('popover.removed', function() {
		  // Execute action
		});
		*/
	})

	.controller('AbilityCtrl', function($scope, $ionicPopover) {
		
		/*
		$ionicPopover.fromTemplateUrl('templates/abilityPopover.html', {
		  scope: $scope
		}).then(function(popover) {
		  $scope.popover = popover;
		});

		$scope.openPopover = function($event) {
		  $scope.popover.show($event);
		};

		$scope.closePopover = function() {
		  $scope.popover.hide();
		};

		//Cleanup the popover when we're done with it!
		$scope.$on('$destroy', function() {
		  $scope.popover.remove();
		});

		// Execute action on hide popover
		$scope.$on('popover.hidden', function() {
		  // Execute action
		});

		// Execute action on remove popover
		$scope.$on('popover.removed', function() {
		  // Execute action
		});
		*/
	})
  
	/* .controller('retrievePlayersCtrl', function($scope) {
	  
	// Get Technical Director Teams for their club
	var clubid="5" // !!!!!!!!!!! Replace 'Team 14' with $scope.teamname !!!!!!!!!!!
	var dataString="ClubID="+clubid+"&select=";

	if($.trim(clubid).length>0){
		$.ajax({
			type: "GET",
			url:"http://catchthedragon.ca/gettechteams.php", 
			data: dataString, 
			datatype: "jsonp",
			jsonp: true,
			crossDomain: true,
			cache: false,
			success: function(response){		
				// alert(response);
				
				$scope.playerArray = JSON.parse(response);
			},
			error: function(){
				alert("Get Technical Director Teams failed. The request to the server could not be completed. Try again later.");
			}
		});
	}
	  
	// Upon controller startup, load in the team players and custom club attributes 
	var init = function(){ 
		
		// Get Players on a Team
		var teamname="Team 14" // !!!!!!!!!!! Replace 'Team 14' with $scope.teamname !!!!!!!!!!!
		var dataString="TeamName="+teamname+"&select=";
		
		if($.trim(teamname).length>0){
			$.ajax({
				type: "GET",
				url:"http://catchthedragon.ca/getplayers.php", 
				data: dataString, 
				datatype: "jsonp",
				jsonp: true,
				crossDomain: true,
				cache: false,
				success: function(response){		
					// alert(response);
					
					$scope.playerArray = JSON.parse(response);
				},
				error: function(){
					alert("Get Players failed. The request to the server could not be completed. Try again later.");
				}
			});
		}
		
		// Get attributes for this club
		var teamname="Team 14" // !!!!!!!!!!! Replace 'Team 14' with $scope.teamname !!!!!!!!!!!
		var dataString="TeamName="+teamname+"&select=";
		
		if($.trim(teamname).length>0){
			$.ajax({
				type: "GET",
				url:"http://catchthedragon.ca/getattributes.php", 
				data: dataString, 
				datatype: "jsonp",
				jsonp: true,
				crossDomain: true,
				cache: false,
				success: function(response){		
					// alert(response);
					
					$scope.attributeArray = JSON.parse(response);
				},
				error: function(){
					alert("Get Attributes failed. The request to the server could not be completed. Try again later.");
				}
			});
		}
	};

	init();
	})
  
	.controller('submitEvaluationCtrl', function($scope) {
	  
	$scope.submit = function() {
		//inserts data into db  
		var clubid="5"
		var teamname="The Lions";
		var dataString="clubID="+clubid+"&teamName="+teamname+"&insert=";
		
		if($.trim(clubid).length>0 & $.trim(teamname).length>0)
		{
			$.ajax({
				type: "POST",
				url:"http://catchthedragon.ca/insert.php",
				data: dataString,
				crossDomain: true,
				cache: false,
				success: function(data){
					if(data=="ok")
					{
						alert("inserted");
					}
					else if(data=="error")
					{
						alert("error");
					}
				}
			});
		}
	};
	}) */
