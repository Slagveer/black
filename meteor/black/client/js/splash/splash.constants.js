if (Meteor.isClient) {
    angular
        .module('black.splash')
        .constant({
            'SplashConstants': {
                'position': {
                    'xPyramideStart': 0,
                    'yPyramideStart': -2000,
                    'yHeadStart': 2000,
                    'yHeadDiffEnd': 270,
                    'yBlakaStart': -2000,
                    'yBlakaDiffEnd': 0
                },
                'startDelay': 4000,
                'pyramideDuration': 4000,
                'pyramideImage': 'pyramide.fw.png',
                'headDuration': 3000,
                'headImage': 'head.fw.png',
                'blakaDuration': 2000,
                'blakaImage': 'b.l.a.k.a.fw.png'
            }
        });
}