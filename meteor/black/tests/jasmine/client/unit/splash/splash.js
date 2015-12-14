describe('Splash', function () {
    beforeEach(module('black'));

    describe('directive: splashScreen', function() {
        var element, scope, state;
        var splashScreen;

        beforeEach(module('black.splash'));

        beforeEach(inject(function ($rootScope, $compile, $state) {
            scope = $rootScope.$new();
            state = $state;

            element = '<game-screen><splash-screen></splash-screen></game-screen>';

            element = $compile(element)(scope);
            scope.$digest();
        }));

        describe('Init', function () {
            it("containers are initialized", function () {
                var isolated = element.find('splash-screen').isolateScope();
                expect(typeof isolated.vm.blaka).toBe('object');
                expect(typeof isolated.vm.fist).toBe('object');
                expect(typeof isolated.vm.startButton).toBe('object');
            });

            it('state is set', function() {
                expect(state.current.name).toEqual('game.splash');
                expect(state.current.url).toEqual('/splash');
            });
        });

        describe('State change', function () {
            beforeEach(function() {
                var isolated = element.find('splash-screen').isolateScope();
                splashScreen = isolated.vm;
                spyOn(splashScreen, 'init');
            });

            xit("tracks that the spy was called", function() {
                expect(splashScreen.init).toHaveBeenCalled();
            });

            it('containers are invisble', function() {
                var isolated = element.find('splash-screen').isolateScope();
                var blaka = isolated.vm.blaka;
                var fist = isolated.vm.fist;

                expect(blaka.scale.x).toEqual(splashScreen);
                expect(blaka.scale.y).toEqual(1);
                state.go('game.modes');
                scope.$digest();
                expect(blaka.scale.x).toEqual(0);
                expect(blaka.scale.y).toEqual(0);
            });
        });
    });
});