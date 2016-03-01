angular.module('app.services', [])


.service('GameStore', [function(){
  var gameToStore="";
  var questionCounter = 0;
  var correctAnswer;
  var chosenAnswer;
  var currentQuestion;

  this.getCurrentQuestion = function () {
    return currentQuestion;
  };

  this.setGame = function(game) {
    gameToStore=game;
  };
  this.getGame = function() {
    questionCounter = 0;
    return gameToStore;
  };

  this.getNextQuestion = function() {
    if(questionCounter < gameToStore.questions.length) {
      currentQuestion = gameToStore.questions[questionCounter++];
      return currentQuestion;
    }else {
      return false;
    }
  };

  this.userHasAnsweredCorrectly = function () {
    return chosenAnswer['@rid'] === correctAnswer['@rid'];
  };

  this.hasNextQuestion = function () {
    return questionCounter < gameToStore.questions.length;
  };

  this.setCorrectAnswer = function(answer){
    correctAnswer = answer;
  };
  this.getCorrectAnswer = function(answer){
    return correctAnswer;
  };

  this.setChosenAnswer = function (answer) {
    chosenAnswer = answer;
  };
  this.getChosenAnswer = function () {
    return chosenAnswer;
  };

}]);
