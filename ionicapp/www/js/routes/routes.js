angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('mainTabs.mySpace', {
        url: '/myspace',
        views: {
          'tab2': {
            templateUrl: 'templates/mySpace.html',
            controller: 'mySpaceCtrl'
          }
        }
      })

      .state('mainTabs.suggestQuestionForNextQuizzes', {
        url: '/suggestquestion',
        views: {
          'tab3': {
            templateUrl: 'templates/suggestQuestionForNextQuizzes.html',
            controller: 'suggestQuestionForNextQuizzesCtrl'
          }
        }
      })

      .state('mainTabs', {
        url: '/maintabs',
        abstract: true,
        templateUrl: 'templates/mainTabs.html'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      })

      .state('activation', {
        url: '/activation',
        templateUrl: 'templates/activation.html',
        controller: 'activationCtrl'
      })

      .state('mainTabs.home', {
        url: '/home',
        views: {
          'tab1': {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
          }
        }
      })

      .state('quizQuestion1', {
        url: '/quizquestion/1',
        templateUrl: 'templates/quizQuestion.html',
        controller: 'quizQuestion1Ctrl'
      })

      .state('quizAnswer1', {
        url: '/quizanswer/1',
        templateUrl: 'templates/quizAnswer.html',
        controller: 'quizAnswer1Ctrl'
      })

      .state('quizRezults', {
        url: '/quizresults',
        templateUrl: 'templates/quizRezults.html',
        controller: 'quizRezultsCtrl'
      });

    $urlRouterProvider.otherwise('/login');

  });
