import { Check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Comment } from '../../lib/collections';
export default {
    /**
     * Comment on a profile
     * @method addComment
     * @param profileId
     * @param comment
     * @returns undefined
     */
    addComment(profileId, comment){
        console.log(profileId, comment)
        check(profileId, String);
        check(comment, String);
        if(!Meteor.user())
            throw new Meteor.Error(403, "Could not comment on profile");
        Comment.insert({
            receiver:profileId,
            comment,
            sender:Meteor.userId(),
            createdAt: new Date()
        })
    }

}