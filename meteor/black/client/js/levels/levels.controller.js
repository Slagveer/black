/**
 * Created by Patric on 7-8-2015.
 */
'use strict';

(function(){
    angular
        .module('black.levels')
        .controller('LevelsController', LevelsController);

    LevelsController.$inject = ['$scope', 'LevelsService'];

    function LevelsController($scope, LevelsService) {
        var vm = this;
        vm.levels = ['Hello World!'];
    }
})();
