var app = angular.module('pauloApp');

app.controller('PessoasController', function($scope, $http, $routeParams,$filter) {

	var url = '/pessoa';
	var tipoPessoaFisica = "FISICA";
	var tipoPessoaJuridica = "JURIDICA";

	$scope.rows = [];
	$scope.pessoas = [];
	
	$scope.pessoa = {
		type : tipoPessoaFisica
	};

	$scope.isPessoaFisica = function() {
		return $scope.pessoa.type == tipoPessoaFisica;
	}

	$scope.isPessoaJuridica = function() {
		return !$scope.isPessoaFisica();
	}

	$scope.clear = function() {
		$scope.pessoaFisica = {};
		$scope.pessoaJuridica = {};
		console.log($scope.pessoaFisica)
	}

	function buiderPessoa() {
		let pessoa;
		if ($scope.isPessoaFisica()) {
			pessoa = $scope.pessoaFisica;
		} else {
			pessoa = $scope.pessoaJuridica;
		}
		pessoa.type = $scope.pessoa.type;
		return pessoa;
	}

	$scope.submeter = function() {
		let pessoa = buiderPessoa();
		console.log(pessoa);
		if(pessoa.id)
			update(pessoa);
		else
			save(pessoa);
	};


	function update(pessoa) {
		$http.patch(url, pessoa)
			.success(function (data) {
				$scope.clear();
				$scope.pessoas.push(data);
				builderRow(data);
				$scope.mensagem = 'Cadastrado com sucesso';
			}).error(function (erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possí­vel cadastrar';
			});
	}
	
	function save(pessoa){
		$http.post(url, pessoa).success(function(data) {
			$scope.clear();
			$scope.pessoas.push(data);
			builderRow(data);
			$scope.mensagem = 'Cadastrado com sucesso';
		}).error(function(erro) {
			console.log(erro);
			$scope.mensagem = 'Não foi possí­vel cadastrar';
		});
	}

	$scope.delete = function (id) {
		$http.delete(url.concat("/").concat(id))
			.success(function (data) {
				$scope.pessoas = $scope.pessoas.filter(function (el) {
					return (el.id != data);
				});
				builderRows();
			})
			.error(function (erro) {
				console.log(erro);
				$scope.mensagem = 'Ñão foi possiveal apagar'
		});
	};
	
	
	$scope.getPessoas = function() {
		$http.get(url)
        .success(function(data) {
			$scope.pessoas =  data;
			builderRows();
        })
        .error(function(erro) {
            console.log(erro);
            $scope.mensagem = 'Não foi possí­vel obter a lista de pessoas.';
     	})
	};

	function builderRows(){
		$scope.rows = [];
		for(var i = 0; i < $scope.pessoas.length; i++){
			builderRow($scope.pessoas[i]);
		}
	}
	
	function builderRow(data){
		var row = {};
		console.log(data);
		if(data.type == tipoPessoaFisica){
			row.id = data.id;
			row.first = data.nome;
			row.second = data.cpf;
			row.third = $filter('date')(new Date(data.dataNascimento), "dd/MM/yyyy")	;
		} else {
			row.id = data.id;
			row.first = data.razaoSocial;
			row.second = data.cnpj;
			row.third = data.nomeFantasia	;
		}
		if(row.id)
			$scope.rows.push(row);
	}
	
	$scope.select = function(id){
		console.log(id);
	}

	$scope.select = function(id){
		let selected = $scope.pessoas.filter(function (el) {
			return (el.id == id);
		});
		let pessoa = selected[0];
		if(pessoa){
			$scope.pessoa.type = pessoa.type;
			if($scope.isPessoaFisica())
				$scope.pessoaFisica = pessoa;
			else
				$scope.pessoaJuridica = pessoa;
		}
	}

})