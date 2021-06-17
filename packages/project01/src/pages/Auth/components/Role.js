import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Button, Form, Select, Row, Modal, Input, Table, Col, Tooltip, message } from 'antd'

import styles from '../style.css'

const { Option } = Select

class AuthRole extends React.Component {
  state = {
    record: {},
    visible: false,
    system_id: null,
    project_id: null
  }

  componentDidMount() {
    this.refreshList()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.project_list !== this.props.project_list) {
      // 如果project_list发生改变
      const { dispatch, project_list } = this.props
      if (project_list != undefined && project_list.length != 0) {
        dispatch({
          type: 'role/fetchRoleList',
          payload: {
            project_id: project_list[0].project_id
          }
        })
        dispatch({
          type: 'permission/fetchPermissionList',
          payload: {
            project_id: project_list[0].project_id
          }
        })
        this.setState({ project_id: project_list[0].project_id }) //project_id状态设置为第一个项目
      } else if (project_list != undefined && project_list.length == 0) {
        this.setState({ project_id: null }) //project_id状态设置为第一个项目
        dispatch({
          type: 'role/clear',
          payload: {}
        })
        message.error('当前系统下不存在项目,请先创建项目')
      }
    }
  }

  refreshList = () => {
    const { dispatch, system_list, project_list } = this.props

    dispatch({
      type: 'system/fetchSystems'
    })
    dispatch({
      type: 'auth_project/fetchProjects',
      payload: { system_id: system_list[0].system_id }
    })
    if (system_list[0].system_id) {
      this.setState({ system_id: system_list[0].system_id })
    }
    if (project_list != undefined && project_list.length != 0) {
      dispatch({
        type: 'role/fetchRoleList',
        payload: {
          project_id: project_list[0].project_id
        }
      })
      this.setState({ project_id: project_list[0].project_id })
    }
  }

  static propTypes = {
    role_list: PropTypes.array.isRequired,
    system_list: PropTypes.array.isRequired,
    project_list: PropTypes.array.isRequired,
    permission_list: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.object.isRequired
  }

  handleEditModel = record => {
    this.setState({ record, visible: true })
  }

  handleSystemSelectChange = value => {
    const { dispatch } = this.props
    dispatch({
      type: 'auth_project/fetchProjects',
      payload: { system_id: value }
    })
    this.setState({ system_id: value })
  }

  handleSelectProjectChange = value => {
    const { dispatch } = this.props
    dispatch({
      type: 'role/fetchRoleList',
      payload: {
        project_id: value
      }
    })
    dispatch({
      type: 'permission/fetchPermissionList',
      payload: {
        project_id: value
      }
    })
    this.setState({ project_id: value })
  }

  handleDelete = role_id => {
    Modal.confirm({
      title: '请问是否确认删除角色？',
      okText: '确定',
      cancelText: '取消',
      onOk: () =>
        new Promise(resolve => {
          const { dispatch } = this.props
          const { project_id } = this.state
          dispatch({
            type: 'role/deleteRole',
            payload: { role_id }
          }).then(() => {
            resolve()
            dispatch({
              type: 'role/fetchRoleList',
              payload: { project_id }
            })
          })
        })
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props
        const { role_id } = this.state.record
        const { project_id } = this.state
        values.role_id = role_id
        values.project_id = project_id
        dispatch({
          type: 'role/postRole',
          payload: values
        }).then(() => {
          this.setState({ visible: false })
          dispatch({
            type: 'role/fetchRoleList',
            payload: { project_id }
          })
        })
      }
    })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  columns = [
    {
      title: '角色编号',
      dataIndex: 'role_id',
      align: 'center',
      width: 100
    },
    {
      title: '角色名称',
      dataIndex: 'role_name',
      align: 'center',
      width: 150
    },
    {
      title: '角色描述',
      dataIndex: 'role_description',
      align: 'center',
      width: 200
    },
    {
      title: '角色权限',
      dataIndex: 'role_auths',
      align: 'center',
      width: 150,
      render: role_auths =>
        role_auths.map((item, index) => (
          <Tooltip key={index} title={item.permission_description}>
            <span>{item.permission_name}</span>
            <span>{role_auths.length - 1 !== index ? '，' : ''}</span>
          </Tooltip>
        ))
    },
    {
      title: '操作',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <>
          <Button type="primary" size="small" onClick={() => this.handleEditModel(record)}>
            编辑
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            type="danger"
            size="small"
            onClick={() => this.handleDelete(record.role_id)}
          >
            删除
          </Button>
        </>
      )
    }
  ]

  render() {
    const { role_list, system_list, permission_list, form, project_list } = this.props
    const { getFieldDecorator } = form
    const { record, visible, project_id, system_id } = this.state
    const tableLoading = this.props.loading.effects['role/fetchPermissionList']
    const submitLoading = this.props.loading.effects['role/postRole']
    return (
      <>
        <Row type="flex" justify="space-between">
          <Col>
            所属系统：
            <Select
              value={system_id}
              style={{ width: 150 }}
              loading={tableLoading}
              onChange={this.handleSystemSelectChange}
            >
              {system_list.map((system, index) => (
                <Option key={index} value={system.system_id}>
                  {system.system_name}
                </Option>
              ))}
            </Select>
            <span style={{ marginLeft: 20 }}>所属项目：</span>
            <Select
              style={{ width: 150 }}
              value={project_id}
              loading={tableLoading}
              onChange={this.handleSelectProjectChange}
            >
              {project_list.map(project => (
                <Option key={project.project_id} value={project.project_id}>
                  {project.project_name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col offset={1}>
            <Button
              type="primary"
              onClick={() => this.handleEditModel({ role_id: null })}
              disabled={project_id == null ? true : false}
            >
              添加角色
            </Button>
          </Col>
        </Row>
        <div className={styles.table_margin}>
          <Table
            loading={tableLoading}
            className="page_body"
            rowKey="role_id"
            bordered
            pagination={false}
            scroll={{ x: true }}
            columns={this.columns}
            dataSource={role_list}
          />
        </div>
        <Modal
          title={record.role_id !== null ? '编辑角色' : '添加角色'}
          visible={visible}
          destroyOnClose
          maskClosable={false}
          onCancel={this.handleCancel}
          centered
          footer={null}
        >
          <Form
            className="page_body"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 17, offset: 1 }}
            onSubmit={this.handleSubmit}
          >
            <Form.Item label="角色名称">
              {getFieldDecorator('role_name', {
                initialValue: record.role_name
              })(<Input placeholder="请输入角色名称" />)}
            </Form.Item>
            <Form.Item label="角色描述">
              {getFieldDecorator('role_description', {
                initialValue: record.role_description
              })(<Input placeholder="请输入角色描述" />)}
            </Form.Item>
            <Form.Item label="角色权限">
              {getFieldDecorator('role_auths', {
                initialValue: record.role_auths && record.role_auths.map(item => item.permission_id)
              })(
                <Select mode="multiple" style={{ width: '100%' }} placeholder="请选择角色权限">
                  {permission_list.map(item => (
                    <Select.Option key={item.permission_id} value={item.permission_id}>
                      {item.permission_name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Row type="flex" justify="center">
              <Button htmlType="submit" type="primary" loading={submitLoading}>
                保存
              </Button>
            </Row>
          </Form>
        </Modal>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    system_list: state.system.system_list,
    role_list: state.role.role_list,
    project_list: state.auth_project.project_list,
    permission_list: state.permission.permission_list,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Form.create()(AuthRole))
