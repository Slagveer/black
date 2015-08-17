/**
 * Created by Patric on 7-8-2015.
 */
'use strict';

(function() {
    angular
        .module('black.levels')
        .factory('LevelsService', LevelsService);

    LevelsService.$inject = ['$meteor'];

    function LevelsService($meteor) {
        return {
            getLevels: getLevels
        };

        function getLevels() {
            return $http.get('/api/maa')
                .then(getAvengersComplete)
                .catch(getAvengersFailed);

            function getAvengersComplete(response) {
                return response.data.results;
            }

            function getAvengersFailed(error) {
                console.error('XHR Failed for getAvengers.' + error.data);
            }
        }
    }
})();