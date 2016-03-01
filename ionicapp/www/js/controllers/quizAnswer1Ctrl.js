appControllers.controller('quizAnswer1Ctrl', function ($scope, $state, GameStore) {
  $scope.ui = {};
  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.ui.nextPage = GameStore.hasNextQuestion() ? 'Next question' : 'Finish';
    $scope.ui.correctAnswer = GameStore.getCorrectAnswer();
    $scope.ui.chosenAnswer = GameStore.getChosenAnswer();
    $scope.ui.questionCommentOnCorrectAnswer = GameStore.getCurrentQuestion().questionCommentOnCorrectAnswer;
    $scope.ui.questionCommentOnWrongAnswer = GameStore.getCurrentQuestion().questionCommentOnWrongAnswer;
    $scope.ui.userHasAnsweredCorrectly = GameStore.userHasAnsweredCorrectly();
  });

  $scope.nextQuestionOrAnswers = function() {
    if(GameStore.hasNextQuestion()){
      $state.go('quizQuestion1');
    }else {
      $state.go('quizRezults');
    }
  };
});

