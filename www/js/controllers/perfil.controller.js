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