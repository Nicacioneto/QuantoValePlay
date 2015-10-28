angular.module('starter.controllers', ['callRails','Score'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})
.controller('ScoreCtrl', function($scope, Score) {
  Score.query().$promise.then(function(response){
    $scope.contratos = response;
  });
})

.controller('LeftSideMenu',
function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('ProfileCtrl',
function($scope, OpenFB) {
  OpenFB.get('/me').success(function(user) {
    $scope.user = user;
  });
})

.controller("ContractsController",
function($scope, $http) {
  var url = "http://localhost:3000/contratos/index";

  $http.get(url).success(function(data) {
    console.log(data);
    $scope.questions = data;
  }).error(function(error) {
    console.log("Server side error");
  });
})


.controller('JumpQuestion',function($scope, $http, ValuesService,ScoreEntry){
  ValuesService.buttonPress().then(function(response){
    console.log(ValuesService.getPreviousId);
    console.log(response.data);
    $scope.values = response.data;
  })

  $scope.jump = function(){

    ValuesService.buttonPress().then(function(response){
      console.log(ValuesService.getPreviousId);
      console.log(response.data);
      $scope.values = response.data;
    })

  }

})

.controller('valuesController',function($scope, $http, ValuesService)

{
  ValuesService.buttonPress().then(function(response) {
    console.log(ValuesService.getPreviousId);
    console.log(response.data);
    $scope.values = response.data;
  }, function(error) {
    console.error(error.message);
  });
})

.controller('Answer',
function($scope,ScoreEntry) {
  $scope.compare = function(x, y) {
    if (x === y) {
      ScoreEntry.buttonPress()
      document.getElementsByTagName('result')[0].innerHTML = 'Certo!';

    } else {
      document.getElementsByTagName('result')[0].innerHTML = 'Errado!';
    }
  }
  $scope.pular = function() {
    document.getElementsByTagName('result')[0].innerHTML = ' ';
  }
})

.controller('HomeCtrl',
function($scope, $ionicPopup, $auth) {
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro!',
      template: 'Você tem que estar logado para jogar.'
    });
  };

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function() {
      $ionicPopup.alert({
        title: 'Sucesso',
        content: 'Você está Logado!'
      })
    })
    .catch(function(response) {
      $ionicPopup.alert({
        title: 'Erro',
        content: response.data ? response.data || response.data.message : response
      })
    });
  };

  $scope.logout = function() {
    $auth.logout();
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
})
