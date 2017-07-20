import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { ReactiveVar } from 'meteor/reactive-var';
import { Table, Spin } from 'antd';
let currentPage  = new ReactiveVar(1);
class DataTable extends React.Component{
    constructor(){
        super();
        currentPage.set(1);
    }
    changePage({ total, current, pageSize}){
        currentPage.set(current);
    }
    render(){
        const pagination = {
          total:this.props.count,
            current:currentPage.get()
        };
        const tableData = this.props.mapTableData();
        return (

            <Table loading={!this.props.subReady} onChange={this.changePage.bind(this)} pagination={pagination} columns={this.props.columns} dataSource={tableData}/>
    );
    }
}
DataTable.PropTypes = {
    columns: Array,
    subscription: String,
    mapTableData:Function
};
export default createContainer((props) => {
    const subReady = Meteor.subscribe(props.subscription, currentPage.get()).ready();
    const count = Counts.get(props.subscription + ".count");
    return {
        subReady,
        count
    };
}, DataTable);