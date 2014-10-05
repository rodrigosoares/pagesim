angular.module('pagesimApp', []).controller('SimuladorController', ['$scope', '$http', function($scope, $http){
    $scope.teste = 'LEU O CONTROLLER';
    $scope.erro = false;
    $scope.simulando = false;
    $scope.numQuadros = null;
    $scope.algoritmo = null;
    $scope.stringReferencias = null;
    $scope.referencias = [];

    $scope.simular = function() {
        if ($scope.parametrosCorretos()) {
            $scope.simulando = true;
            $scope.erro = false;
            $scope.teste = $scope.numQuadros + ' referências: ' + $scope.algoritmo;
        }
    }

    $scope.obtemReferencias = function() {
        var regex = /\d+/g;
        $scope.referencias = $scope.stringReferencias.match(regex);
    }

    $scope.parametrosCorretos = function() {
        var corretude = false;
        if ($scope.numQuadros && $scope.algoritmo && $scope.stringReferencias) {
            $scope.obtemReferencias();
            corretude = true;
        } else {
            $scope.erro = true;
        }
        return corretude;
    }
}]);