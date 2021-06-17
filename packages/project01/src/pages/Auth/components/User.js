/* eslint-disable react/display-name */
import React from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Pagination, Button, Form, Select, Row, Modal, Input, Table, Menu, Dropdown, Col, Tooltip, Icon } from 'antd'
import DynamicAssignSystem from './DynamicAssignSystem'
import DynamicAssignProject from './DynamicAssignProject'
import AssignRole from './AssignRole'
import styles from '../style.css'
import ModifyPassword from './ModifyPassword'

const { Option } = Select

//#region 设置表头
const commonColumns = [
  {
    title: '用户账号',
    dataIndex: 'account',
    align: 'center',
    width: 100,
    ellipsis: true,
    render: text => (
      <Tooltip title={text}>
        <span>{text}</span>
      </Tooltip>
    )
  },
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'center',
    width: 80,
    ellipsis: true,
    render: text => (
      <Tooltip title={text}>
        <span>{text}</span>
      </Tooltip>
    )
  },
  {
    title: '身份证号',
    dataIndex: 'id_card',
    align: 'center',
    width: 100,
    ellipsis: true,
    render: id_card =>
      id_card ? (
        <Tooltip title={id_card}>
          <span>{id_card}</span>
        </Tooltip>
      ) : (
        <span style={{ color: '#bfbfbf' }}>无</span>
      )
  },
  {
    title: '单位',
    dataIndex: 'department',
    align: 'center',
    width: 100,
    ellipsis: true,
    render: text => (
      <Tooltip title={text}>
        <span>{text}</span>
      </Tooltip>
    )
  },
  {
    title: '科室',
    dataIndex: 'office',
    align: 'center',
    width: 100,
    ellipsis: true,
    render: text => (
      <Tooltip title={text}>
        <span>{text}</span>
      </Tooltip>
    )
  },
  {
    title: '中心',
    dataIndex: 'research_center_name',
    align: 'center',
    width: 120,
    ellipsis: true,
    render: text => (
      <Tooltip title={text}>
        <span>{text}</span>
      </Tooltip>
    )
  },
  // {
  //   title: '其他中心',
  //   // dataIndex: '',
  //   align: 'center',
  //   width: 120,
  //   ellipsis: true,
  //   render: text => (
  //     <Tooltip title="..">
  //       <span>..</span>
  //     </Tooltip>
  //   )
  // },
  {
    title: '职称',
    dataIndex: 'title',
    align: 'center',
    width: 100,
    ellipsis: true,
    render: text => (
      <Tooltip title={text}>
        <span>{text}</span>
      </Tooltip>
    )
  },
  {
    title: '电话',
    dataIndex: 'phone',
    align: 'center',
    width: 100,
    ellipsis: true,
    render: phone =>
      phone ? (
        <Tooltip title={phone}>
          <span>{phone}</span>
        </Tooltip>
      ) : (
        <span style={{ color: '#bfbfbf' }}>无</span>
      )
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align: 'center',
    width: 100,
    ellipsis: true,
    render: email =>
      email ? (
        <Tooltip title={email}>
          <span>{email}</span>
        </Tooltip>
      ) : (
        <span style={{ color: '#bfbfbf' }}>无</span>
      )
  }
]
//#endregion

class AuthUser extends React.Component {
  state = {
    status: {
      page: 1,
      limit: 20
    },
    system_id: null,
    project_id: null,
    selected_research_center_id: null,
    record: {},
    visible: false,
    assign_visible: false,
    project_visible: false,
    role_visible: false,
    password_visible: false,
    confirmDirty: false,
    system_ids: []
  }

  refreshList = state => {
    let { status } = this.state
    const { system_id, project_id } = this.state
    const { dispatch } = this.props

    if (state) {
      status = { ...status, ...state }
    }
    // 如果选择了系统和项目
    if (system_id !== null && project_id !== null) {
      dispatch({
        type: 'global/fetchResearchCenterInfo',
        payload: { project_id: project_id, system_id: system_id }
      })
      dispatch({
        type: 'user/fetchProjectUsers',
        payload: { ...status, project_id }
      })
    } else if (system_id !== null) {
      // 如果只选择了系统
      dispatch({
        type: 'global/fetchResearchCenterInfo',
        payload: { system_id: system_id }
      })
      dispatch({
        type: 'user/fetchSystemUsers',
        payload: { ...status, system_id }
      })
    } else {
      // 没有选择系统
      dispatch({
        type: 'global/fetchResearchCenterInfo',
        payload: { system_id: 1 }
      })
      dispatch({
        type: 'user/fetchUsers',
        payload: status
      })
    }
    this.setState({ status })
  }

