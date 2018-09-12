import React, {Component} from 'react';
import {
    Row,
    Col,
    Table,
    Form,
    Icon,
    InputGroup,
    Label,
    FormControl,
    Popconfirm,
    Breadcrumb,
    Dropdown,
    Pagination,
    Modal,
    FormGroup,
    Button,
    Navbar,
    Checkbox,
    Menu
} from 'tinper-bee';

import './index.css';

const { ColumnGroup, Column } = Table;

import { USER_DATA } from '../../constant';

class UserManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: 'name',
            showModal: false,
            activePage: 1,
            data: USER_DATA,
            showData: USER_DATA.slice(0, 10),
            userName: '',
            userPhone: '',
            userNickName: '',
            checkedAry: [],
            edit: false,
            checkedAll: false,
            searchValue: '',

        };
        this.editId = 0;
        const self = this;
        this.columns = [
            {
                title: <Checkbox onChange={ this.handleCheckAll }/>,
                dataIndex: 'id',
                key: 'id',
                className: 'table-checkbox',
                width: 50,
                render (text, record) {
                    let checked = false;
                    const {checkedAry} = self.state;
                    if (checkedAry.indexOf(text) > -1) {
                        checked = true;
                    }

                    return <Checkbox checked={ checked } onChange={ self.handleCheck(text) }/>;
                }
            },
            {title: '$i18n{index.jsx0}$i18n-end', dataIndex: 'name', key: 'name'},
            {
                title: '$i18n{index.jsx1}$i18n-end', dataIndex: 'nickname', key: 'nickname'
            },
            {title: '$i18n{index.jsx2}$i18n-end', dataIndex: 'date', key: 'date'},
            {
                title: '$i18n{index.jsx3}$i18n-end', dataIndex: 'phone', key: 'phone'
            },
            {
                title: '$i18n{index.jsx4}$i18n-end', dataIndex: 'id', key: 'control', render(text, record, index) {
                return (
                    <span className="control">
                        <Icon
                            type="uf-pencil-s"
                            onClick={ self.handleEdit(record) }
                        />
                        <Popconfirm
                            trigger="click"
                            onClose={ self.handleDelete(record.id) }
                            placement="bottom"
                            content={"$i18n{index.jsx5}$i18n-end"}>
                            <Icon type="uf-del"/>
                        </Popconfirm>
                    </span>
                )
            }
            }
        ];
    }

    /**
     * $i18n{index.jsx6}$i18n-end
     * @param e
     */
    handleCheckAll = () => {
        let {checkedAry, checkedAll, data} = this.state;
        checkedAry = [];
        if (!checkedAll) {
            data.forEach((item) => {
                checkedAry.push(item.id);
            })
            checkedAll = true;
        } else {
            checkedAll = false;
        }
        this.setState({
            checkedAry,
            checkedAll
        })
    }

    /**
     * $i18n{index.jsx7}$i18n-end
     * @param id
     * @returns {function(*)}
     */
    handleCheck = (id) => {
        return () => {
            let {checkedAry} = this.state;
            if (checkedAry.indexOf(id) > -1) {
                checkedAry = checkedAry.filter((item) => {
                    return item !== id;
                })
            } else {
                checkedAry.push(id);
            }
            this.setState({
                checkedAry
            })
        }
    }
    onVisibleChange = (visible) => {

    }

    /**
     * $i18n{index.jsx8}$i18n-end
     * @param key
     */
    onSelect = ({key}) => {
        this.setState({
            searchKey: key
        })
    }

    /**
     * $i18n{index.jsx9}$i18n-end
     * @param obj
     * @returns {function()}
     */
    handleEdit = (obj) => {
        return () => {
            this.editId = obj.id;
            this.setState({
                showModal: true,
                edit: true,
                userName: obj.name,
                userNickName: obj.nickname,
                userPhone: obj.phone,
            });
        }

    }

    /**
     * $i18n{index.jsx10}$i18n-end
     * @returns {XML}
     */
    renderMenu = () => {
        return (
            <Menu
                onSelect={this.onSelect}>
                <Menu.Item key="name">$i18n{index.jsx11}$i18n-end</Menu.Item>
                <Menu.Item key="phone">$i18n{index.jsx12}$i18n-end</Menu.Item>
            </Menu>
        )
    }

    /**
     * $i18n{index.jsx13}$i18n-end
     */
    addUser = () => {
        this.setState({
            showModal: true
        })
    }

    /**
     * $i18n{index.jsx14}$i18n-end
     */
    modalClose = () => {
        this.setState({
            showModal: false,
            userName: '',
            userNickName: '',
            userPhone: '',
            edit: false
        })
    }

    /**
     * $i18n{index.jsx15}$i18n-end
     */
    modalEnsure = () => {
        let {data, edit, userName, userPhone, userNickName} = this.state;

        let len = data.length;
        let newDate = new Date();
        let date = `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}`;
        if (edit) {
            data.forEach((item) => {
                if (item.id === this.editId) {
                    item.name = userName;
                    item.phone = userPhone;
                    item.nickname = userNickName;
                }
            })
        } else {
            let userObj = {
                id: len + 1,
                name: userName,
                nickname: userNickName,
                date: date,
                phone: userPhone,
                key: len + 1
            };

            data.push(userObj);
        }


        this.setState({
            data: data,
            showModal: false,
            userName: '',
            userNickName: '',
            userPhone: '',
            edit: false
        });
    }

    /**
     * $i18n{index.jsx16}$i18n-end
     * @param eventKey
     */
    handlePageSelect = (eventKey) => {
        console.log(eventKey);
        this.setState({
            activePage: eventKey
        })
    }

    /**
     * $i18n{index.jsx17}$i18n-end
     * @param id $i18n{index.jsx18}$i18n-end
     * @returns {function()}
     */
    handleDelete = (id) => {
        return () => {
            let {data, activePage} = this.state;
            data = data.filter((item) => {
                return item.id !== id;
            });
            let showData = data.splice(10 * (activePage - 1) + 1, 10 * activePage);
            this.setState({
                showData
            })
        }
    }

    /**
     * $i18n{index.jsx19}$i18n-end
     * @param state
     * @returns {function(*)}
     */
    handleInputChange = (state) => {
        return (e) => {
            this.setState({
                [state]: e.target.value
            })
        }
    }

    /**
     * $i18n{index.jsx20}$i18n-end
     */
    deleteUsers = () => {
        let {data, checkedAry} = this.state;
        data = data.filter((item) => {
            return checkedAry.indexOf(item.id) <= -1;
        });

        this.setState({
            data
        })
    }

    handleSearch = () => {
        let {searchValue, searchKey, data} = this.state;
        let searchRegExp = new RegExp(searchValue, 'ig');
        if (searchValue == "") {
            return this.setState({
                data: USER_DATA
            })
        }

        data = data.filter((item) => {
            return searchRegExp.test(item[searchKey])
        });

        this.setState({
            showData: data
        })

    }

    renderCheckboxCol = (text, rec) => {
        let checked = false;
        const {checkedAry} = this.state;
        if (checkedAry.indexOf(text) > -1) {
            checked = true;
        }

        return <Checkbox checked={ checked } onChange={ this.handleCheck(text) }/>;
    }

    renderControl = (text, record) => {
        return (
            <div className="control">
                <Icon
                    type="uf-pencil-s"
                    onClick={ this.handleEdit(record) }
                />
                <Popconfirm
                    trigger="click"
                    onClose={ this.handleDelete(record.id) }
                    placement="bottom"
                    content={"$i18n{index.jsx21}$i18n-end"}>
                    <Icon type="uf-del"/>
                </Popconfirm>
            </div>
        )
    }

    renderEmailOrPhone = (type) => (text) => {
        switch(type){
            case 'phone':
                return (
                    <div>
                    <Icon className="blue-500" type="uf-mobile" />
                        { text }
                </div>
                );
            case 'email':
                return (
                    <div>
                        <Icon className="red-500" type="uf-mail" />
                        { text }
                    </div>
                )
        }
    }

    render() {
        return (
            <Row className="usermanager">
                <Col md={12}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">
                            <Icon type="uf-home"/>$i18n{index.jsx22}$i18n-end
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Icon type="uf-users"/>$i18n{index.jsx23}$i18n-end
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col md={12}>
                    <div className="user-board">
                        <Button colors="primary" className="add-user" onClick={ this.addUser }>$i18n{index.jsx24}$i18n-end</Button>
                        <Button colors="danger" className="delete-user" onClick={ this.deleteUsers }>$i18n{index.jsx25}$i18n-end</Button>
                        <InputGroup className="user-search">
                            <InputGroup.Button>
                                <Dropdown
                                    trigger={['click']}
                                    overlay={this.renderMenu()}
                                    animation="slide-up"
                                    onVisibleChange={this.onVisibleChange}
                                >
                                    <Button bordered>
                                        { this.state.searchKey === 'name' ? '$i18n{index.jsx26}$i18n-end' : '$i18n{index.jsx27}$i18n-end' }
                                        <Icon type="uf-arrow-down"/>
                                    </Button>
                                </Dropdown>
                            </InputGroup.Button>
                            <FormControl onChange={ this.handleInputChange('searchValue')} type="text"/>
                            <InputGroup.Button>
                                <Button colors="primary" onClick={ this.handleSearch }>
                                    <Icon type="uf-search"/>
                                </Button>
                            </InputGroup.Button>
                        </InputGroup>

                        <Table
                            className="user-table bordered"
                            data={ this.state.showData }
                        >
                            <Column
                                title={<Checkbox onChange={ this.handleCheckAll }/>}
                                dataIndex="id"
                                key="id"
                                className='table-checkbox'
                                width={50}
                                render={ this.renderCheckboxCol }
                            />
                            <ColumnGroup title="$i18n{index.jsx28}$i18n-end">
                                <Column
                                    title="$i18n{index.jsx29}$i18n-end"
                                    dataIndex="name"
                                    key="name"
                                />
                                <Column
                                    title="$i18n{index.jsx30}$i18n-end"
                                    dataIndex="nickname"
                                    key="nickname"
                                />
                            </ColumnGroup>
                            <ColumnGroup title="$i18n{index.jsx31}$i18n-end">
                                <Column
                                    title="$i18n{index.jsx32}$i18n-end"
                                    dataIndex="phone"
                                    key="phone"
                                    render={ this.renderEmailOrPhone('phone') }
                                />
                                <Column
                                    title="$i18n{index.jsx33}$i18n-end"
                                    dataIndex="email"
                                    key="email"
                                    render={ this.renderEmailOrPhone('email') }
                                />
                            </ColumnGroup>
                            <Column
                                title="$i18n{index.jsx34}$i18n-end"
                                dataIndex="date"
                                key="date"
                            />
                            <Column
                                title="$i18n{index.jsx35}$i18n-end"
                                dataIndex="id"
                                key="control"
                                render={ this.renderControl }
                            />
                        </Table>
                        <div className="text-center">
                            <Pagination
                                first
                                last
                                prev
                                next
                                boundaryLinks
                                items={20}
                                maxButtons={5}
                                activePage={this.state.activePage}
                                onSelect={this.handlePageSelect}/>
                        </div>

                    </div>
                </Col>
                <Modal
                    show={ this.state.showModal }
                    onHide={ this.modalClose }
                    style={{width: 450}}
                >
                    <Modal.Header className="text-center">
                        <Modal.Title>{ this.state.edit ? '$i18n{index.jsx36}$i18n-end' : '$i18n{index.jsx37}$i18n-end' }</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form horizontal>
                            <Row>
                                <FormGroup controlId="formInlineName">
                                    <Col sm={3} className="text-right">
                                        <Label>$i18n{index.jsx38}$i18n-end:</Label>
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={ this.state.userName }
                                            onChange={ this.handleInputChange('userName') }
                                            placeholder="$i18n{index.jsx39}$i18n-end"
                                        />
                                    </Col>
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup controlId="formInlineName">
                                    <Col sm={3} className="text-right">
                                        <Label>$i18n{index.jsx40}$i18n-end:</Label>
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={ this.state.userNickName }
                                            onChange={ this.handleInputChange('userNickName') }
                                            placeholder="$i18n{index.jsx41}$i18n-end"
                                        />
                                    </Col>
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup controlId="formInlineName">
                                    <Col sm={3} className="text-right">
                                        <Label>$i18n{index.jsx42}$i18n-end:</Label>
                                    </Col>
                                    <Col sm={7}>
                                        <FormControl
                                            value={ this.state.userPhone }
                                            onChange={ this.handleInputChange('userPhone') }
                                            placeholder="$i18n{index.jsx43}$i18n-end"
                                        />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </Form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Row>
                            <Col md={2} mdOffset={3}>
                                <Button onClick={ this.modalClose } bordered>$i18n{index.jsx44}$i18n-end</Button>
                            </Col>
                            <Col md={2} mdOffset={1}>
                                <Button onClick={ this.modalEnsure } colors="primary">$i18n{index.jsx45}$i18n-end</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </Row>
        )
    }
}

export default UserManager;
