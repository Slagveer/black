describe('Levels', function () {
    beforeEach(module('black'));

    describe('LevelsController', function () {
        var $controller = {}, levels = {}, $scope = {};

        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        beforeEach(function () {
            levels = {
                getCollection: function () {
                    return [];
                },
                insert: function () {

                }
            };
        });

        it('LevelsController', function () {
            var expected = [{_id: 1, text: 'my message'}];
            spyOn(levels, 'getCollection').and.returnValue(expected);
            $controller('LevelsController', {
                $scope: $scope,
                levels: levels
            });
            expect($scope.levels).toBe(expected);
        });
    });
});