import { Meteor } from 'meteor/meteor';
import { Check } from 'meteor/check';
import { Connection } from '../../lib/collections';

Meteor.publishComposite("ownProfile", function () {
    return {
        find(){
            return Meteor.users.find({
                _id: this.userId
            });
        },
        children: [{
            find(user){
                return Connection.find({
                    "users.0._id":user._id
                });
            }
        }]
    }

});
Meteor.publishComposite("profile", function (_id) {
    check(_id, String);
    return {
        find(){
            return Meteor.users.find({
                _id
            }, {
                fields: {
                    emails: 1,
                    profile: 1
                }
            });
        },
        children: [{
            find(user){
                return Connection.find({
                    "users.0._id":user._id
                });
            }
        }]
    };

});