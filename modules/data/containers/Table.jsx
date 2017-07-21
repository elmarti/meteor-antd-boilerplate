import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Counts } from 'meteor/tmeasday:publish-counts';
import DataTable from '../components/Table';

export default createContainer((props) => {
    const subReady = Meteor.subscribe(props.subscription, currentPage.get(), props.searchValue).ready();
    const count = Counts.get(props.subscription + ".count");
    return {
        subReady,
        count
    };
}, DataTable);