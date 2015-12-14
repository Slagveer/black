/**
 * Created by Patric on 24-8-2015.
 */
if (Meteor.isServer) {
    Kennis = new Mongo.Collection("kennis");

    Meteor.publish('kennis', function publishKennis(){
        return Kennis.find({});
    });

    Meteor.startup(function() {

    });
}