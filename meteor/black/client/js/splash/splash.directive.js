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

    SplashScreenController.$inject = ['$scope', '$window', '$timeout', 'SplashConstants'];

    function SplashScreenController($scope, $window, $timeout, SplashConstants) {
        var vm = this;
        var pyramideTween;
        var headTween;
        var blakaTween;
        var splashContainer;

        vm.init = init;
        vm.start = start;
        vm.gameScreenController = null
        vm.gameController = $scope.$parent.gameController;

        function init() {

        }

        function start() {
            var pyramide =  PIXI.Sprite.fromImage(SplashConstants.pyramideImage);
            var head =  PIXI.Sprite.fromImage(SplashConstants.headImage);
            var blaka =  PIXI.Sprite.fromImage(SplashConstants.blakaImage);

            pyramide.anchor.set(0.5);
            pyramide.position.x = 0.5 * vm.gameScreenController.renderer.width;
            pyramide.position.y = SplashConstants.position.yPyramideStart;
            pyramide.interactive = true;
            pyramide.mouseover = function pyramideMouseOver() {
                console.log(222);
            };
            pyramide.mouseout = function pyramideMouseOut() {
                console.log(111);
            };
            pyramideTween = new TWEEN.Tween(pyramide.scale)
                .to({x: 1.1, y: 1.1}, 500)
                .easing(TWEEN.Easing.Elastic.In)
                .onComplete(function() {
                    new TWEEN.Tween(pyramide.scale)
                        .to({x: 1.0, y: 1.0}, 500)
                        .easing(TWEEN.Easing.Elastic.Out)
                        .onComplete(function() {
                            pyramideTween.start();
                        })
                        .start();
                });
            head.anchor.set(0.5);
            head.position.x = 0.5 * vm.gameScreenController.renderer.width;
            head.position.y = SplashConstants.position.yHeadStart;
            headTween = new TWEEN.Tween(head.scale)
                .to({x: 1.1, y: 1.1}, 500)
                .easing(TWEEN.Easing.Elastic.In)
                .onComplete(function() {
                    new TWEEN.Tween(head.scale)
                        .to({x: 1.0, y: 1.0}, 500)
                        .easing(TWEEN.Easing.Elastic.Out)
                        .onComplete(function() {
                            headTween.start();
                        })
                        .start();
                });
            blaka.anchor.set(0.5);
            blaka.position.x = 0.5 * vm.gameScreenController.renderer.width;
            blaka.position.y = SplashConstants.position.yBlakaStart;
            blakaTween = new TWEEN.Tween(blaka.scale)
                .to({x: 1.1, y: 1.1}, 500)
                .easing(TWEEN.Easing.Elastic.In)
                .onComplete(function() {
                    new TWEEN.Tween(blaka.scale)
                        .to({x: 1.0, y: 1.0}, 500)
                        .easing(TWEEN.Easing.Elastic.Out)
                        .onComplete(function() {
                            blakaTween.start();
                        })
                        .start();
                });

            $timeout(function() {
                new TWEEN.Tween(pyramide)
                    .to({x: 0.5 * vm.gameScreenController.renderer.width, y: 0.5 * vm.gameScreenController.renderer.height}, SplashConstants.pyramideDuration)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .onComplete(function() {
                        pyramideTween.start();
                    })
                    .start();
            }, SplashConstants.startDelay);
            $timeout(function() {
                new TWEEN.Tween(head)
                    .to({
                        x: 0.5 * vm.gameScreenController.renderer.width,
                        y: 0.5 * vm.gameScreenController.renderer.height + SplashConstants.position.yHeadDiffEnd
                    }, SplashConstants.headDuration)
                    .easing(TWEEN.Easing.Elastic.Out)
                    .onComplete(function() {
                        headTween.start();
                    })
                    .start();
            }, SplashConstants.startDelay + SplashConstants.startDelay);
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
            }, SplashConstants.startDelay + 2 * SplashConstants.startDelay);

            splashContainer = new PIXI.Container();
            splashContainer.addChild(pyramide);
            splashContainer.addChild(head);
            splashContainer.addChild(blaka);

            vm.gameScreenController.addContainer(splashContainer);
        }
    }
})();