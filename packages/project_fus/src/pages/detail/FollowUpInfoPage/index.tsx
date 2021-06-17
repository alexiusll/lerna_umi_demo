/* eslint-disable no-console */
import { getPid } from '@/utils/location';
import React, { useEffect, useState } from 'react';
import {
  // Form,
  Button,
  // Space,
  DatePicker,
  Select,
  Popconfirm,
  Table,
  // Upload,
  // message,
  Input,
  Spin,
  Form,
} from 'antd';
import FileTable from '@/components/FileTable';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import { StateType } from './model';

const { TextArea } = Input;

interface FollowUpInfoProps {
  dispatch: Dispatch;
  follInfo?: any;
  follInfoLoading: boolean;
  location: any;
}

const fw_Options = [
  { label: '电话', value: 1 },
  { label: '门诊', value: 2 },
  { label: '住院', value: 3 },
];
const re_Options = [
  { label: 'PD-进展', value: 1 },
  { label: 'SD-稳定', value: 2 },
  { label: 'PR-部分缓解', value: 3 },
  { label: 'CR-完全缓解', value: 4 },
  { label: '术后未发现新病灶', value: 5 },
];
const ls_Options = [
  { label: '死亡', value: 1 },
  { label: '存活', value: 2 },
  { label: '失联', value: 3 },
];
const it_Options = [
  { label: 'X光', value: 1 },
  { label: '超声', value: 2 },
  { label: 'CT', value: 3 },
  { label: 'MRI', value: 4 },
  { label: 'PET/CT', value: 5 },
];