  componentDidMount() {
    this.refreshList()
  }

  static propTypes = {
    user_list: PropTypes.array.isRequired,
    research_centers: PropTypes.array.isRequired,
    system_user_list: PropTypes.array.isRequired,
    project_user_list: PropTypes.array.isRequired,
    project_list: PropTypes.array.isRequired,
    system_list: PropTypes.array.isRequired,
    role_list: PropTypes.array.isRequired,
    total: PropTypes.number,
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.object.isRequired
  }

  handleEditModel = record => {
    // console.log('record.research_center_id', record.research_center_id)
    // if (record.research_center_ids.length === 0) {
    //   record.research_center_ids = [record.research_center_id]
    // }
    if (record.research_center_ids) {
      let has_research_center_id = false
      for (const item of record.research_center_ids) {
        if (item === record.research_center_id) {
          has_research_center_id = true
        }
      }
      if (!has_research_center_id) {
        record.research_center_ids.push(record.research_center_id)
      }
    }
    this.setState({ record, visible: true, selected_research_center_id: record.research_center_id })
  }

  handleAssignModel = record => {
    this.setState({ record, assign_visible: true })
  }

  handleProjectModel = record => {
    this.setState({ record, project_visible: true })
  }

  handleRoleModel = record => {
    this.setState({ record, role_visible: true })
  }

  handleEditPassword = record => {
    this.setState({ record, password_visible: true })
  }

  handleSelectSystemChange = value => {
    // 切换系统的时候获取对应系统的项目list 和角色列表
    if (value !== null) {
      const { dispatch } = this.props
      dispatch({
        type: 'auth_project/fetchProjects',
        payload: { system_id: value }
      })
    }
    this.setState({ system_id: value, project_id: null }, () => this.refreshList({ page: 1 }))
  }

  handleSelectProjectChange = value => {
    const { dispatch } = this.props
    // const { system_id } = this.state

    // dispatch({
    //   type: 'global/fetchResearchCenterInfo',
    //   payload: { project_id: value, system_id: system_id }
    // })
    dispatch({
      type: 'role/fetchRoleList',
      payload: { project_id: value }
    })
    this.setState({ project_id: value }, () => this.refreshList({ page: 1 }))
  }

  handleDelete = (id, account, type) => {
    const content =
      type === 'all'
        ? '所有用户视角下删除用户将会级联删除用户在系统和项目下的关联。'
        : type === 'system'
        ? '系统视角下删除该用户将会删除级联删除用户在项目下的关联。'
        : '项目视角下删除该用户将会删除用户在该项目下的记录。'

    Modal.confirm({
      title: `请问是否确认删除账户“${account}”？`,
      okText: '确定',
      content,
      cancelText: '取消',
      onOk: () =>
        new Promise(resolve => {
          const { dispatch } = this.props
          const { system_id, project_id } = this.state

          let deleteAction

          if (type === 'all') {
            deleteAction = () =>
              dispatch({
                type: 'user/deleteUser',
                payload: { user_id: id }
              })
          } else if (type === 'system') {
            deleteAction = () =>
              dispatch({
                type: 'user/deleteSystemUser',
                payload: { system_id, user_id: id }
              })
          } else {
            deleteAction = () =>
              dispatch({
                type: 'user/deleteProjectUser',
                payload: { system_id, project_id, user_id: id }
              })
          }
          deleteAction().then(() => {
            resolve()
            this.refreshList()
          })
        })
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props
        const { record, system_id, project_id } = this.state
        values.user_id = record.id
        // 如果没有选择系统和项目
        if (system_id == null && project_id == null) {
          dispatch({
            type: 'user/postUser',
            payload: values
          }).then(() => {
            this.setState({ visible: false })
            this.refreshList()
          })
        } else if (system_id != null && project_id == null) {
          //如果选择了系统和没选择项目
          dispatch({
            type: 'user/postUser',
            payload: { ...values, system_id: system_id }
          }).then(() => {
            this.setState({ visible: false })
            this.refreshList()
          })
        } else {
          //如果同时选择了系统和项目
          dispatch({
            type: 'user/postUser',
            payload: { ...values, system_id: system_id, project_id: project_id }
          }).then(() => {
            this.setState({ visible: false })
            this.refreshList()
          })
        }
      }
    })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  handlePasswordCancel = (need_refresh = false) => {
    if (need_refresh) {
      this.refreshList()
    }
    this.setState({ password_visible: false })
  }

