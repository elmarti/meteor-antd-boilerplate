import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.startup(() => {
    console.log('running data init');
    if(!Meteor.users.findOne()){
        console.log('No users found, creating admin');
        const userId = Accounts.createUser({
            email: 'admin@antdexample.com',
            password: 'password'
        });
        console.log('Admin user created, _id: %s', userId);
        Roles.addUsersToRoles(userId, 'admin', Roles.GLOBAL_GROUP);
    }

    Accounts.onCreateUser((options, user)=>{
       user.profile["createdDate"] = new Date();
       return user;
    });
});