const FollowUpInfoPage: React.FC<FollowUpInfoProps> = (props) => {
  const { dispatch, follInfo, follInfoLoading } = props;
  const [pid, setPid] = useState<number>(-404);
  const [data, setData] = useState(follInfo);
  const [form] = Form.useForm();
  // const [folmet, setFolmet]=useState();

  let tmpData = data;

  // 地址发生变化时触发
  useEffect(() => {
    setPid(getPid());
    // console.log(pid);
  }, [props.location]);

  useEffect(() => {
    if (pid !== -404) {
      dispatch({
        type: 'follInfo/fetchFollInfo',
        payload: { pid },
      });
    }
    // 销毁的时候
    return () => {};
  }, [pid]);

  useEffect(() => {
    if (follInfo) {
      console.log('follinfo', follInfo);
      form.resetFields();
      setData(follInfo);
      // console.log("data", data);
      tmpData = follInfo;
    }
  }, [follInfo]);

  const onChange = (id: number, name: string, value: any) => {
    // console.log(id);
    for (let i = 0; i < tmpData.length; i += 1) {
      if (tmpData[i].id === id) {
        // eslint-disable-next-line no-nested-ternary
        tmpData[i][name] =
          name === 'date' || name === 'dieDate'
            ? value
              ? value.format('YYYY-MM-DD')
              : null
            : value;
      }
    }
  };

  const DateGrid = (dateProps: any) => {
    const { value, id, name } = dateProps;
    const [state, setState] = useState(value);

    return (
      <DatePicker
        value={state}
        onChange={(e) => {
          onChange(id, name, e);
          setState(e);
        }}
        style={{ marginTop: name === 'dieDate' ? 20 : 0 }}
        placeholder={name === 'dieDate' ? '请选择死亡日期' : '请选择日期'}
      />
    );
  };

  const SelectGrid = (selectProps: any) => {
    const { options, value, id, name, dieDate } = selectProps;
    const [state, setState] = useState(value ? Number(value) : undefined);

    const optionChange = (e: any) => {
      onChange(id, name, e);
      // console.log(e);
      setState(e);
    };

    const DieDatePicker = () => {
      if (state !== 1) {
        return null;
      }
      return (
        <DateGrid
          value={dieDate ? moment(dieDate, 'YYYY-MM-DD') : undefined}
          id={id}
          name="dieDate"
          // style={{marginTop: 20}}
        />
      );
    };

    return (
      <>
        <Select
          style={{ width: '90%' }}
          placeholder="请选择"
          value={state}
          onChange={(e: any) => optionChange(e)}
          options={options}
        />
        {name !== 'livSta' ? null : <DieDatePicker />}
      </>
    );
  };

  const handleDelete = (id: any) => {
    dispatch({
      type: 'follInfo/deleteFollInfo',
      payload: { pid, f_id: id },
    });
  };

  const handleAdd = () => {
    const newData = data?.map((item: any) => ({ ...item })) || [];
    newData.push({
      date: undefined,
      folMet: undefined,
      effEva: undefined,
      livSta: undefined,
      imaFilType: undefined,
      savFilPath: undefined,
      remarks: undefined,
    });
    // console.log(newData);
    dispatch({
      type: 'follInfo/modifyFollInfo',
      payload: { pid, body: { data: newData } },
    });
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      width: 80,
      render: (text: any, record: any, index: any) => {
        // console.log(record);
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '随访日期',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      width: 175,
      render: (text: any, record: any) => {
        return (
          <DateGrid
            value={record.date ? moment(record.date, 'YYYY-MM-DD') : undefined}
            id={record.id}
            name="date"
          />
        );
      },
    },
    {
      title: '随访方式',
      dataIndex: 'folMet',
      key: 'folMet',
      align: 'center',
      width: 175,
      render: (text: any, record: any) => {
        // console.log('record.folMet', record.folMet);
        return (
          <SelectGrid
            options={fw_Options}
            value={record.folMet ? record.folMet : null}
            id={record.id}
            name="folMet"
          />
        );
      },
    },
    {
      title: '疗效评估',
      dataIndex: 'effEva',
      key: 'effEva',
      align: 'center',
      width: 175,
      render: (text: any, record: any) => (
        <SelectGrid
          options={re_Options}
          value={record.effEva ? record.effEva : undefined}
          id={record.id}
          name="effEva"
        />
      ),
    },
    {
      title: '生存状态',
      dataIndex: 'livSta',
      key: 'livSta',
      align: 'center',
      width: 175,
      render: (text: any, record: any) => (
        <>
          <SelectGrid
            value={record.livSta ? record.livSta : undefined}
            options={ls_Options}
            id={record.id}
            name="livSta"
            dieDate={record.dieDate}
          />
        </>
      ),
    },
    {
      title: '影像类型',
      dataIndex: 'imaFilType',
      key: 'imaFilType',
      align: 'center',
      width: 175,
      render: (text: any, record: any) => (
        <SelectGrid
          options={it_Options}
          value={record.imaFilType ? record.imaFilType : undefined}
          id={record.id}
          name="imaFilType"
        />
      ),
    },
    {
      title: '影像',
      dataIndex: 'savFilPath',
      key: 'savFilPath',
      align: 'center',
      width: 175,
      render: (text: any, record: any) => <FileTable pid={pid} folder="follInfo" id={record.id} />,
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      align: 'center',
      width: 190,
      render: (text: any, record: any) => (
        <TextArea
          value={record.remarks ? record.remarks : undefined}
          onInput={(e) => {
            onChange(record.id, 'remarks', e.target.value);
          }}
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 80,
      render: (text: any, record: any) =>
        data.length >= 1 ? (
          <span>
            <Popconfirm title="确认删除（不可恢复）？" onConfirm={() => handleDelete(record.id)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        ) : null,
    },
  ];

  // 地址发生变化时触发
  // useEffect(() => {
  //   setPid(getPid());
  // }, [props.location]);
  // console.log('data', data);

  return (
    <Spin spinning={follInfoLoading}>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 20, marginLeft: 30 }}>
        添加
      </Button>

      <Table
        // rowClassName={() => 'editable-row'}
        bordered
        dataSource={data}
        columns={columns}
        scroll={{ x: '1400px' }}
        style={{ marginLeft: 30 }}
      />

      <Button
        type="primary"
        style={{ marginLeft: 30 }}
        onClick={() => {
          console.log(tmpData);
          dispatch({
            type: 'follInfo/modifyFollInfo',
            payload: { pid, body: { data: tmpData } },
          });
        }}
      >
        保存
      </Button>
    </Spin>
  );
};

const mapStateToProps = ({
  follInfo,
  loading,
}: {
  follInfo: StateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  console.log('follInfo', follInfo);
  return {
    follInfo: follInfo.foll_info,
    follInfoLoading: loading.effects['follInfo/fetchFollInfo'],
  };
};

export default connect(mapStateToProps)(FollowUpInfoPage);