  handleAssignToProjectCancel = (need_refresh = false) => {
    if (need_refresh) {
      this.refreshList()
    }
    this.setState({ project_visible: false })
  }

  handleAssignToSystemCancel = (need_refresh = false) => {
    if (need_refresh) {
      this.refreshList()
    }
    this.setState({ assign_visible: false })
  }

  handleSetRoleCancel = (need_refresh = false) => {
    if (need_refresh) {
      this.refreshList()
    }
    this.setState({ role_visible: false })
  }

  handleConfirmBlur = e => {
    const { value } = e.target

    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (_, value, callback) => {
    const { form } = this.props

    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致！')
    } else {
      callback()
    }
  }

  validateToNextPassword = (_, value, callback) => {
    const { form } = this.props

    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  get_all_user_columns = system_list => [
    ...commonColumns,
    {
      title: '所在系统',
      dataIndex: 'system_admin',
      align: 'center',
      width: 160,
      render: system_admin => {
        if (system_admin.length === 0) {
          return <span style={{ color: '#bfbfbf' }}>无</span>
        }
        return system_admin.map((id, index) => {
          for (const system of system_list) {
            if (system.system_id === id.system_id) {
              return (
                <span key={system.system_id}>
                  {system.system_name}
                  {id.is_admin === 1 ? '：管理员' : ''}
                  {index !== system_admin.length - 1 ? '，' : ''}
                  <br />
                </span>
              )
            }
          }
          return ''
        })
      }
    },
    {
      title: '操作',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => this.handleAssignModel(record)}>
                  关联系统
                </Menu.Item>
                <Menu.Item key="2" onClick={() => this.handleEditPassword(record)}>
                  修改密码
                </Menu.Item>
                <Menu.Item key="3" onClick={() => this.handleDelete(record.id, record.account, 'all')}>
                  删除
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="primary" size="small" onClick={() => this.handleEditModel(record)}>
              编辑
              <Icon type="down" />
            </Button>
          </Dropdown>
        </>
      )
    }
  ]

  get_system_user_columns = project_list => [
    ...commonColumns,
    {
      title: '系统管理员',
      dataIndex: 'is_admin',
      align: 'center',
      width: 80,
      render: is_admin => (is_admin === 1 ? '是' : '否')
    },
    {
      title: '所在项目',
      dataIndex: 'project_ids',
      align: 'center',
      width: 160,
      render: project_ids => {
        if (project_ids.length === 0) {
          return '暂无项目'
        }
        return project_ids.map((id, index) => {
          for (const project of project_list) {
            if (project.project_id === id) {
              return (
                <span key={project.project_id}>
                  {project.project_name}
                  {index !== project_ids.length - 1 ? '，' : ''}
                </span>
              )
            }
          }
          return ''
        })
      }
    },
    {
      title: '操作',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => this.handleProjectModel(record)}>
                  关联项目
                </Menu.Item>
                <Menu.Item key="2" onClick={() => this.handleEditPassword(record)}>
                  修改密码
                </Menu.Item>
                <Menu.Item key="3" onClick={() => this.handleDelete(record.id, record.account, 'system')}>
                  删除
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="primary" size="small" onClick={() => this.handleEditModel(record)}>
              编辑
              <Icon type="down" />
            </Button>
          </Dropdown>
        </>
      )
    }
  ]

  get_project_user_columns = role_list => [
    ...commonColumns,
    {
      title: '项目角色',
      dataIndex: 'role_id',
      align: 'center',
      width: 100,
      render: role_id => {
        if (role_id === null) {
          return '暂无角色'
        }
        for (const role of role_list) {
          if (role.role_id === role_id) {
            return role.role_name
          }
        }
        return ''
      }
    },
    {
      title: '操作',
      align: 'center',
      width: 80,
      render: (_, record) => (
        <>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => this.handleRoleModel(record)}>
                  设置角色
                </Menu.Item>
                <Menu.Item key="2" onClick={() => this.handleEditPassword(record)}>
                  修改密码
                </Menu.Item>
                <Menu.Item key="3" onClick={() => this.handleDelete(record.id, record.account, 'project')}>
                  删除
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="primary" size="small" onClick={() => this.handleEditModel(record)}>
              编辑
              <Icon type="down" />
            </Button>
          </Dropdown>
        </>
      )
    }
  ]

  HandlePageChange = (page, pageSize) => {
    const { system_id, project_id } = this.state
    const { dispatch } = this.props
    if (system_id === null) {
      dispatch({
        type: 'user/fetchUsers',
        payload: { page, limit: pageSize }
      })
    } else if (system_id !== null && project_id === null) {
      dispatch({
        type: 'user/fetchSystemUsers',
        payload: { page, limit: pageSize, system_id: system_id }
      })
    } else {
      dispatch({
        type: 'user/fetchProjectUsers',
        payload: { page, limit: pageSize, project_id: project_id }
      })
    }

    this.setState({ status: { page: page, limit: pageSize } })
  }

  HandleShowSizeChange = (current, size) => {
    const { system_id, project_id } = this.state
    const { dispatch } = this.props
    if (system_id === null) {
      dispatch({
        type: 'user/fetchUsers',
        payload: { page: current, limit: size }
      })
    } else if (system_id !== null && project_id === null) {
      dispatch({
        type: 'user/fetchSystemUsers',
        payload: { page: current, limit: size, system_id: system_id }
      })
    } else {
      dispatch({
        type: 'user/fetchProjectUsers',
        payload: { page: current, limit: size, project_id: project_id }
      })
    }

    this.setState({ status: { page: current, limit: size } })
  }

  render() {
    const {
      user_list,
      system_user_list,
      project_user_list,
      role_list,
      system_list,
      project_list,
      research_centers,
      loading,
      total
    } = this.props
    const { getFieldDecorator } = this.props.form
    const {
      record,
      visible,
      assign_visible,
      system_id,
      project_id,
      project_visible,
      role_visible,
      password_visible,
      status,
      selected_research_center_id
    } = this.state
    const tableLoading =
      loading.effects['user/fetchUsers'] ||
      loading.effects['user/fetchSystemUsers'] ||
      loading.effects['user/fetchProjectUsers']
    const submitLoading = loading.effects['user/postUser']
    const researchLoading = loading.effects['global/fetchResearchCenterInfo']

    let columns, dataSource

    if (system_id === null) {
      columns = this.get_all_user_columns(system_list)
      dataSource = user_list
    } else if (system_id !== null && project_id === null) {
      columns = this.get_system_user_columns(project_list)
      dataSource = system_user_list
    } else {
      columns = this.get_project_user_columns(role_list)
      dataSource = project_user_list
    }

    return (
      <>
        <Row type="flex" justify="space-between">
          <Col>
            选择所属系统：
            <Select
              style={{ width: 150 }}
              loading={tableLoading}
              onChange={this.handleSelectSystemChange}
              value={system_id}
            >
              {[{ system_id: null, system_name: '全部' }].concat(system_list).map(system => (
                <Option key={system.system_id} value={system.system_id}>
                  {system.system_name}
                </Option>
              ))}
            </Select>
            <span style={{ marginLeft: 20 }}>选择系统下项目：</span>
            <Select
              style={{ width: 150 }}
              value={project_id}
              disabled={system_id === null}
              loading={tableLoading}
              onChange={this.handleSelectProjectChange}
            >
              {[{ project_id: null, project_name: '全部' }].concat(project_list).map(project => (
                <Option key={project.project_id} value={project.project_id}>
                  {project.project_name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <Button type="primary" onClick={() => this.handleEditModel({ id: null })}>
              添加用户
            </Button>
          </Col>
        </Row>
        <div className={styles.table_margin}>
          <Table
            loading={tableLoading}
            className="page_body"
            rowKey="id"
            size="small"
            bordered
            pagination={false}
            columns={columns}
            dataSource={dataSource}
          />
          <Pagination
            style={{ textAlign: 'center', marginTop: '10px' }}
            defaultCurrent={1}
            defaultPageSize={20}
            current={status.page}
            total={total}
            onChange={this.HandlePageChange}
            onShowSizeChange={this.HandleShowSizeChange}
            showSizeChanger
            showQuickJumper
            showTotal={total => `总共有 ${total} 条数据`}
          />
        </div>
        <Modal
          title="编辑用户"
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
            <Form.Item label="用户账号">
              {getFieldDecorator('account', {
                initialValue: record.account,
                rules: [{ required: true, message: '请填写用户名！' }]
              })(<Input placeholder="请输入用户账号" />)}
            </Form.Item>
            <Form.Item label="姓名">
              {getFieldDecorator('name', {
                initialValue: record.name,
                rules: [{ required: true, message: '请填写用户昵称！' }]
              })(<Input placeholder="请输入姓名" />)}
            </Form.Item>
            <Form.Item label="身份证号">
              {getFieldDecorator('id_card', {
                initialValue: record.id_card
              })(<Input placeholder="请输入身份证号" />)}
            </Form.Item>
            <Form.Item label="单位">
              {getFieldDecorator('department', {
                initialValue: record.department,
                rules: [{ required: true, message: '请填写单位！' }]
              })(<Input placeholder="请输入姓名" />)}
            </Form.Item>
            <Form.Item label="科室">
              {getFieldDecorator('office', {
                initialValue: record.office,
                rules: [{ required: true, message: '请填写科室！' }]
              })(<Input placeholder="请输入科室" />)}
            </Form.Item>
            <Form.Item label="中心">
              {getFieldDecorator('research_center_id', {
                initialValue: record.research_center_id,
                rules: [{ required: system_id != null && project_id != null, message: '请请选择研究中心！' }]
              })(
                <Select
                  loading={researchLoading}
                  placeholder="请选择中心"
                  disabled={project_id == null || system_id == null}
                  onChange={value => {
                    this.props.form.setFieldsValue({ research_center_ids: [value] })
                    this.setState({ selected_research_center_id: value })
                  }}
                >
                  {research_centers.map(item => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            {selected_research_center_id && record.research_center_ids ? (
              <Form.Item label="关联中心" ref={`research_center_ids`}>
                {getFieldDecorator('research_center_ids', {
                  initialValue: record.research_center_ids
                  // rules: [{ required: true, message: '关联其他中心！' }]
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="关联中心"
                    disabled={project_id == null || system_id == null}
                  >
                    {research_centers.map(item => (
                      <Select.Option
                        key={item.id}
                        value={item.id}
                        // disabled={item.id == selected_research_center_id}
                      >
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            ) : null}
            <Form.Item label="职称">
              {getFieldDecorator('title', {
                initialValue: record.title,
                rules: [{ required: true, message: '请填写职称！' }]
              })(<Input placeholder="请输入职称" />)}
            </Form.Item>
            <Form.Item label="电话">
              {getFieldDecorator('phone', {
                initialValue: record.phone
              })(<Input placeholder="请输入电话" />)}
            </Form.Item>
            <Form.Item label="邮箱">
              {getFieldDecorator('email', {
                initialValue: record.email
              })(<Input placeholder="请输入邮箱" />)}
            </Form.Item>
            <Row type="flex" justify="center">
              <Button htmlType="submit" type="primary" loading={submitLoading}>
                保存
              </Button>
            </Row>
          </Form>
        </Modal>
        <ModifyPassword
          record={record}
          visible={password_visible}
          handleCancel={this.handlePasswordCancel}
          submitLoading={submitLoading}
        />
        <DynamicAssignSystem record={record} visible={assign_visible} handleCancel={this.handleAssignToSystemCancel} />
        <DynamicAssignProject
          record={record}
          system_id={system_id}
          visible={project_visible}
          handleCancel={this.handleAssignToProjectCancel}
        />
        <AssignRole
          record={record}
          project_id={project_id}
          role_list={role_list}
          visible={role_visible}
          handleCancel={this.handleSetRoleCancel}
        />
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    user_list: state.user.user_list,
    system_user_list: state.user.system_user_list,
    project_user_list: state.user.project_user_list,
    project_list: state.auth_project.project_list,
    role_list: state.role.role_list,
    total: state.user.total,
    system_list: state.system.system_list,
    research_centers: state.global.research_centers,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(Form.create()(AuthUser))
