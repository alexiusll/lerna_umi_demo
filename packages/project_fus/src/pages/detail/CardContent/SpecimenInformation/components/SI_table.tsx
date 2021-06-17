/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-03-26 15:33:42
 */

import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Radio,
  Popconfirm,
  Cascader,
  Select,
  Spin,
  Alert,
  Table,
  Space,
  Modal,
} from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';

import SiModal from './SI_Modal';

interface SiTableProps {
  fetchData: (current?: number, pageSize?: number) => Promise<unknown>;
  DeleteData: (ids: number[]) => Promise<unknown>;
  AddData: (values: any) => Promise<unknown>;
}

const SiTable: React.FC<SiTableProps> = (props) => {
  const { fetchData, DeleteData, AddData } = props;

  const [data, setData] = useState();

  const [pageSetting, setPageSetting] = useState({ current: 1, pageSize: 10 });

  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<any>({});

  const refresh = () => {
    setLoading(true);
    fetchData().then((_data: any) => {
      console.log('data', _data);
      if (_data) {
        setData(_data);
        setLoading(false);
      }
    });
  };

  const columns = [
    {
      title: '样本编号',
      dataIndex: 'number',
      width: 100,
      align: 'center',
    },
    {
      title: '样本类型',
      dataIndex: 'type',
      width: 160,
      align: 'center',
      render: (text: any) => {
        // 如果为字符串，将它转换
        if (text && typeof text === 'string') {
          text = JSON.parse(text);
        }

        if (text && text.radio && text.radio[0]) {
          return `${text.radio[0]}${text.other ? `---${text.other}` : ''}`;
        }

        return '';
      },
    },
    {
      title: '样本数量',
      dataIndex: 'amount',
      width: 100,
      align: 'center',
    },
    {
      title: '取样时间',
      dataIndex: 'samplingTime',
      width: 120,
      align: 'center',
    },
    {
      title: '样本储存位置',
      dataIndex: 'storeSite',
      ellipsis: true,
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'note',
      align: 'center',
    },
    {
      title: '操作',
      width: 140,
      align: 'center',
      render: (text: any, record: any) => (
        <Space size="small">
          <a
            className="custom_toolbar_buttom"
            onClick={() => {
              setCurrentRecord(record);
              setModalVisible(true);
            }}
          >
            查看
          </a>
          <Popconfirm
            title="确认要删除这一条记录?"
            onConfirm={() => {
              DeleteData([record.id]).then(() => {
                refresh();
              });
            }}
            okText="是"
            cancelText="否"
          >
            <a className="custom_toolbar_buttom_danger">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 初始化
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey="id"
        title={() => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ display: 'block' }}>标本信息</span>
            <Button
              type="primary"
              onClick={() => {
                setCurrentRecord(null);
                setModalVisible(true);
              }}
            >
              新增
            </Button>
          </div>
        )}
        bordered
        pagination={{ position: ['bottomCenter'], pageSize: 10 }}
      />

      <SiModal
        visible={modalVisible}
        record={currentRecord}
        AddData={AddData}
        onCancel={() => {
          setModalVisible(false);
        }}
        refresh={refresh}
      />
    </>
  );
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(SiTable);
