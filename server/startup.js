// import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';
// import { Roles } from 'meteor/alanning:roles';
// import { Random } from 'meteor/random';
//
// Meteor.startup(() => {
//     console.log('running data init');
//     if(!Meteor.users.findOne()){
//         console.log('No users found, creating admin');
//         const userId = Accounts.createUser({
//             email: 'admin@antdexample.com',
//             password: 'password'
//         });
//         console.log('Admin user created, _id: %s', userId);
//         Roles.addUsersToRoles(userId, ['admin','user'], Roles.GLOBAL_GROUP);
//     }
//
//     Accounts.onCreateUser((options, user)=>{
//         user["profile"] = {
//             createdAt: new Date()
//         };
//        return user;
//     });
//
//     let i = 0;
//     while(i<100){
//         console.log('adding user');
//         const userId = Accounts.createUser({
//             email: Random.id() + '@' +  Random.id(),
//             password: 'password'
//         });
//         console.log('Random user created, _id: %s', userId, i );
//         Roles.addUsersToRoles(userId, 'user', Roles.GLOBAL_GROUP);
//         i++
//     }
//
// });