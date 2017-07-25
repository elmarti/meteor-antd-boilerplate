import { Meteor } from 'meteor/meteor';
import accounts from './accounts/methods';
Meteor.methods({
    'accounts/create':accounts.create,
    'accounts/sendResetEmail':accounts.sendResetEmail,
    'accounts/toggleVerification':accounts.toggleVerification,
    'accounts/deleteUser': accounts.deleteUser
});