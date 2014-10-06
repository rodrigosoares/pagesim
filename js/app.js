var app = angular.module('pagesimApp', []);

app.controller('AplicacaoController', ['$scope', function($scope) {
    $scope.erro = false;
    $scope.simulando = false;
    $scope.numQuadros = null;
    $scope.algoritmo = null;
    $scope.stringReferencias = null;
    $scope.referencias = [];

    $scope.simular = function() {
        if ($scope.parametrosCorretos()) {
            $scope.erro = false;
            $scope.simulando = true;
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
        $scope.simulando = false;
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
    $scope.referenciasOriginais = [];
    $scope.referenciasRestantes = [];
    $scope.memoria = []
    $scope.passo = 0;
    $scope.acertos = 0;
    $scope.quadroAtual = 0;

    $scope.defineParametros = function(params) {
        $scope.simulando = true;
        $scope.algoritmo = params.algoritmo;
        $scope.numQuadros = params.numQuadros;
        $scope.referenciasOriginais = params.referencias.slice(0);
        $scope.referenciasRestantes = params.referencias.slice(0);
    }

    $scope.zerar = function() {
        $scope.simulando = false;
        $scope.passo = 0;
        $scope.acertos = 0;
        $scope.algoritmo = null;
        $scope.numQuadros = null;
        $scope.referenciasOriginais = [];
        $scope.referenciasRestantes = [];
        $scope.memoria = [];
        $scope.quadroAtual = 0;
        $scope.$parent.$broadcast('zerar', '');
    }

    $scope.avancar = function() {
        if ($scope.algoritmo == '1') {
            $scope.simulaFIFO();
        } else {
            if ($scope.algoritmo == '2') {
                $scope.simulaLRU();
            } else {
                $scope.simulaRandom();
            }
        }
    }

    $scope.simulaFIFO = function() {
        $scope.algoritmoNome = 'First In First Out (FIFO)';
        if ($scope.memoria.indexOf($scope.referenciasOriginais[$scope.passo]) == -1) {
            $scope.memoria[$scope.quadroAtual] = $scope.referenciasOriginais[$scope.passo];
            ($scope.quadroAtual < $scope.numQuadros - 1) ? ($scope.quadroAtual++) : ($scope.quadroAtual = 0);
        } else {
            $scope.acertos++;
        }
        $scope.passo++;
        $scope.referenciasRestantes.shift();
    }

    $scope.simulaLRU = function() {
        $scope.algoritmoNome = 'Least Recently Used (LRU)';
        var hit = false;
        var pos = null;
        $scope.memoria.forEach(function(quadro, indice) {
            if (!hit && quadro.pagina == $scope.referenciasOriginais[$scope.passo]) {
                hit = true;
                pos = indice;
            }
        });
        if (hit) {
            $scope.memoria[pos].tempo = $scope.passo;
            $scope.acertos++;
        } else {
            var quadro = {
                pagina: $scope.referenciasOriginais[$scope.passo],
                tempo: $scope.passo
            }
            if ($scope.memoria.length < $scope.numQuadros) {
                pos = $scope.memoria.length;
            } else {
                var tempo = $scope.passo;
                $scope.memoria.forEach(function(quadro, indice) {
                    if (quadro.tempo < tempo) {
                        tempo = quadro.tempo;
                        pos = indice;
                    }
                });
            }
            $scope.memoria[pos] = quadro;
        }
        $scope.passo++;
        $scope.referenciasRestantes.shift();
    }

    $scope.simulaRandom = function() {
        $scope.algoritmoNome = 'aleatória';
        if ($scope.memoria.indexOf($scope.referenciasOriginais[$scope.passo]) == -1) {
            var pos = null;
            if ($scope.memoria.length < $scope.numQuadros) {
                pos = $scope.memoria.length;
            } else {
                pos = Math.floor(Math.random() * $scope.numQuadros);
            }
            $scope.memoria[pos] = $scope.referenciasOriginais[$scope.passo];
        } else {
            $scope.acertos++;
        }
        $scope.passo++;
        $scope.referenciasRestantes.shift();
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
}]);