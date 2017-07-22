import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { ReactiveVar } from 'meteor/reactive-var';
import { Table, Spin, Row, Input } from 'antd';
let currentPage  = new ReactiveVar(1);
class DataTable extends React.Component{
    constructor(){
        super();
        currentPage.set(1);
    }
    changePage({ total, current, pageSize}){
        currentPage.set(current);
    }
    searchUsers(e){
        e.persist();
        e.preventDefault();
        currentPage.set(1);
        this.props.onSearchChange(e.target.value);
    }
    render(){
        const pagination = {
          total:this.props.count,
            current:currentPage.get()
        };
        const tableData = this.props.mapTableData();
        return (
            <Row>
                <Row>
                    <Input onPressEnter={this.searchUsers.bind(this)}/>
                </Row>
                <Row>
                    <Table loading={!this.props.subReady} onChange={this.changePage.bind(this)} pagination={pagination} columns={this.props.columns} dataSource={tableData}/>
                </Row>
            </Row>
    );
    }
}
DataTable.PropTypes = {
    columns: Array,
    subscription: String,
    mapTableData:Function,
    onSearchChange:Function
};
export default createContainer((props) => {
    const subReady = Meteor.subscribe(props.subscription, currentPage.get(), props.searchValue).ready();
    const count = Counts.get(props.subscription + ".count");
    return {
        subReady,
        count
    };
}, DataTable);