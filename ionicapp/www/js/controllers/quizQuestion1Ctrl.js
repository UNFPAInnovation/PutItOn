appControllers.controller('quizQuestion1Ctrl', function ($scope, $state, GameStore, $http, config) {
  $scope.ui = {};
  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.ui.question = GameStore.getNextQuestion();
    $scope.ui.questionText = $scope.ui.question.text;
    $scope.ui.questionAnswers = $scope.ui.question.answers;
  });

  $scope.answerQuestion = function(answer) {
    GameStore.setCorrectAnswer($scope.ui.question.trueAnswer);
    GameStore.setChosenAnswer(answer);
    $http.post(config.servicesPath + '/api/result',
      {
        "answerId": answer['@rid'],
        "questionId": $scope.ui.question['@rid'],
        "isTrue": GameStore.userHasAnsweredCorrectly()
      }
    ).then(function(resp) {
      $state.go('quizAnswer1');
    }, function(err) {
      console.error('ERR', err);
      var confirmPopup = $ionicPopup.alert({
        title: 'Error',
        template: err.data.message
      });
    });

  };
});
