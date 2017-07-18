import {Accounts} from 'meteor/accounts-base';
import {Check} from 'meteor/check';
import {Roles} from 'meteor/alanning:roles'
export default {
    /**
     * Create a new user account
     * @method create
     * @param email
     * @param password
     * @returns {String} the generated user _id
     */
    create(values){
        check(values, Object);
        check(values.email, String);
        check(values.password, String);
        const _id = Accounts.createUser({
            email: values.email,
            password: values.password
        });
        Roles.addUsersToRoles(_id, 'user', Roles.GLOBAL_GROUP);
        return _id;
    }
}