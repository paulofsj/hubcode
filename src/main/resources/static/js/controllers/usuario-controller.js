angular
		.module('o2')
		.controller(
				'UsuarioController',
				function($scope, $http, $routeParams) {

					var url = '/rs/user';

					$scope.usuario = {};

					if ($scope.usuario)

						$scope.submeter = function() {

							if ($scope.usuario.login && $scope.usuario.senha) {

								console.log($scope.usuario);

								$http
										.post(url, $scope.usuario)
										.success(
												function() {
													$scope.usuario = {};
													$scope.mensagem = 'Foto cadastrada com sucesso';
												})
										.error(
												function(erro) {
													console.log(erro);
													$scope.mensagem = 'Não foi possível cadastrar a foto';
												});
							}
						};

				});