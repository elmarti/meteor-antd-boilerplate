import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Table, Spin } from 'antd';
class DataTable extends React.Component{
    render(){
        console.log("dave", this.props);
        const tableData = this.props.mapTableData();
        return (
        <Spin spinning={!this.props.subReady}>
            <Table columns={this.props.columns} dataSource={tableData}/>
        </Spin>);
    }
}
DataTable.PropTypes = {
    columns: Array,
    subscription: String,
    mapTableData:Function
};
export default createContainer((props) => {
    const subReady = Meteor.subscribe(props.subscription).ready();

    return {
        subReady
    };
}, DataTable);