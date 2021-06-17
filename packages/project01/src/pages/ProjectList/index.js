import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Table, Button, Tooltip, Popover, Icon, Modal } from 'antd';
import styles from './style.css';
import { history } from 'umi';
// import router from 'umi/router'
// import { post_prefix } from '@/utils/request'
// import { CurrentPath } from '@/utils/request'
import Cookies from 'js-cookie';
import Android_app from '@/assets/Android_app.png';

const p1_url = API_URL;
const p2_url = P2_API_URL;
const p3_url = P3_API_URL + '/v1';

const content = (project_id) => {
  // console.log('project_id', project_id)
  return (
    <div style={{ margin: 0 }}>
      {/* <img src={Android_app} alt="Android_app" /> */}
      <p>
        <span style={{ display: 'inline-block', width: '54px' }}>安卓版:</span>
        <a
          onClick={() => {
            Modal.info({
              icon: null,
              maskClosable: true,
              okText: '关闭',
              content:
                App_download_list[project_id].Android !== null ? (
                  <div style={{ textAlign: 'center' }}>
                    <img
                      style={{ maxWidth: 240, display: 'block', margin: 'auto', marginBottom: 12 }}
                      src={App_download_list[project_id].Android.Android_app}
                      alt="Android_app"
                    />
                    <span style={{ fontSize: 16 }}>扫码下载手机客户端</span>
                  </div>
                ) : (
                  <span style={{ fontSize: 16 }}>暂无</span>
                ),
            });
          }}
        >
          下载
        </a>
      </p>
      <p style={{ marginBottom: 0 }}>
        <span style={{ display: 'inline-block', width: '54px' }}>IOS版:</span>
        <a
          onClick={() => {
            Modal.info({
              icon: null,
              maskClosable: true,
              okText: '关闭',
              content:
                App_download_list[project_id].ios !== null ? (
                  <span style={{ fontSize: 16 }}>{App_download_list[project_id].ios}</span>
                ) : (
                  <span style={{ fontSize: 16 }}>暂无</span>
                ),
            });
          }}
        >
          下载
        </a>
      </p>
    </div>
  );
};

const App_download_list = {
  1: { ios: '在app store 下载', Android: { Android_app } },
  2: { ios: '在app store 下载', Android: null },
  3: { ios: '在app store 下载', Android: null },
};

class ProjectList extends React.Component {
  state = {
    project_state: {
      1: { now: null, total: null },
      2: { now: null, total: null },
      3: { now: null, total: null },
    },
  };

  static propTypes = {
    project_list: PropTypes.array.isRequired,
    project_process: PropTypes.object.isRequired,
    tokens: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'project/fetchProjectList',
      payload: { system_id: 1 },
    });

    dispatch({
      type: 'project/fetchProjectProcess',
      payload: { project_id: 1, url: p1_url },
    });

    dispatch({
      type: 'project/fetchProjectProcess',
      payload: { project_id: 2, url: p2_url },
    });

    dispatch({
      type: 'project/fetchProjectProcess',
      payload: { project_id: 3, url: p3_url },
    });
  }

  columns = [
    {
      title: '编号',
      dataIndex: 'project_ids',
      align: 'center',
      width: 100,
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: '研究名称',
      dataIndex: 'project_des',
      align: 'center',
      width: 150,
      render: (text) => (
        <Tooltip title={text}>
          <span>{text.length > 30 ? `${text.slice(0, 30)}...` : text}</span>
        </Tooltip>
      ),
    },
    {
      title: '负责单位',
      dataIndex: 'research_center_name',
      align: 'center',
      width: 110,
      render: (text) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: '负责人',
      dataIndex: 'principal',
      align: 'center',
      width: 60,
      render: (text) => (
        <Tooltip title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: '电话',
      dataIndex: 'phone',
      align: 'center',
      width: 110,
    },
    {
      title: '研究方案',
      dataIndex: 'link',
      align: 'center',
      width: 80,
      render: (_, record) => {
        if (record.project_id == 1) return <a href={`${p1_url}/research_scheme`}>点击下载</a>;
        // else if (record.project_id == 2) return <a href={`${p2_url}/research_scheme`}>点击下载</a>
      },
    },
    {
      title: '当前进度',
      dataIndex: 'now',
      align: 'center',
      width: 50,
      render: (_, record) => {
        const now = this.props.project_process[record.project_id]
          ? this.props.project_process[record.project_id].now
          : null;
        return <span>{now}</span>;
      },
    },
    {
      title: '项目容量',
      dataIndex: 'total',
      align: 'center',
      width: 100,
      render: (_, record) => {
        const total = this.props.project_process[record.project_id]
          ? this.props.project_process[record.project_id].total
          : null;
        return <span>{total}</span>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 100,
      render: (text) => (
        <Tooltip title={'在研'}>
          <span>在研</span>
        </Tooltip>
      ),
    },
    {
      title: '备注',
      dataIndex: 'ps',
      align: 'center',
      width: 100,
      render: (_, record) => (
        // <Tooltip title={text}>
        //   <span>{text}</span>
        // </Tooltip>

        // <Popover content={content(record.project_id)} placement="bottom">
        //   <a onClick={e => e.preventDefault()}>
        //     <Icon type="mobile" />
        //     下载APP
        //   </a>
        // </Popover>

        <span></span>
      ),
    },
    {
      title: '操作',
      align: 'center',
      width: 60,
      render: (_, record) => (
        <Button type="primary" size="small">
          <a
            // href={`/p${record.project_id}/#/`}
            onClick={async () => {
              // cookies 保存7天
              // await Cookies.set(`token_` + record.project_id, this.props.tokens[1][record.project_id], {
              //   expires: 7,
              //   path: '/',
              //   domain: window.location.hostname
              // })
              // window.location.href = `http://27.17.30.150:300${record.project_id}/#/`
              // router.push('/')

              switch (record.project_id) {
                case 1:
                  window.location.href = P1_HREF;
                  break;
                case 2:
                  window.location.href = P2_HREF;
                  break;
                case 3:
                  window.location.href = P3_HREF;
                  break;
                default:
                  break;
              }
            }}
          >
            详情
          </a>
        </Button>
      ),
    },
  ];

  render() {
    const { project_list, tokens } = this.props;
    const tableLoading = this.props.loading.effects['project/fetchProjectList'];
    // console.log('project_process', project_process)
    // console.log('project_list', project_list)
    let user_project_list = [];
    // console.log('tokens', tokens)
    for (const index in project_list) {
      const id = project_list[index].project_id;
      if (Cookies.get(`token_${id}`)) {
        //加入这个元素
        user_project_list.push(project_list[index]);
      }
    }
    // console.log('user_project_list', user_project_list)

    return (
      <>
        <div
          style={{
            padding: '1rem',
            // marginBottom: '1rem',
            border: '1px solid #f0f0f0',
          }}
        >
          <Button type="primary" style={{ marginLeft: 0 }}>
            <a href="/#/applications">返回</a>
          </Button>
          <div style={{ display: 'inline-block', marginLeft: '1rem' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>临床试验项目</span>
          </div>
        </div>
        <Table
          loading={tableLoading}
          className={`${styles.project_table} page_body`}
          rowKey="project_id"
          size="small"
          bordered
          pagination={false}
          scroll={{ x: true }}
          columns={this.columns}
          dataSource={user_project_list}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    project_process: state.project.project_process,
    project_list: state.project.project_list,
    tokens: state.login.tokens,
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(ProjectList);
// export default ProjectList
