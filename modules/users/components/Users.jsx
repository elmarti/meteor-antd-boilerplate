import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from '../../data';
import { Icon, notification } from 'antd';
export default class Users extends React.Component{
    constructor() {
        super();
        this.state = {
            search:""
        };
        this.columns = [{
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        }, {
            title: 'Created',
            dataIndex: 'created',
            key: 'created'
        }, {
            title: 'Roles',
            dataIndex: 'roles',
            key:'roles'
        },{
            title: 'Actions',
            key: 'actions',
            render: (data) => {
                console.log(data)
                return (
                    <span>
                        {data.verified ? <a onClick={this.toggleVerification.bind(this, data.key)}>Unverify</a> : <a onClick={this.toggleVerification.bind(this, data.key)}>Verify</a>}
                      <span className="ant-divider"/>
                      <a href="#">Delete</a>
                      <span className="ant-divider"/>
                      <a href="#" className="ant-dropdown-link">
                        More actions <Icon type="down"/>
                      </a>
                    </span>
                );
            }
        }];

    }
    toggleVerification(key){
        Meteor.call("accounts/toggleVerification", key, err => {
           if(err) return notification.error(err);
           else notification.success({message: "Account verified"});
        });
    }
    onSearchChange(search){
        console.log(search);
        this.setState({
            search
        });
    }
    mapTableData() {
        const search =this.state ? this.state.search : "";
        const users = Meteor.users.find({
            "emails.0.address":{$regex:search, $options:"i"}
        }).fetch();
        return users.map(user => {
            return {
                key: user._id,
                email: user.emails[0].address,
                roles: Roles.getRolesForUser(user._id).join(" ,"),
                verified: user.emails[0].verified
            }
        });
    }

    render() {
        return (<Table onSearchChange={this.onSearchChange.bind(this)} searchValue={this.state.search} subscription="users/list" columns={this.columns} mapTableData={this.mapTableData.bind(this)}/>);
    }
}
