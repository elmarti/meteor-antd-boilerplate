import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from '../../data';
import { Icon, Spin, Popconfirm, notification } from 'antd';
export default class Users extends React.Component{
    constructor() {
        super();
        this.state = {
            search:"",
            submitClicked:""
        };

        this.columns = [{
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        }, {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt'
        }, {
            title: 'Roles',
            dataIndex: 'roles',
            key:'roles'
        },{
            title: 'Actions',
            key: 'actions',
            render: (data) => {
                return (
                    <Spin spinning={data.key === this.state.submitClicked}>
                        {data.verified ?
                            <Popconfirm onConfirm={this.toggleVerification.bind(this, data.key)} title="Are you sure you want to unverify this user?" okText="Yes" cancelText="No"><a >Unverify</a></Popconfirm> :
                            <Popconfirm onConfirm={this.toggleVerification.bind(this, data.key)} title="Are you sure you want to verify this user?" okText="Yes" cancelText="No"><a >Verify</a></Popconfirm>
                        }
                      <span className="ant-divider"/>
                        <Popconfirm onConfirm={this.deleteUser.bind(this, data.key)} title="Are you sure you want to delete this user?" okText="Yes" cancelText="No"> <a href="#">Delete</a></Popconfirm>
                    </Spin>
                );
            }
        }];

    }
    deleteUser(key){
        this.setState({
            submitClicked: key
        });
        Meteor.call("accounts/deleteUser", key, err => {
            this.setState({
                submitClicked: ""
            });
            if(err) return notification.error(err);
            else notification.success({message: "Account deleted"});
        });
    }
    toggleVerification(key){
        this.setState({
            submitClicked: key
        });
        Meteor.call("accounts/toggleVerification", key, err => {
            this.setState({
                submitClicked: ""
            });
           if(err) return notification.error(err);
           else notification.success({message: "Account verified"});
        });
    }
    onSearchChange(search){
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
                verified: user.emails[0].verified,
                createdAt: user.profile ? user.profile.createdAt.toDateString() : ""
            }
        });
    }

    render() {
        return (<Table onSearchChange={this.onSearchChange.bind(this)} searchValue={this.state.search} subscription="users/list" columns={this.columns} mapTableData={this.mapTableData.bind(this)}/>);
    }
}
