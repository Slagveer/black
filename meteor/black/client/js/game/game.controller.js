/**
 * Created by Patric on 7-8-2015.
 */
'use strict';

(function(){
    angular
        .module('black.game')
        .controller('GameController', GameController);

    GameController.$inject = ['$scope', '$window'];

    function GameController($scope, $window) {
        var vm = this;

        vm.goIt =  function() {
            console.log(222)
        }
    }
})();
