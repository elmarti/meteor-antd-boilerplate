import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
Meteor.publish("users/list", function(){
    if(Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP))
        return Meteor.users.find();
    else this.ready();
});