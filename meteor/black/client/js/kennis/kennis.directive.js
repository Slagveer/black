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
        var em = new EventDDP('telegram');

        vm.init = init;
        vm.start = start;
        vm.gameScreenController = null
        vm.gameController = $scope.$parent.gameController;

        vm.init();

        function init() {
            $rootScope.$on('$stateChangeStart', stateChangeStart);
            em.addListener('telegram', function() {
                console.log('SERVER HI', _.toArray(arguments));
            });
        }

        function start() {
            var w = (vm.gameScreenController.renderer.width - GameConstants.css.title['margin-left'] - GameConstants.css.title['margin-right']);
            var h = GameConstants.css.title['height'];
            var x = GameConstants.css.title['margin-left'];
            var y = GameConstants.css.title['margin-top'];



            Meteor.subscribe('kennis', function subscribeReady() {
                var index = Math.ceil(Math.random() * Kennis.find().fetch().length);
                index = (index >= Kennis.find().fetch().length) ? Kennis.find().fetch().length - 1 : index;
                console.info('KENNIS DATA READY');
                kennis = new GAME.Kennis( w, h, x, y);
                kennis.setTitle(Kennis.find().fetch()[index].title);
                kennis.setDescription(Kennis.find().fetch()[index].title);

                navigation = new GAME.Navigation(KennisConstants.fistImage, KennisConstants.fistImageOver, vm.gameScreenController.renderer.width/2, vm.gameScreenController.renderer.height - 220);
                navigation.mousedown = mouseDown;

                kennisContainer = new PIXI.Container();
                kennisContainer.addChild(kennis);
                kennisContainer.addChild(navigation);
                hideScreen();

                vm.gameScreenController.addContainer(kennisContainer);
            });
        }

        function mouseDown() {
            $state.go('game.nextup');
            em.emit('hello');
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
            new TWEEN.Tween(kennisContainer)
                .to({
                    alpha: 0.0
                }, KennisConstants.hideScreenDuration)
                .onComplete(function () {
                    kennisContainer.visible = false;
                })
                .start();
        }

        function showScreen() {
            var title;
            var description;
            var index = Math.ceil(Math.random() * Kennis.find().fetch().length);
            index = (index >= Kennis.find().fetch().length) ? Kennis.find().fetch().length - 1 : index;
            title = Kennis.find().fetch()[index].title;
            description = Kennis.find().fetch()[index].description;
            kennis.setTitle(title);
            kennis.setDescription(description);
            screenVisible = true;
            kennisContainer.visible = true;
            new TWEEN.Tween(kennisContainer)
                .to({
                    alpha: 1.0
                }, KennisConstants.showScreenDuration)
                .onComplete(function () {
                    //
                })
                .start();
        }
    }
})();