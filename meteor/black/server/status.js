/**
 * Created by Patric on 24-8-2015.
 */
if (Meteor.isServer) {
    Status = new Mongo.Collection("status");

    Meteor.publish('status', function publishStatus(){
        return Status.find({});
    });

    Meteor.startup(function() {

    });
}