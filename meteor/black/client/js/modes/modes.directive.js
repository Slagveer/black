/**
 * Created by Patric on 10-8-2015.
 */
(function(){
    angular
        .module('black.modes')
        .directive('modesScreen', ModesScreen);

    function ModesScreen() {
        var directive = {
            link: link,
            restrict: 'EA',
            require: "^gameScreen",
            controller: ModesScreenController,
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

    ModesScreenController.$inject = ['$rootScope', '$scope', '$window', '$timeout', '$state', 'ModesConstants'];

    function ModesScreenController($rootScope, $scope, $window, $timeout, $state, ModesConstants) {
        var vm = this;
        var kennisButtonTween;
        var quizButtonTween;
        var modesContainer;
        var startMouseOver = false;
        var kennisButton;
        var kennisButtonTexture;
        var kennisButtonOverTexture;
        var quizButton;
        var quizButtonTexture;
        var quizButtonOverTexture;
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
            kennisButton =  PIXI.Sprite.fromImage(ModesConstants.kennisButtonImage);
            kennisButtonTexture =  PIXI.Texture.fromImage(ModesConstants.kennisButtonImage);
            kennisButtonOverTexture =  PIXI.Texture.fromImage(ModesConstants.kennisButtonOverImage);
            quizButton =  PIXI.Sprite.fromImage(ModesConstants.quizButtonImage);
            quizButtonTexture =  PIXI.Texture.fromImage(ModesConstants.quizButtonImage);
            quizButtonOverTexture =  PIXI.Texture.fromImage(ModesConstants.quizButtonOverImage);

            kennisButton.anchor.set(0.5);
            kennisButton.buttonMode = true;
            kennisButton.texture = kennisButtonTexture;
            kennisButton.interactive = true;
            kennisButton.position.x = 0.5 * vm.gameScreenController.renderer.width;
            kennisButton.position.y = ModesConstants.position.yKennisButtonStart;
            kennisButton.mouseover = kennisButtonMouseOver;
            kennisButton.mouseout = kennisButtonMouseOut;
            kennisButton.mousedown = kennisButtonMouseDown;
            kennisButton.mouseup = kennisButtonMouseUp;
            kennisButtonTween = new TWEEN.Tween(kennisButton.scale)
                .to({
                    x: 1.1,
                    y: 1.1
                }, 500)
                .easing(TWEEN.Easing.Elastic.In)
                .onComplete(function() {
                    if(startMouseOver === false) {
                        new TWEEN.Tween(kennisButton.scale)
                            .to({
                                x: 1.0,
                                y: 1.0
                            }, 500)
                            .easing(TWEEN.Easing.Elastic.Out)
                            .onComplete(function () {
                                if(screenVisible) {
                                    kennisButtonTween.start();
                                }
                            })
                            .start();
                    }
                });

            quizButton.anchor.set(0.5);
            quizButton.buttonMode = true;
            quizButton.texture = quizButtonTexture;
            quizButton.interactive = true;
            quizButton.position.x = 0.5 * vm.gameScreenController.renderer.width;
            quizButton.position.y = ModesConstants.position.yKennisButtonStart;
            quizButton.mouseover = quizButtonMouseOver;
            quizButton.mouseout = quizButtonMouseOut;
            quizButton.mousedown = quizButtonMouseDown;
            quizButton.mouseup = quizButtonMouseUp;
            quizButtonTween = new TWEEN.Tween(quizButton.scale)
                .to({
                    x: 1.1,
                    y: 1.1
                }, 500)
                .easing(TWEEN.Easing.Elastic.In)
                .onComplete(function() {
                    if(startMouseOver === false) {
                        new TWEEN.Tween(quizButton.scale)
                            .to({
                                x: 1.0,
                                y: 1.0
                            }, 500)
                            .easing(TWEEN.Easing.Elastic.Out)
                            .onComplete(function () {
                                if(screenVisible) {
                                    quizButtonTween.start();
                                }
                            })
                            .start();
                    }
                });

            modesContainer = new PIXI.Container();
            modesContainer.addChild(kennisButton);
            modesContainer.addChild(quizButton);
            modesContainer.visible = false;

            vm.gameScreenController.addContainer(modesContainer);
        }

        function kennisButtonMouseOver() {
            startMouseOver = true;
            this.texture = kennisButtonOverTexture;
            kennisButtonTween.start();
        }

        function kennisButtonMouseOut() {
            startMouseOver = false;
            this.texture = kennisButtonTexture;
            kennisButtonTween.start();
        }

        function kennisButtonMouseDown() {
            startMouseOver = true;
            this.texture = kennisButtonTexture;
            $state.go('game.kennis');
        }

        function kennisButtonMouseUp() {
            startMouseOver = true;
            this.texture = kennisButtonOverTexture;
        }

        function quizButtonMouseOver() {
            startMouseOver = true;
            this.texture = quizButtonOverTexture;
            quizButtonTween.start();
        }

        function quizButtonMouseOut() {
            startMouseOver = false;
            this.texture = quizButtonTexture;
            quizButtonTween.start();
        }

        function quizButtonMouseDown() {
            startMouseOver = true;
            this.texture = quizButtonTexture;
            $state.go('game.quiz');
        }

        function quizButtonMouseUp() {
            startMouseOver = true;
            this.texture = quizButtonOverTexture;
        }

        function stateChangeStart(event, toState, toParams, fromState, fromParams){
            event.preventDefault();
            if(toState.name !== 'game.modes') {
                hideScreen();
            } else {
                showScreen();
            }
        }

        function hideScreen() {
            screenVisible = false;
            kennisButtonTween.stop();
            quizButtonTween.stop();

            new TWEEN.Tween(kennisButton)
                .to({
                    x: 0.5 * vm.gameScreenController.renderer.width,
                    y: ModesConstants.position.yKennisButtonStart
                }, ModesConstants.startDuration)
                .easing(TWEEN.Easing.Elastic.Out)
                .onComplete(function() {
                    modesContainer.visible = false;
                })
                .start();

            new TWEEN.Tween(quizButton)
                .to({
                    x: 0.5 * vm.gameScreenController.renderer.width,
                    y: ModesConstants.position.yQuizButtonStart
                }, ModesConstants.startDuration)
                .easing(TWEEN.Easing.Elastic.Out)
                .onComplete(function() {
                    //;
                })
                .start();
        }

        function showScreen() {
            modesContainer.visible = true;
            screenVisible = true;
                new TWEEN.Tween(kennisButton)
                    .to({
                        x: 0.5 * vm.gameScreenController.renderer.width,
                        y: 0.5 * vm.gameScreenController.renderer.height + ModesConstants.position.yKennisButtonDiffEnd
                    }, ModesConstants.kennisButtonDuration)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .onComplete(function() {
                        kennisButtonTween.start();
                    })
                    .start();
                new TWEEN.Tween(quizButton)
                    .to({
                        x: 0.5 * vm.gameScreenController.renderer.width,
                        y: 0.5 * vm.gameScreenController.renderer.height + ModesConstants.position.yQuizButtonDiffEnd
                    }, ModesConstants.quizButtonDuration)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .onComplete(function() {
                        quizButtonTween.start();
                    })
                    .start();
        }
    }
})();