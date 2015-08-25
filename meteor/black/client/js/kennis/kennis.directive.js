/**
 * Created by Patric on 20-8-2015.
 */
'use strict';

(function(){
    angular
        .module('black.kennis')
        .directive('kennisScreen', KennisScreen);

    function KennisScreen() {
        var directive = {
            link: link,
            restrict: 'EA',
            require: "^gameScreen",
            controller: KennisScreenController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {

            }
        };
        return directive;

        function link(scope, element, attrs, gameScreenCtrl) {
            scope.vm.gameScreenController = gameScreenCtrl;
            scope.vm.start();
        }
    }

    KennisScreenController.$inject = ['$rootScope', '$scope', '$window', '$timeout', '$state', 'KennisConstants', 'GameConstants'];

    function KennisScreenController($rootScope, $scope, $window, $timeout, $state, KennisConstants, GameConstants) {
        var vm = this;
        var kennis;
        var navigation;
        var kennisContainer;
        var screenVisible = false;

        vm.init = init;
        vm.start = start;
        vm.gameScreenController = null
        vm.gameController = $scope.$parent.gameController;

        vm.init();

        function init() {
            $rootScope.$on('$stateChangeStart', stateChangeStart);
        }

        function start() {
            var w = (vm.gameScreenController.renderer.width - GameConstants.css.title['margin-left'] - GameConstants.css.title['margin-right']);
            var h = GameConstants.css.title['height'];
            var x = GameConstants.css.title['margin-left'];
            var y = GameConstants.css.title['margin-top'];

            Meteor.subscribe('kennis', function subscribeReady() {
                var index = Math.ceil(Math.random() * Kennis.find().fetch().length);
                index = (index >= Kennis.find().fetch().length) ? Kennis.find().fetch().length - 1 : index; console.log(index)
                console.info('KENNIS DATA READY');
                kennis = new GAME.Kennis( w, h, x, y);
                kennis.setTitle(Kennis.find().fetch()[index].title);
                kennis.setDescription(Kennis.find().fetch()[index].title);

                kennisContainer = new PIXI.Container();
                kennisContainer.addChild(kennis);

                vm.gameScreenController.addContainer(kennisContainer);
            });
        }

        function kennisButtonMouseOver() {
            this.texture = kennisButtonOverTexture;
            kennisButtonTween.start();
        }

        function kennisButtonMouseOut() {
            this.texture = kennisButtonTexture;
            kennisButtonTween.start();
        }

        function kennisButtonMouseDown() {
            this.texture = kennisButtonTexture;
            $state.go('game.kennis');
        }

        function kennisButtonMouseUp() {
            this.texture = kennisButtonOverTexture;
        }

        function stateChangeStart(event, toState, toParams, fromState, fromParams){
            event.preventDefault();
            if(toState.name !== 'game.kennis') {
                hideScreen();
            } else {
                showScreen();
            }
        }

        function hideScreen() {
            screenVisible = false;

        }

        function showScreen() {
            screenVisible = true;

        }
    }
})();