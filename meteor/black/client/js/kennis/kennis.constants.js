if (Meteor.isClient) {
    angular
        .module('black.kennis')
        .constant({
            'KennisConstants': {
                'position': {

                },
                'startDelay': 4000
            }
        });
}