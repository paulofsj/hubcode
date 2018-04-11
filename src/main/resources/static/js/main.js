angular.module('pauloApp', ['ngAnimate', 'ngRoute','ngResource']).config(function($routeProvider, $locationProvider) {

	$locationProvider
	  .html5Mode(false)
	  .hashPrefix('');

	$routeProvider.when('/cadastroPessoa', {
		templateUrl: 'partials/pessoas.html',
		controller: 'PessoasController'
	});

	$routeProvider.otherwise({redirectTo: '/'});

});

