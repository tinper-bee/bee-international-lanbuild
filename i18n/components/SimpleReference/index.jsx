import React, { Component } from 'react';
import {
    Row,
    Col,
    FormControl,
    Modal,
    Label,
    Tree,
    Table,
    FormGroup,
    Icon,
    Button,
    Popconfirm,
    Pagination,
    InputGroup,
    Notification
} from 'tinper-bee';


import Tabs, { TabPane } from 'bee-tabs';
import TabContent from 'bee-tabs/build/TabContent';
import ScrollableInkTabBar from 'bee-tabs/build/ScrollableInkTabBar';

import { SIMPLE_REFER_DATA } from '../../constant';

import './index.css';

const notification = Notification.newInstance({position: 'bottomRight'});

class SimpleReference extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            data: SIMPLE_REFER_DATA,
            commonData: [],
            selectValue: "",
            inputValue: ""
        };
        this.commonColumns = [
            { title: '$i18n{index.jsx0}$i18n-end', dataIndex: 'id', key: 'id'},
            {  title: '$i18n{index.jsx1}$i18n-end', dataIndex: 'refname', key: 'refname'},
            { title: '$i18n{index.jsx2}$i18n-end', dataIndex: 'refpk', key: 'refpk'},
            {
                title: '$i18n{index.jsx3}$i18n-end', dataIndex: '', key: 'd', render: this.renderAdd.bind(this),
            },
        ];
        this.columns = [
            { title: '$i18n{index.jsx4}$i18n-end', dataIndex: 'id', key: 'id'},
            {  title: '$i18n{index.jsx5}$i18n-end', dataIndex: 'refname', key: 'refname'},
            { title: '$i18n{index.jsx6}$i18n-end', dataIndex: 'refpk', key: 'refpk'},
            {
                title: '$i18n{index.jsx7}$i18n-end', dataIndex: '', key: 'd', render: this.renderDelete.bind(this),
            },
        ];
        this.renderAdd = this.renderAdd.bind(this);
        this.renderDelete = this.renderDelete.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.close = this.close.bind(this);
        this.onDataSelect = this.onDataSelect.bind(this);
        this.ensure = this.ensure.bind(this);
    }
    renderAdd (text, record, index) {
        return <span style={{ cursor: 'pointer' }} onClick={this.handleAdd(record)}><Icon type="uf-plus"></Icon>$i18n{index.jsx8}$i18n-end</span>;
    }
    renderDelete (text, record, index) {
        return <Popconfirm content="$i18n{index.jsx9}$i18n-end" onClick={e=>e.stopPropagation()} onClose={this.handleDelete(index)}>
            <span>
            <Icon type="uf-del"></Icon>
            $i18n{index.jsx10}$i18n-end
            </span>
        </Popconfirm>;
    }
    onDataSelect (record, index) {
        this.setState({
            selectValue: record.refname
        })
    }
    handleAdd (record) {
        const self = this;
        return function (e) {
            let data = self.state.commonData;
            data.push(record);
            self.setState({
                commonData: data
            });
            e.stopPropagation();
            notification.notice({
                content: <span>$i18n{index.jsx11}$i18n-end</span>,
                color: 'light'
            });
        }
    }
    handleDelete (index) {
        const self = this;
        return function () {
            let data = self.state.commonData;
            data.splice(index, 1);
            self.setState({
                commonData: data
            });
        }
    }
    handleFocus () {
        this.setState({
            show: true
        })
    }
    close () {
        this.setState({
            show: false
        })
    }
    ensure () {
        this.setState({
            inputValue: this.state.selectValue,
            show: false
        })
    }
    render () {
        const { data, commonData } = this.state;
        data.forEach(function (item, index) {
            item.key = index;
        });
        commonData.forEach(function (item, index) {
            item.key = index;
        });
        return (
            <Row>
                <Col md={10} mdOffset={1}>
                    <FormGroup>
                        <Label>$i18n{index.jsx12}$i18n-end</Label>
                        <FormControl
                            value={this.state.inputValue}
                            onClick={this.handleFocus}
                        />
                    </FormGroup>
                </Col>
                <Modal show={ this.state.show } size='xlg' onHide={ this.close }>
                    <Modal.Header closeButton>
                        <Modal.Title > $i18n{index.jsx13}$i18n-end </Modal.Title>
                    </Modal.Header >
                    <Modal.Body >
                        <Tabs
                            defaultActiveKey="2"
                            renderTabBar={()=><ScrollableInkTabBar />}
                            renderTabContent={()=><TabContent />}
                        >
                            <TabPane tab="$i18n{index.jsx14}$i18n-end" key="1">
                                <Table
                                    onRowClick = { this.onDataSelect }
                                    columns={this.columns}
                                    data={commonData}
                                />
                            </TabPane>

                            <TabPane tab="$i18n{index.jsx15}$i18n-end" key="2">
                                <div>
                                    <Table
                                        onRowClick = { this.onDataSelect }
                                        columns={this.commonColumns}
                                        data={data}
                                    />
                                </div>
                            </TabPane>
                        </Tabs>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.ensure } colors="primary" style={{ marginRight: 50 }}> $i18n{index.jsx16}$i18n-end </Button>
                        <Button onClick={ this.close }> $i18n{index.jsx17}$i18n-end </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        )
    }
}

export default SimpleReference;
