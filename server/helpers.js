import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Roles } from 'meteor/alanning:roles';
import Collections from '../lib/collections';
const tablePublish = (name, collection, query, projection, role) => {

    Meteor.publish(name, function (start, search) {
        if (!role || Roles.userIsInRole(this.userId, role, Roles.GLOBAL_GROUP)) {
            projection.skip = start * 10;
            projection.limit = projection.skip + 10;
            query["emails.0.address"] = {$regex:search, $options:"i"};
            return Collections[collection].find(query, projection);
        }
        else return this.ready();
    });
    Meteor.publish(name + ".counts", function () {
        if (!role || Roles.userIsInRole(this.userId, role, Roles.GLOBAL_GROUP))
            return Counts.publish(this, collection + ".count", Collections[collection].find(query));
        else return this.ready();
    });
};
export {
    tablePublish
};