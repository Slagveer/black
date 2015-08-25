/**
 * Created by Patric on 10-8-2015.
 */
(function(){
    angular
        .module('black.game')
        .directive('gameScreen', GameScreen);

    function GameScreen() {
        var directive = {
            link: link,
            templateUrl: 'client/js/game/game.screen.ng.html',
            restrict: 'EA',
            controller: GameScreenController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {

            }
        };
        return directive;

        function link(scope, element, attrs, gameScreenController) {
            element[0].appendChild(gameScreenController.renderer.view);
            this.gameController = scope.$parent.gameController;
        }
    }

    GameScreenController.$inject = ['$scope', '$window', '$state', 'GameConstants'];

    function GameScreenController($scope, $window, $state, GameConstants) {
        var vm = this;

        vm.addContainer = addContainer;
        vm.removeContainer = removeContainer;
        vm.stage = null;
        vm.renderer = null;
        vm.containers = [];

        init();

        function addContainer(container) {
            vm.containers.push(container);
            vm.stage.addChild(_.find(vm.containers, function(con){
                return con === container;
            }));
        }

        function removeContainer(container) {
            console.log(22222 + 4444);
        }

        function init() {
            $window.addEventListener('resize', resizeCanvas, false);

            WebFont.load({
                google: {
                    families: ['Open+Sans:400,800', 'Droid Serif']
                },
                active: function() {

                }
            });

            vm.renderer = PIXI.autoDetectRenderer($window.innerWidth, $window.innerHeight);
            vm.renderer.backgroundColor = GameConstants.css.backgroundColor;
            vm.stage = new PIXI.Container();

            requestAnimationFrame(animate);

            $state.go('game.splash');
        }

        function resizeCanvas() { console.log($state)
            vm.renderer.width = $window.innerWidth;
            vm.renderer.height = $window.innerHeight;
        }

        function animate() {
            TWEEN.update();
            vm.renderer.render(vm.stage);
            requestAnimationFrame(animate);
        }

    }
})();