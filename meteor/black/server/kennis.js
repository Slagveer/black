/**
 * Created by Patric on 24-8-2015.
 */
if (Meteor.isServer) {
    Kennis = new Mongo.Collection("kennis");

    Meteor.publish('kennis', function publishKennis(){
        return Kennis.find({});
    });

    Meteor.startup(function () {
        if (Kennis.find().count() === 0) {
            var kennis = [
                {
                    'title': 'Malcom X',
                    'description': 'Zwarte vrijheidsstrijder in Amerika'
                },
                {
                    'title': 'All dubstep all the time',
                    'description': 'Get it on!'},
                {
                    'title': 'Savage lounging',
                    'description': 'Leisure suit required. And only fiercest manners.'}
            ];
            for (var i = 0; i < kennis.length; i++) {
                Kennis.insert(kennis[i]);
            }
        }
    });
}