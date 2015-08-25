/**
 * Created by Patric on 7-8-2015.
 */
if (Meteor.isClient) {
    Kennis = new Mongo.Collection("kennis");
    Quiz = new Mongo.Collection("quiz");

    Meteor.startup(function () {
        angular
            .module('black').config( config );

        config.$inject = ['$urlRouterProvider', '$stateProvider', '$interpolateProvider'];

        function config ( $urlRouterProvider, $stateProvider, $interpolateProvider) {

            $urlRouterProvider
                .otherwise("/game");

            $stateProvider
                .state('game', {
                    url: '/game',
                    views: {
                        'gameView@' : {
                            templateUrl: 'client/js/game/game.ng.html',
                            controller: 'GameController',
                            controllerAs: 'gameController'
                        }
                    }
                })
                .state('game.splash', {
                    url: '/splash'
                })
                .state('game.modes', {
                    url: '/modes'
                })
                .state('game.kennis', {
                    url: '/kennis',
                    resolve: {
                        'subscribe': [
                            '$meteor', function($meteor) {
                                return $meteor.subscribe('kennis');
                            }
                        ]
                    }
                }).state('game.quiz', {
                    url: '/quiz'
                });

            $interpolateProvider.startSymbol('[[').endSymbol(']]');
        }

        function onReady() {
            angular.bootstrap(document, ['black']);
        }

        angular.element(document).ready(onReady);
    });
}