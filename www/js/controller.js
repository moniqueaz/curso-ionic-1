angular.module('starter')
.controller('ListagemController', function($scope, CarroService){
    
        CarroService.obterCarros().then(function(dados){
    
          $scope.listaDeCarros = dados;
        });
    
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

angular.module('starter')
.controller('FinalizarPedidoController', function($stateParams, $scope, $ionicPopup, $state, CarroService){

    $scope.carroFinalizado = angular.fromJson($stateParams.carro);

    $scope.pedido = {};

    $scope.finalzarPedido = function(){

        var pedidoFinalizado = {
            params : {
                carro : $scope.carroFinalizado.nome,
                preco : $scope.carroFinalizado.preco,
                nome : $scope.pedido.nome,
                endereco : $scope.pedido.endereco, 
                email : $scope.pedido.email
            }
        }

        CarroService.salvarPedido(pedidoFinalizado).then(function(dados){
            $ionicPopup.alert({
                title : 'Parabens',
                template : 'Você acaba de comprar um carro'
            }).then(function(){
                $state.go('listagem');
            });
        }, function(erro){
            $ionicPopup.alert({
                title : 'Deu erro',
                template : 'Campos obrigatorios'
            });
        }
        );
    }
});

angular.module('starter')
.controller('LoginController', function($scope, CarroService, $ionicPopup, $state, $rootScope){
    $scope.login = {};

    $scope.realizarLogin = function(){
        var dadosDoLogin = {
            params : {
                email : $scope.login.email,
                senha : $scope.login.senha
            }
        }
        CarroService.realizarLogin(dadosDoLogin).then(function(dados){
            $rootScope.usuario = dados.usuario;

            $state.go('app.listagem');
        }, function(erro){
        $ionicPopup.alert({
            title : 'Opa!',
            template : 'E-mail ou senha incorretos.'
        });
    
        });
    }
});

angular.module('starter')
.controller('MenuController', function($rootScope, $scope){
    $scope.usuarioLogado = $rootScope.usuario;
});

