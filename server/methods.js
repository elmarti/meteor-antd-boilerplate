import { Meteor } from 'meteor/meteor';
import accounts from './accounts/methods';
import profile from './profile/methods';
//Accounts
Meteor.methods({
    'accounts/create':accounts.create,
    'accounts/sendResetEmail':accounts.sendResetEmail,
    'accounts/toggleVerification':accounts.toggleVerification,
    'accounts/deleteUser': accounts.deleteUser
});
//Profile
Meteor.methods({
    "profile/addComment":profile.addComment
});