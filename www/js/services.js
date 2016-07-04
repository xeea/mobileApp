angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('CoachInfoFactory', ['$http', function($http) {
	var coachInfo = {
						//replace coachID from what the login controller set
						coachID: "14",
						coachName: "",
						teamList: []	
					}
	
	coachInfo.getcoachID = function() {
		
	};
	
	coachInfo.setcoachID = function() {
		
	};
	
	coachInfo.getcoachName = function() {
		
	};
	
	coachInfo.setcoachName = function() {
		
	};
	
	coachInfo.getTeamList = function() {
		
	};
	
	coachInfo.setTeamList = function() {
		
	};
	
	// goes to db and gets coach name
	coachInfo.retrieveCoachName = function() {
		return $http({
					method: "GET",
					url: "http://soccer-pro-file.com/GetCoachName.php",
					params: {CoachID: coachInfo.coachID, select: ""}
					}).then(function success(response) {
						coachInfo.coachName = response.data[0].FirstName + " " + response.data[0].LastName;
						return coachInfo.coachName;
					}, function error(response) {
						return response.statusText;
					});
	};
	
	// goes to db and gets the coach's teams
	coachInfo.retrieveCoachTeams = function() {
		return $http({
					method: "GET",
					url: "http://soccer-pro-file.com/GetTeamList.php",
					params: {CoachID: coachInfo.coachID, select: ""}
					}).then(function success(response) {
						coachInfo.teamList = response.data;
						return response.data;
					}, function error(response) {
						return response.statusText;
					});
	};
	return coachInfo;
}])

/*
	Service used to intialize an evaluation event. Holds the information required for a evaluation,
	and provides functions to set properties of an evaluation. Properties include evaluation types, 
	teams, and playerData, which hold the captured criteria for every player on a team.
*/
.factory('TeamEvaluationFactory', ['$http', '$q', function($http, $q){
	// the evaluation
	var teamEvaluation = {
							type: {},
							team: {},
							playerData: []
						 }
	// player constructor					 
	function Player(playerID, teamID, firstName, lastName, yearOfBirth, teamNumber, contact) {
		this.playerID = playerID;
		this.teamID = teamID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.yearOfBirth = yearOfBirth;
		this.teamNumber = teamNumber;
		this.contact = contact;
		this.attributes = [];
		this.notes = [{attendance: ""}, {attitude: ""}, {ability: ""}];
		this.show = false;
	}
	
	// attributes
	function Attribute(attributeID, name, value) {
		this.attributeID = attributeID;
		this.name = name;
		this.value = value;
	}
	
	// sets the type of the evaluation					 
	teamEvaluation.setType = function(evalType) {
		//alert(evalType);
		teamEvaluation.type = evalType;
	};
	
	// gets the type of the evaluation
	teamEvaluation.getType = function() {
		return teamEvaluation.type;
	};
	
	// sets the team the evaluation is for
	teamEvaluation.setTeam = function(team) {
		//alert(team);
		teamEvaluation.team = team;
	};
	
	// gets the team the evaluation is for
	teamEvaluation.getTeam = function() {
		return teamEvaluation.team;
	};
	
	// adds playerdata to the evaluation
	teamEvaluation.addPlayerData = function(playerData) {
		teamEvaluation.playerData.push(playerData);
		//console.log(JSON.stringify(teamEvaluation, null, 4));
	};
	
	// clears the evaluation
	teamEvaluation.clearEvaluation = function() {
		teamEvaluation.type = {};
		teamEvaluation.playerData.length = 0;
	};
	
	/*
		Sends the evaluation as JSON to the server for processing.
	*/
	teamEvaluation.insertEvaluation = function() {
		return $http({
			method: "POST",
			url: "http://soccer-pro-file.com/SubmitEvaluation.php",
			params: {insert: ""},
			data: teamEvaluation
		}).then(function success(response) {
			console.log(JSON.stringify(response, null, 4));
			teamEvaluation.clearEvaluation();
			return response.data;
		}, function error(response) {
			return response.statusText;
		});
	};
	
	/*
	builds the JSON evaluation that is to be used by the evaluation event
	*/
	teamEvaluation.createEvaluation = function(playerList, attributeList) {
		var playerEvaluations = [];
		for (var i = 0; i < playerList.length; i++) {
			var tmp = new Player(playerList[i].PlayerID, playerList[i].TeamID,
			playerList[i].FirstName, playerList[i].LastName, playerList[i].YearOfBirth, 
			playerList[i].PlayerNumber, playerList[i].Contact);
			for (var j = 0; j < attributeList.length; j++) {
				tmp.attributes.push(new Attribute(attributeList[j].AttributeID, attributeList[j].Name, j == 0 ? 1 : 3));
			}
			playerEvaluations.push(tmp);
		}
		//alert("from activity" + JSON.stringify(playerEvaluations, null, 4));
		//console.log(JSON.stringify(playerEvaluations, null, 4));
		return playerEvaluations;
	};
	
	// retrieves the players of a team
	teamEvaluation.retrievePlayerList = function() {
		return $http({
			method: "GET",
			url: "http://soccer-pro-file.com/GetPlayerList.php",
			params: {TeamName: teamEvaluation.team, select: ""}
		}).then(function success(response) {
			//alert(JSON.stringify(response.data, null, 4));
			return response.data;
		}, function error(response) {
			return response.statusText;
		});
	};
	
	// retrieves the attributes for the players
	teamEvaluation.retrieveAttributeList = function() {
		return $http({
			method: "GET",
			url: "http://soccer-pro-file.com/GetAttributeList.php",
			params: {TeamName: teamEvaluation.team, select: ""}
		}).then(function success(response) {
			//alert(JSON.stringify(response.data, null, 4));
			return response.data;
		}, function error(response) {
			return response.statusText;
		});
	};
	
	/* 
		function used by state resolver, gets players, attributes,
		and then constructs the evaluation which is used by the evaluation event
	*/
	teamEvaluation.initializeEvaluation = function() {
		// result returned by retrievePlayerData
		var playerList = teamEvaluation.retrievePlayerList();
		// result returned by retrieveAttributeData
		var attributeList = teamEvaluation.retrieveAttributeList();
		
		return $q.all([playerList, attributeList]).then(function(results) {
			return teamEvaluation.createEvaluation(results[0], results[1]);
		});
	};
	return teamEvaluation;
}]);