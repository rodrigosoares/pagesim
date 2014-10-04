angular.module('pagesimApp', []).controller('SimuladorController', ['$scope', function($scope){
    $scope.teste = 'LEU O CONTROLLER';
    $scope.simulando = false;
    $scope.numQuadros = null;
    $scope.arquivo = null;

    $scope.simular = function() {
        $scope.simulando = true;
        $scope.teste = $scope.numQuadros + ' ' + $scope.arquivo;
    }
}]);