angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('TeamEvaluationService', [function(){
	var teamEvaluation = {
						  type: {},
						  playerData: []
						 }
	
	var setType = function(evalType) {
		teamEvaluation.type = evalType;
	};
	
	var getType = function() {
		return teamEvaluation.type;
	};
	
	var addPlayerData = function(playerStats) {
		teamEvaluation.playerData.push(playerStats);
	};
	
	var clearEvaluation = function() {
		teamEvaluation.type = {};
		teamEvaluation.playerData.length = 0;
	};
	
	return {
		setType: setType,
		getType: getType,
		addPlayerData: addPlayerData,
		clearEvaluation: clearEvaluation
	};
}]);

