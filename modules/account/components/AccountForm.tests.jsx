import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import { Component as AccountForm } from './AccountForm';

describe('AccountForm', () => {
    // In Todos app, component code can run on client and server, so force client only
    if (Meteor.isServer) return;

    it('it should render', () => {
        //setup: create test data
        const content = <div>

            test content
        </div>;

        //exercise: render the data into a component
        const item = shallow(<AccountForm content={content}/>);
        chai.assert.equal(
            item.find('.main_content').nodes[0].props.children,
            content
        );
    });
});