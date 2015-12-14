if (Meteor.isClient) {
    angular
        .module('black.modes')
        .constant({
            'ModesConstants': {
                'position': {
                    'yKennisButtonStart': 2000,
                    'yKennisButtonDiffEnd': 200,
                    'yQuizButtonStart': 2000,
                    'yQuizButtonDiffEnd': -100
                },
                'startDelay': 4000,
                'hideScreenDuration': 200,
                'showScreenDuration': 200,
                'kennisButtonDuration': 1800,
                'kennisButtonImage': 'kennisbutton.fw.png',
                'kennisButtonOverImage': 'kennisbuttonover.fw.png',
                'alphaKennisButtonStart': 0,
                'alphaKennisButtonEnd': 0,
                'quizButtonDuration': 1800,
                'quizButtonImage': 'quizbutton.fw.png',
                'quizButtonOverImage': 'quizbuttonover.fw.png',
                'alphaQuizButtonStart': 0,
                'alphaQuizButtonEnd': 0,
            }
        });
}