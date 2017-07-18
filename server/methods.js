import { Meteor } from 'meteor/meteor';
import accounts from './accounts/methods';
Meteor.methods({
    "accounts/create":accounts.create
});