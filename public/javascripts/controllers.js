/* javascripts/controllers.js ============= */

angular.module('authCtrls', [])

// SignupCtrl ======================================
.controller('SignupCtrl', function($scope, $state, $stateParams, User) {
    $scope.user = new User();       // creates new User, properties set by ng-model

    $scope.addUser = function(){
        // issues POST to /users
        $scope.user.$save(function() {
            $state.go('home');      // On success, go back home.
        });
    };
})

// LoginCtrl ========================================
.controller('LoginCtrl', function($scope, $state, $stateParams, User) {
    $scope.loginUser = function() {
        $scope.user = User.get({ id: $stateParams.id });
    };


})

// AccountCtrl =======================================
.controller('AccountCtrl', function($scope, $stateParams, User) {
    $scope.user = User.get({ id: $stateParams.id });   // pulls up the user

    $scope.updateUser = function() {
        $scope.user.$update(function() {
            $state.reload('account');
        });
    };
})