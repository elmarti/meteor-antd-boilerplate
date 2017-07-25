import { Accounts } from 'meteor/accounts-base';
import { Check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles'
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
    },
    /**
     * Send a password reset email
     * Ensure that SMTP is configured, else emails will be printed to the console
     * How do I configure SMTP? https://gist.github.com/LeCoupa/9879221
     * @method sendResetEmao
     * @param email
     * @returns undefined
     */
    sendResetEmail(email){
        check(email, String);
        const user = Meteor.users.findOne({
            "emails.0.address":email
        });
        //don't throw error if user not found to avoid username farming
        if(user)
            Accounts.sendResetPasswordEmail(user._id, email);
    },
    /**
     * As an admin, toggle a user's account verification
     * @method toggleVerification
     * @param _id
     * @returns undefined
     */
    toggleVerification(_id){
        check(_id,String);
        if(Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP)){
            const user = Meteor.users.findOne({
                _id
            });
            if(user){
                Meteor.users.update({
                    _id
                }, {
                    $set:{
                        "emails.0.verified":! user.emails[0].verified
                    }
                });
            }
        } else {
            throw new Meteor.Error(401, "You are not an admin");
        }

    },
    deleteUser(_id){
        check(_id, String);
        if(Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP)) {
            Meteor.users.remove({_id});
        }
    }
}