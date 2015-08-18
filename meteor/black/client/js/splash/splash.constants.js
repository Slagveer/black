if (Meteor.isClient) {
    angular
        .module('black.splash')
        .constant({
            'SplashConstants': {
                'position': {
                    'xFistStart': 0,
                    'yFistStart': -2000,
                    'alphaFistStart': 0,
                    'alphaFistEnd': 1,
                    'yHeadStart': 2000,
                    'yHeadDiffEnd': 270,
                    'yBlakaStart': -2000,
                    'yBlakaDiffEnd': -50,
                    'yStartButtonStart': 2000,
                    'yStartButtonDiffEnd': 300
                },
                'startDelay': 4000,
                'fistDuration': 1000,
                'fistImage': 'fist.fw.png',
                'blakaDuration': 1200,
                'blakaImage': 'b.l.a.k.a.fw.png',
                'alphaBlakaStart': 0,
                'alphaBlakaEnd': 1,
                'startButtonDuration': 1800,
                'startButtonImage': 'startbutton.fw.png',
                'startButtonOverImage': 'startbuttonover.fw.png',
                'alphaStartButtonStart': 0,
                'alphaStartButtonEnd': 0
            }
        });
}