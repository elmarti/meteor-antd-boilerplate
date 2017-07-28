import { Meteor } from 'meteor/meteor';
import { Check } from 'meteor/check';
import { Connection, Comment, User } from '../../lib/collections';


Meteor.publishComposite("profile", function (_id) {
    if(!_id)
        _id = this.userId;
    check(_id, String);
    return {
        find(){
            return User.find({
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
            },
            children: [{
                find(connection, user){
                    return Comment.find({
                        receiver:_id
                    });
                },
                children:[{
                    find(comment, connection, user){
                        return User.find({
                           _id:comment.sender
                        });
                    }
                }]
            },{
                find(connection, user){
                    //fix this shit
                    let _id = [];
                    connection.users.forEach( thisUser =>  _id.push(thisUser._id) );
                    return User.find({
                        _id
                    });
                }
            }]
        }]
    };

});