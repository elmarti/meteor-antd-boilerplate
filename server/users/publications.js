import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { tablePublish } from '../helpers';
tablePublish('users/list', 'User', {}, {
    fields: {
        "profile.createdAt": 1,
        _id: 1,
        emails: 1,
        roles: 1
    }
}, 'admin');
