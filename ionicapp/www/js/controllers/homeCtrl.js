appControllers.controller('homeCtrl', function ($scope, $state, GameStore) {
  $scope.ui = {};
  $scope.$on('$ionicView.beforeEnter', function () {
    var game = GameStore.getGame();
    $scope.ui.gameName = game.name;
  });

  $scope.startQuiz = function() {
    $state.go('quizQuestion1');
  };
});
