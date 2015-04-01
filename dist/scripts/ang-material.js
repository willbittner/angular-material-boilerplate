var app = angular.module( 'ngApp', [ 'ngMaterial' ] );
app.controller( 'AppCtrl', [ '$scope', '$mdSidenav', function ( $scope, $mdSidenav ) {
	$scope.toggleSidenav = function ( menuId ) {
		$mdSidenav( menuId ).toggle();
	};
} ] );