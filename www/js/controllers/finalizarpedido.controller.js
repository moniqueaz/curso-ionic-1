angular.module('starter')
.controller('FinalizarPedidoController', function($stateParams, $scope, $ionicPopup, $state, CarroService, $ionicHistory){

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
                $ionicHistory.nextViewOptions({
                    disableBack : true
                });
                $state.go('app.listagem');
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