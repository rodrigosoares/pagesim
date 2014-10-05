var app = angular.module('pagesimApp', []);

app.controller('AplicacaoController', ['$scope', function($scope) {
    $scope.erro = false;
    $scope.numQuadros = null;
    $scope.algoritmo = null;
    $scope.stringReferencias = null;
    $scope.referencias = [];

    $scope.simular = function() {
        if ($scope.parametrosCorretos()) {
            $scope.erro = false;
            var params = {
                algoritmo: $scope.algoritmo,
                numQuadros: $scope.numQuadros,
                referencias: $scope.referencias
            };
            if ($scope.algoritmo == '1') {
                $scope.$parent.$broadcast('fifo', params);
            } else {
                if ($scope.algoritmo == '2') {
                    $scope.$parent.$broadcast('lru', params);
                } else {
                    $scope.$parent.$broadcast('random', params);
                }
            }
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

    $scope.$on('zerar', function() {
        $scope.numQuadros = null;
        $scope.algoritmo = null;
        $scope.stringReferencias = null;
        $scope.referencias = [];
    });
}]);

app.controller('SimuladorController', ['$scope', function($scope) {
    $scope.teste = 'SIMULADOR CONTROLLER';
    $scope.simulando = false;
    $scope.algoritmo = null;
    $scope.algoritmoNome = null;
    $scope.numQuadros = null;
    $scope.passo = null;
    $scope.referenciasOriginais = [];
    $scope.referenciasRestantes = [];
    $scope.memoria = []

    $scope.defineParametros = function(params) {
        $scope.simulando = true;
        $scope.passo = 0;
        $scope.algoritmo = params.algoritmo;
        $scope.numQuadros = params.numQuadros;
        $scope.referenciasOriginais = params.referencias;
        $scope.referenciasRestantes = params.referencias;
    }

    $scope.zerar = function() {
        $scope.simulando = false;
        $scope.passo = null;
        $scope.algoritmo = null;
        $scope.numQuadros = null;
        $scope.referenciasOriginais = [];
        $scope.referenciasRestantes = [];
        $scope.$parent.$broadcast('zerar', '');
    }

    $scope.$on('fifo', function(event, params) {
        $scope.defineParametros(params);
        $scope.simulaFIFO();
    });

    $scope.$on('lru', function(event, params) {
        $scope.defineParametros(params);
        $scope.simulaLRU();
    });

    $scope.$on('random', function(event, params) {
        $scope.defineParametros(params);
        $scope.simulaRandom();
    });

    $scope.simulaFIFO = function() {
        $scope.algoritmoNome = 'First In First Out (FIFO)';
        var quadro = -1;
        $scope.referencias.forEach(function(referencia) {
            (quadro < numQuadros - 1) ? (quadro++) : (quadro = 0);
            if (memoria.indexOf(referencia) == -1) {
                memoria[quadro] = referencia;

            } else {

            }
        });
    }

    $scope.simulaLRU = function() {
        $scope.algoritmoNome = 'Least Recently Used (LRU)';
    }

    $scope.simulaRandom = function() {
        $scope.algoritmoNome = 'aleatória';
    }
}]);