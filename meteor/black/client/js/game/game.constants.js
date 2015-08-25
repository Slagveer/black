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
                    backgroundColor: 0xFFFFFF,
                    title: {
                        height: 200,
                        'margin-left': 100,
                        'margin-right': 100,
                        'margin-top': 20,
                        'margin-bottom': 20
                    },
                    description: {
                        'margin-left': 100,
                        'margin-right': 100,
                        'margin-top': 20,
                        'margin-bottom': 20
                    }
                }
            }
        });
}