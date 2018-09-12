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
            { title: '$i18n{index.jsx0}$i18n-end', dataIndex: 'name', key: 'name',width: '30%', render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'name')}
                />
            )},
            { title: '$i18n{index.jsx1}$i18n-end', dataIndex: 'status', key: 'status'},
            { title: '$i18n{index.jsx2}$i18n-end', dataIndex: 'date', key: 'date' },
            {title: '$i18n{index.jsx3}$i18n-end', dataIndex: 'price', key: 'price'},
        ];
        this.state = {
            data2 : [
                { name: '$i18n{index.jsx4}$i18n-end', status: 'sale', date: '2017-04-19', price: '30555', key: '0' },
                { name: '$i18n{index.jsx5}$i18n-endHR$i18n{index.jsx6}$i18n-end', status: 'hot', date: '2017-04-19', price: '68888', key: '1' },
                { name: '$i18n{index.jsx7}$i18n-end', status: 'hot', date: '2017-04-19', price: '28889', key: '2' },
                { name: '$i18n{index.jsx8}$i18n-end', status: 'test', date: '2017-04-19', price: '36666', key: '3' },
                { name: '$i18n{index.jsx9}$i18n-end', status: 'new', date: '2017-04-19', price: '25777', key: '4' }
            ],
            data3: [
                { name: '$i18n{index.jsx10}$i18n-end', status: 'sale', date: '2017-04-19', price: '30555', key: '0' },
                { name: '$i18n{index.jsx11}$i18n-endHR$i18n{index.jsx12}$i18n-end', status: 'hot', date: '2017-04-19', price: '68888', key: '1' },
                { name: '$i18n{index.jsx13}$i18n-end', status: 'hot', date: '2017-04-19', price: '28889', key: '2' },
                { name: '$i18n{index.jsx14}$i18n-end', status: 'test', date: '2017-04-19', price: '36666', key: '3' },
                { name: '$i18n{index.jsx15}$i18n-end', status: 'new', date: '2017-04-19', price: '25777', key: '4' }
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
                    <Panel header="$i18n{index.jsx16}$i18n-end">
                        <Table
                            columns={ this.columns1 }
                            data={ this.data1 }
                            emptyText={ () => (<span>$i18n{index.jsx17}$i18n-end</span>)}
                        />
                    </Panel>
                </Col>
                <Col md={6}>
                    <Panel header="$i18n{index.jsx18}$i18n-end">
                        <Table
                            columns={ this.columns2 }
                            data={ this.state.data2 }
                        />
                    </Panel>
                </Col>
                <Col md={6}>
                    <Panel header="$i18n{index.jsx19}$i18n-end">
                        <LoadingTable />
                    </Panel>
                </Col>
                <Col md={6}>
                    <Panel header="$i18n{index.jsx20}$i18n-end">
                        <Select
                            showSearch
                            style={{ width: 200, marginBottom: 20 }}
                            placeholder="$i18n{index.jsx21}$i18n-end"
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
