appControllers.controller('quizRezultsCtrl', function ($scope, $state, $http, config) {
  $scope.ui = {};
  $scope.$on('$ionicView.beforeEnter', function() {
    $http.get(config.servicesPath + '/api/userscore').then(function(resp) {
      $scope.ui.score = resp.data.userscore;
    }, function(err) {
      console.error('ERR', err);
      var confirmPopup = $ionicPopup.alert({
        title: 'Error',
        template: err.data.message
      });
    });
  });

  $scope.goHome = function() {
    $state.go('mainTabs.home');
  };
});
