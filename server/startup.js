// import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';
// import { Roles } from 'meteor/alanning:roles';
// import { Random } from 'meteor/random';
//
Meteor.startup(() => {
    Accounts.onCreateUser((options, user)=>{
        user["profile"] = {
            createdAt: new Date()
        };
        return user;
    });
    console.log('running data init');
    if(!Meteor.users.findOne()){
        console.log('No users found, creating admin');
        const userId = Accounts.createUser({
            email: 'admin@antdexample.com',
            password: 'password'
        });
        console.log('Admin user created, _id: %s', userId);
        Roles.addUsersToRoles(userId, ['admin','user'], Roles.GLOBAL_GROUP);
    }
    Accounts.urls.resetPassword = function(token) {
        return Meteor.absoluteUrl("reset-password/" + token);
    };
});