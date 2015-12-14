if (Meteor.isClient) {
    angular
        .module('black.kennis')
        .constant({
            'KennisConstants': {
                'position': {

                },
                'startDelay': 4000,
                'hideScreenDuration': 200,
                'showScreenDuration': 200,
                'fistImage': 'fist.fw.png',
                'fistImageOver': 'fist.over.fw.png'
            }
        });
}