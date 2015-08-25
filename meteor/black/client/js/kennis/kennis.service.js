/**
 * Created by Patric on 24-8-2015.
 */
'use strict';

(function() {
    angular
        .module('black.kennis')
        .factory('KennisService', ['$collection', '$q', '$rootScope', function($collection, $q, $rootScope){
            var numberObservers = 0;
            var observerHandle;

            return {
                startObserving: function () {
                    numberObservers++;
                    console.log("Increasing observer count to:" + numberObservers);
                    if (numberObservers > 1) {
                        return;  // Already observing
                    }

                    observerHandle = Kennis.find()
                        .observe({
                            added: function (data) {
                                console.log('Object added:'+data);
                                $rootScope.$broadcast( "addedToKennis", data );
                            },
                            changed: function (newData, oldData) {
                                console.log('Data changed:'+data);
                                $rootScope.$broadcast( "changeToKennis", newData, oldData );
                            },
                            removed: function (oldData) {
                                console.log('Data removed:'+oldData);
                                $rootScope.$broadcast( "removedFromKennis", oldData );
                            },
                            movedTo: function (data, fromIndex, toIndex, before) {
                                console.log('Data moved:'+data);
                                // Do something here!
                            }
                        });
                },

                stopObserving: function () {
                    if (numberObservers === 0) {
                        // No action if there are no observers left anyway
                        return;
                    }

                    numberObservers--;
                    console.log("Decreasing observer count to:" + numberObservers);
                    if (numberObservers === 0) {
                        // if number of interested observers fell to zero, stop live query
                        observerHandle.stop();
                    }
                },
            };
        }]);
})();