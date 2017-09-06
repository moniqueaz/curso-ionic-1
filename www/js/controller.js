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

angular.module('starter')
.controller('PerfilController', function($rootScope, $scope, $cordovaCamera){

    // refatorar e colocar em uma function
    $scope.estaEditando = false;
    $scope.textoBotao = 'Editar';

    $scope.usuarioLogado = $rootScope.usuario;

    $scope.tirarFoto = function(){
        var opcoes = {
            correctOrientation : true, // orientacao da foto de acordo com a camera
            quality : 70, // qualidade %
            saveToPhotoAlbum: false, // salvar no album
            cameraDirection: 1, // frontal
            targetWidth: 100, // testar
            targetHeight: 100 // testar
        }

        $cordovaCamera.getPicture(opcoes).then(function(foto){
            $scope.caminhoFoto = foto;
        }, function(erro){

        });
    }

    $scope.acaoBotao = function(){
        if($scope.estaEditando){
            $scope.estaEditando = false;
            $scope.textoBotao = 'Editar';
        }else{
            $scope.estaEditando = true;
            $scope.textoBotao = 'Salvar';
        }
    }
});

