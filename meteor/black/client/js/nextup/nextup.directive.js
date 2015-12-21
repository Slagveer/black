/**
 * Created by Patric on 10-8-2015.
 */
(function(){
    angular
        .module('black.nextup')
        .directive('nextupScreen', NextupScreen);

    function NextupScreen() {
        var directive = {
            link: link,
            restrict: 'EA',
            require: "^gameScreen",
            controller: NextupScreenController,
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

    NextupScreenController.$inject = ['$rootScope', '$scope', '$window', '$timeout', '$state', 'NextupConstants'];

    function NextupScreenController($rootScope, $scope, $window, $timeout, $state, NextupConstants) {
        var vm = this;
        var bgTween;
        var bgTween2;
        var boksTween;
        var nextupContainer;
        var startMouseOver = false;
        var bg;
        var bg2;
        var screenVisible = false;
        var postition;

        vm.init = init;
        vm.start = start;
        vm.gameScreenController = null;
        vm.gameController = $scope.$parent.gameController;
        vm.blaka = null;
        vm.startButton = null;

        vm.init();

        function init() {
            $rootScope.$on('$stateChangeStart', stateChangeStart);
        }

        function start() {
            vm.boks = boks =  PIXI.Sprite.fromImage(NextupConstants.boksImage);

            boks.anchor.set(0.5);
            boks.position.x = 0.5 * vm.gameScreenController.renderer.width;
            boks.position.y = 0.5 * vm.gameScreenController.renderer.height;
            boks.scale.x = 2;
            boks.scale.y = 2;
            boksTween = new TWEEN.Tween(boks)
                .to({
                    x: vm.gameScreenController.renderer.width / 2 + Math.random() * 100,
                    y: vm.gameScreenController.renderer.height / 2 + Math.random() * 100
                }, 100)
                .easing(TWEEN.Easing.Elastic.Out)
                .onComplete(function() {
                    new TWEEN.Tween(boks)
                        .to({
                            x: vm.gameScreenController.renderer.width / 2 + Math.random() * 100,
                            y: vm.gameScreenController.renderer.height / 2 + Math.random() * 100
                        }, 100)
                        .easing(TWEEN.Easing.Elastic.Out)
                        .onComplete(function() {
                            boksTween.start();
                        })
                        .start();
                })
                .start();

            nextupContainer = new PIXI.Container();
            nextupContainer.alpha = 0;
            vm.scroller = new GAME.Scroller(nextupContainer,NextupConstants.bgImage, vm.gameScreenController.renderer.width, vm.gameScreenController.renderer.height);
            nextupContainer.addChild(boks);
            hideScreen();

            requestAnimationFrame(animate);

            vm.gameScreenController.addContainer(nextupContainer);
        }

        function animate() {
            vm.scroller.moveViewportXBy(NextupConstants.scrollSpeed);
            requestAnimationFrame(animate);
        }

        function startButtonMouseOver() {
            startMouseOver = true;
            this.texture = startButtonOverTexture;
            startButtonTween.start();
        }

        function startButtonMouseOut() {
            startMouseOver = false;
            this.texture = startButtonTexture;
            startButtonTween.start();
        }

        function startButtonMouseDown() {
            startMouseOver = true;
            this.texture = startButtonTexture;
            $state.go('game.modes');
        }

        function startButtonMouseUp() {
            startMouseOver = true;
            this.texture = startButtonOverTexture;
        }

        function stateChangeStart(event, toState, toParams, fromState, fromParams){
            event.preventDefault();
            if(toState.name !== 'game.nextup') {
                hideScreen();
            } else {
                showScreen();
            }
        }

        function hideScreen() {
            screenVisible = false;
            new TWEEN.Tween(nextupContainer)
                .to({
                    alpha: 0
                }, NextupConstants.hideScreenDuration)
                .onComplete(function() {
                    //;
                })
                .start();
        }

        function showScreen() {
            screenVisible = true;
            new TWEEN.Tween(nextupContainer)
                .to({
                    alpha: 1
                }, NextupConstants.showScreenDuration)
                .onComplete(function() {
                    //
                })
                .start();
            $timeout(function(){
                $state.go('game.kennis');
            },NextupConstants.nextupDuration);
        }
    }
})();