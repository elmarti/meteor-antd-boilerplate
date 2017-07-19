import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
Meteor.publish("users/list", function(){
    if (Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP))
        return Meteor.users.find({},{
        fields:{
            createdAt:1,
            _id:1,
            emails:1,
            roles:1
        }
        });
    else this.ready();
});