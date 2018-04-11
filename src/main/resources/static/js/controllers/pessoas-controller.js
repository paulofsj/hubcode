angular.module('pauloApp').controller('PessoasController', function($scope, $http, $routeParams,$filter) {

	var url = '/pessoa';
	var tipoPessoaFisica = "FISICA";
	var tipoPessoaJuridica = "JURIDICA";

	$scope.rows = [];
	$scope.pessoas = [];
	$scope.tipo = tipoPessoaFisica;
	$scope.pessoa = {};
	
	$scope.isPessoaFisica = function() {
		return $scope.tipo == tipoPessoaFisica;
	}

	$scope.isPessoaJuridica = function() {
		return !$scope.isPessoaFisica();
	}

	$scope.clear = function() {
		$scope.pessoaFisica = {};
		$scope.pessoaJuridica = {};
	}

	function buiderPessoa() {
		let pessoa;
		if ($scope.isPessoaFisica()) {
			pessoa = $scope.pessoaFisica;
		} else {
			pessoa = $scope.pessoaJuridica;
		}
		pessoa.type = $scope.tipo;
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
				filterPessoas(data.id);
				$scope.pessoas.push(data);
				builderRows();
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
				filterPessoas(data);
				builderRows();
			})
			.error(function (erro) {
				console.log(erro);
				$scope.mensagem = 'Ñão foi possiveal apagar'
		});
	};
	
	function filterPessoas(pessoaId) {
		$scope.pessoas = $scope.pessoas.filter(function (el) {
			return (el.id != pessoaId);
		});
	}
	
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
			row.third = $filter('date')(data.dataNascimento, "dd/MM/yyyy")	;
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
		let selected = $scope.pessoas.filter(function (el) {
			return (el.id == id);
		});
		let pessoa = selected[0];
		if(pessoa){
			$scope.tipo = pessoa.type;
			if($scope.isPessoaFisica()){
				$scope.pessoaFisica = pessoa;
				$scope.pessoaFisica.dataNascimento = new Date(pessoa.dataNascimento);
			}	
			else
				$scope.pessoaJuridica = pessoa;
		}
	}

})