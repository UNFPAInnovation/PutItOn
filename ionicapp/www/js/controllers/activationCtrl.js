appControllers.controller('activationCtrl', function ($scope, $state) {
  $scope.activate = function() {
    $state.go('mainTabs.home');
  };
});
