angular.module('app.controllers', [])

.controller('loginCtrl', function($scope) {

})

.controller('attitudeCtrl', function($scope) {

})

.controller('abilityCtrl', function($scope) {

})

.controller('homeCtrl', function($scope) {

})

.controller('playerMenuCtrl', function($scope) {

})

.controller('pageCtrl', function($scope) {

})

.controller('team1Ctrl', function($scope) {

})

.controller('viewStatsCtrl', function($scope) {

})

  .controller('attendanceCtrl', function($scope, $ionicPopover) {

    $ionicPopover.fromTemplateUrl('templates/attendancePopover.html', {
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
  })

  .controller('attitudeCtrl', function($scope, $ionicPopover) {

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
  })

  .controller('abilityCtrl', function($scope, $ionicPopover) {

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
  })
  
  .controller('retrievePlayersCtrl', function($scope) {
	  
	// Upon controller startup, load in the team players and custom club attributes 
	var init = function(){ 
		
		var teamname="Team 14" // !!!!!!!!!!! Replace 'Team 14' with $scope.teamname !!!!!!!!!!!
		var dataString="TeamName="+teamname+"&select=";
		
		if($.trim(teamname).length>0){
			$.ajax({
				type: "GET",
				url:"http://catchthedragon.ca/getplayers.php", 
				data: dataString, 
				datatype: "jsonp",
				jsonp: false,
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
		
		if($.trim(teamname).length>0){
			$.ajax({
				type: "GET",
				url:"http://catchthedragon.ca/getattributes.php", 
				// data: dataString, 
				datatype: "jsonp",
				jsonp: false,
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
    
  .controller('getcoachteams', function($scope){
	  
	// Upon controller startup, load in the custom club attributes
	var init = function(){
		
		var coachid="5" // !!!!!!!!!!! Replace '5' with $scope.coachID or whatever we call the logged in coach ID !!!!!!!!!!!
		var dataString="CoachID="+coachid+"&select=";
		
		if($.trim(coachid).length>0){
			$.ajax({
				type: "GET",
				url:"http://catchthedragon.ca/getcoachteams.php", 
				datatype: "jsonp",
				data: dataString, 
				jsonp: false,
				crossDomain: true,
				cache: false,
				success: function(response){		
					// alert(response);
					
					$scope.teamArray = JSON.parse(response);
				},
				error: function(){
					alert("Get Teams failed. The request to the server could not be completed. Try again later.");
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
  })
