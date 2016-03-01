appControllers.controller('loginCtrl', function ($scope, $state, $http, $ionicPopup, $window, config, GameStore) {
  $scope.ui = {};
  $scope.login = function() {
    $http.post(config.servicesPath + '/api/authenticate',
      {
        "name": $scope.ui.phoneNumber,
        "password": $scope.ui.password
      }
    ).then(function(resp) {
      $window.sessionStorage.token = resp.data.token;

      $http.get(config.servicesPath + '/api/quiz/13:0').then(function(resp) {
        GameStore.setGame(resp.data);
        $state.go('mainTabs.home');
      }, function(err) {
        console.error('ERR', err);
        var confirmPopup = $ionicPopup.alert({
          title: 'Error',
          template: err.data.message
        });
      });

    }, function(err) {
      console.error('ERR', err);
      var confirmPopup = $ionicPopup.alert({
        title: 'Error',
        template: err.data.message
      });
    });
  };

  $scope.signUp = function() {
    $state.go('signup');
  };

  $scope.skipLogin = function() {
    $state.go('mainTabs.home');
  };

});
