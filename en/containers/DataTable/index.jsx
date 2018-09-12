import React, { Component } from 'react';
import {
    Row,
    Col,
    Panel,
    Table,
    Select
} from 'tinper-bee';
import { EditableCell, LoadingTable } from '../../components/index';

import './index.css';

const Option = Select.Option;

class DataTable extends Component{
    constructor(props){
        super(props);
        this.columns1=[];
        this.data1=[];
        this.columns2 = [
            { title: 'noDictionnaryFlag', dataIndex: 'name', key: 'name',width: '30%', render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'name')}
                />
            )},
            { title: 'noDictionnaryFlag', dataIndex: 'status', key: 'status'},
            { title: 'noDictionnaryFlag', dataIndex: 'date', key: 'date' },
            {title: 'noDictionnaryFlag', dataIndex: 'price', key: 'price'},
        ];
        this.state = {
            data2 : [
                { name: 'noDictionnaryFlag', status: 'sale', date: '2017-04-19', price: '30555', key: '0' },
                { name: 'noDictionnaryFlagHRnoDictionnaryFlag', status: 'hot', date: '2017-04-19', price: '68888', key: '1' },
                { name: 'noDictionnaryFlag', status: 'hot', date: '2017-04-19', price: '28889', key: '2' },
                { name: 'noDictionnaryFlag', status: 'test', date: '2017-04-19', price: '36666', key: '3' },
                { name: 'noDictionnaryFlag', status: 'new', date: '2017-04-19', price: '25777', key: '4' }
            ],
            data3: [
                { name: 'noDictionnaryFlag', status: 'sale', date: '2017-04-19', price: '30555', key: '0' },
                { name: 'noDictionnaryFlagHRnoDictionnaryFlag', status: 'hot', date: '2017-04-19', price: '68888', key: '1' },
                { name: 'noDictionnaryFlag', status: 'hot', date: '2017-04-19', price: '28889', key: '2' },
                { name: 'noDictionnaryFlag', status: 'test', date: '2017-04-19', price: '36666', key: '3' },
                { name: 'noDictionnaryFlag', status: 'new', date: '2017-04-19', price: '25777', key: '4' }
            ],
            filterKey: null
        }
    }


    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.data2];
            dataSource[index][key] = value;
            this.setState({
                data2
            });
        };
    }

    handleChange = (value) => {
        let { data2 } = this.state;
        let data3 = data2.filter( (item) => {
            return item.status === value;
        })

        this.setState({
            filterKey: value,
            data3
        })
    }

    render () {
        return (
            <Row className="data-table">
                <Col md={6}>
                    <Panel header="noDictionnaryFlag">
                        <Table
                            columns={ this.columns1 }
                            data={ this.data1 }
                            emptyText={ () => (<span>noDictionnaryFlag</span>)}
                        />
                    </Panel>
                </Col>
                <Col md={6}>
                    <Panel header="noDictionnaryFlag">
                        <Table
                            columns={ this.columns2 }
                            data={ this.state.data2 }
                        />
                    </Panel>
                </Col>
                <Col md={6}>
                    <Panel header="noDictionnaryFlag">
                        <LoadingTable />
                    </Panel>
                </Col>
                <Col md={6}>
                    <Panel header="noDictionnaryFlag">
                        <Select
                            showSearch
                            style={{ width: 200, marginBottom: 20 }}
                            placeholder="noDictionnaryFlag"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                        >
                            <Option value="sale">sale</Option>
                            <Option value="hot">hot</Option>
                            <Option value="test">test</Option>
                            <Option value="new">new</Option>
                        </Select>
                        <Table
                            columns={ this.columns2 }
                            data={ this.state.filterKey ? this.state.data3 : this.state.data2 }
                        />
                    </Panel>
                </Col>
            </Row>
        )
    }
}

export default DataTable;
