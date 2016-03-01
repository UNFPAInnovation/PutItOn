appControllers.controller('signupCtrl', function ($scope, $state, $http, $ionicPopup, config) {
  $scope.ui = {};
  $scope.signUp = function() {
    $http.post(config.servicesPath + '/api/register',
      {
        "name": $scope.ui.phoneNumber,
        "password": $scope.ui.password
      }
    ).then(function(resp) {
      $state.go('login');
    }, function(err) {
      console.error('ERR', err);
      var confirmPopup = $ionicPopup.alert({
        title: 'Error',
        template: err.data.message
      });
    });

  };
});
