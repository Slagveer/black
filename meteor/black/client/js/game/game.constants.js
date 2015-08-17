if (Meteor.isClient) {
    angular
        .module('black.splash')
        .constant({
            'GameConstants': {
                'position': {
                    'xHeadStart': 0,
                    'yHeadStart': 0

                },
                'css': {
                    backgroundColor: 0xFFFFFF
                }
            }
        });
}