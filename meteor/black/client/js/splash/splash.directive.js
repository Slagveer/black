/**
 * Created by Patric on 10-8-2015.
 */
(function(){
    angular
        .module('black.splash')
        .directive('splashScreen', SplashScreen);

    function SplashScreen() {
        var directive = {
            link: link,
            restrict: 'EA',
            require: "^gameScreen",
            controller: SplashScreenController,
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

    SplashScreenController.$inject = ['$rootScope', '$scope', '$window', '$timeout', '$state', 'SplashConstants'];

    function SplashScreenController($rootScope, $scope, $window, $timeout, $state, SplashConstants) {
        var vm = this;
        var fistTween;
        var blakaTween;
        var startButtonTween;
        var splashContainer;
        var startMouseOver = false;
        var fist;
        var blaka;
        var startButton;
        var startButtonTexture;
        var startButtonOverTexture;
        var screenVisible = false;

        vm.init = init;
        vm.start = start;
        vm.gameScreenController = null;
        vm.gameController = $scope.$parent.gameController;
        vm.fist = null;
        vm.blaka = null;
        vm.startButton = null;

        vm.init();

        function init() {
            $rootScope.$on('$stateChangeStart', stateChangeStart);
        }

        function start() {
            vm.fist = fist =  PIXI.Sprite.fromImage(SplashConstants.fistImage);
            vm.blaka = blaka =  PIXI.Sprite.fromImage(SplashConstants.blakaImage);
            vm.startButton = startButton =  PIXI.Sprite.fromImage(SplashConstants.startButtonImage);
            startButtonTexture =  PIXI.Texture.fromImage(SplashConstants.startButtonImage);
            startButtonOverTexture =  PIXI.Texture.fromImage(SplashConstants.startButtonOverImage);

            fist.anchor.set(0.5);
            fist.position.x = 0.5 * vm.gameScreenController.renderer.width;
            fist.position.y = 0.5 * vm.gameScreenController.renderer.height;
            fist.scale.x = 0;
            fist.scale.y = 0;
            fist.interactive = true;
            fist.mouseover = function fistMouseOver() {
                console.log(222);
            };
            fist.mouseout = function fistMouseOut() {
                console.log(111);
            };
            fistTween = new TWEEN.Tween(fist.scale)
                .to({
                    x: 1.1,
                    y: 1.1
                }, 500)
                .easing(TWEEN.Easing.Elastic.In)
                .onComplete(function() {
                    new TWEEN.Tween(fist.scale)
                        .to({
                            x: 1.0,
                            y: 1.0
                        }, 500)
                        .easing(TWEEN.Easing.Elastic.Out)
                        .onComplete(function() {
                            if(screenVisible) {
                                fistTween.start();
                            }
                        })
                        .start();
                });
            blaka.anchor.set(0.5);
            blaka.position.x = 0.5 * vm.gameScreenController.renderer.width;
            blaka.position.y = 0.5 * vm.gameScreenController.renderer.height;
            blaka.scale.x = 0;
            blaka.scale.y = 0;
            blakaTween = new TWEEN.Tween(blaka.scale)
                .to({
                    x: 1.1,
                    y: 1.1
                }, 500)
                .easing(TWEEN.Easing.Elastic.In)
                .onComplete(function() {
                    new TWEEN.Tween(blaka.scale)
                        .to({
                            x: 1.0,
                            y: 1.0
                        }, 500)
                        .easing(TWEEN.Easing.Elastic.Out)
                        .onComplete(function () {
                            if(screenVisible) {
                                blakaTween.start();
                            }
                        })
                        .start();
                });
            startButton.anchor.set(0.5);
            startButton.buttonMode = true;
            startButton.texture = startButtonTexture;
            startButton.interactive = true;
            startButton.position.x = 0.5 * vm.gameScreenController.renderer.width;
            startButton.position.y = SplashConstants.position.yStartButtonStart;
            startButton.mouseover = startButtonMouseOver;
            startButton.mouseout = startButtonMouseOut;
            startButton.mousedown = startButtonMouseDown;
            startButton.mouseup = startButtonMouseUp;
            startButtonTween = new TWEEN.Tween(startButton.scale)
                .to({
                    x: 1.1,
                    y: 1.1
                }, 500)
                .easing(TWEEN.Easing.Elastic.In)
                .onComplete(function() {
                    if(startMouseOver === false) {
                        new TWEEN.Tween(startButton.scale)
                            .to({
                                x: 1.0,
                                y: 1.0
                            }, 500)
                            .easing(TWEEN.Easing.Elastic.Out)
                            .onComplete(function () {
                                if(screenVisible) {
                                    startButtonTween.start();
                                }
                            })
                            .start();
                    }
                });

            splashContainer = new PIXI.Container();
            splashContainer.addChild(fist);
            splashContainer.addChild(blaka);
            splashContainer.addChild(startButton);
            showScreen();

            vm.gameScreenController.addContainer(splashContainer);
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
            if(toState.name !== 'game.splash') {
                hideScreen();
            } else {
                showScreen();
            }
        }

        function hideScreen() {
            screenVisible = false;
            fistTween.stop();
            blakaTween.stop();
            startButtonTween.stop();
                new TWEEN.Tween(fist.scale)
                    .to({
                        x: 0,
                        y: 0
                    }, SplashConstants.fistDuration)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .onComplete(function() {
                        //;
                    })
                    .start();
                new TWEEN.Tween(blaka.scale)
                    .to({
                        x: 0,
                        y: 0
                    }, SplashConstants.blakaDuration)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .onComplete(function() {
                        //;
                    })
                    .start();
                new TWEEN.Tween(startButton)
                    .to({
                        x: 0.5 * vm.gameScreenController.renderer.width,
                        y: SplashConstants.position.yStartButtonStart
                    }, SplashConstants.startDuration)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .onComplete(function() {
                        //;
                    })
                    .start();
        }

        function showScreen() {
            screenVisible = true;
            $timeout(function() {
                new TWEEN.Tween(fist.scale)
                    .to({
                        x: 1,
                        y: 1
                    }, SplashConstants.fistDuration)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .onComplete(function() {
                        fistTween.start();
                    })
                    .start();
            }, SplashConstants.startDelay);
            $timeout(function() {
                new TWEEN.Tween(blaka)
                    .to({
                        x: 0.5 * vm.gameScreenController.renderer.width,
                        y: 0.5 * vm.gameScreenController.renderer.height + SplashConstants.position.yBlakaDiffEnd
                    }, SplashConstants.blakaDuration)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .onComplete(function() {
                        blakaTween.start();
                    })
                    .start();
            }, SplashConstants.startDelay + 0.25 * SplashConstants.startDelay);
            $timeout(function() {
                new TWEEN.Tween(startButton)
                    .to({
                        x: 0.5 * vm.gameScreenController.renderer.width,
                        y: 0.5 * vm.gameScreenController.renderer.height + SplashConstants.position.yStartButtonDiffEnd
                    }, SplashConstants.startButtonDuration)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .onComplete(function() {
                        startButtonTween.start();
                    })
                    .start();
            }, SplashConstants.startDelay + 0.5 * SplashConstants.startDelay);
        }
    }
})();