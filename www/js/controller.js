angular.module('starter')
.controller('ListagemController', function($scope){

    $scope.listaDeCarros = [{"nome" : 'BMD', "preco" : 70000}];
});

angular.module('starter')
.controller('CarroEscolhidoController', function($stateParams, $scope){

    $scope.carroEscolhido = angular.fromJson($stateParams.carro);

    $scope.listaDeAcessorios = [{"nome" : "Freio ABS", "preco" : 800},
                                {"nome" : "Ar-condicionado", "preco" : 1000},
                                {"nome" : "MP3 Player", "preco" : 500}];

    $scope.mudou = function(acessorio, isMArcado){
        if(isMArcado){
            $scope.carroEscolhido.preco = $scope.carroEscolhido.preco + acessorio.preco;
        }else{
            $scope.carroEscolhido.preco = $scope.carroEscolhido.preco - acessorio.preco;
        }
    }
});
