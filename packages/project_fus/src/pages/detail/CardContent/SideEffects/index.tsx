/* eslint-disable no-console */
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
} from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import { StateType } from './model';
import style from '../OtherExam/form/form.less';
import { options } from './optionsData';

interface SideEffectsContentProps {
  dispatch: Dispatch;
  sideEffect?: any;
  sideEffectLoading: boolean;
  pid: number;
  treNum: number;
}

const SideEffectsContent: React.FC<SideEffectsContentProps> = (props) => {
  const { pid, treNum, dispatch, sideEffect, sideEffectLoading } = props;
  const [data, setData] = useState(sideEffect);

  let tmpData = data;

  useEffect(() => {
    dispatch({
      type: 'sideEffect/fetchSideEffect',
      payload: { pid, treNum },
    });
    // 销毁的时候
    return () => {};
  }, [pid]);

  useEffect(() => {
    if (sideEffect) {
      // console.log("sideEffect", sideEffect);
      const _sideEffect = sideEffect;
      for (let i = 0; i < _sideEffect.length; i += 1) {
        _sideEffect[i].key = i + 1;
      }
      // console.log(_sideEffect);
      setData(_sideEffect);
      tmpData = sideEffect;
      for (let i = 0; i < tmpData.length; i += 1) {
        tmpData[i].begDate = tmpData[i].begDate ? moment(tmpData[i].begDate) : null;
        tmpData[i].endDate = tmpData[i].endDate ? moment(tmpData[i].endDate) : null;
      }
    }
  }, [sideEffect]);

  const newMember = () => {
    console.log('data', data);
    const newData = data?.map((item: any) => ({ ...item })) || [];
    newData.push({
      sidReaName: null,
      sidRecCla: null,
      begDate: null,
      isExe: null,
      treatment: null,
      endDate: null,
    });
    for (let i = 0; i < newData.length; i += 1) {
      // newData[i].sidReaName = newData[i].sidReaName ? newData[i].sidReaName.split('_') : null;
      newData[i].begDate = newData[i].begDate ? newData[i].begDate.format('YYYY-MM-DD') : null;
      newData[i].endDate = newData[i].endDate ? newData[i].endDate.format('YYYY-MM-DD') : null;
    }
    console.log('newData', newData);
    dispatch({
      type: 'sideEffect/modifySideEffect',
      payload: { pid, treNum, body: { data: newData } },
    });
  };

  const remove = (key: any) => {
    dispatch({
      type: 'sideEffect/deleteSideEffect',
      payload: { pid, treNum, se_id: key },
    });
  };

  const SideEffectsCol = (colProps: { colData: any }) => {
    const { colData } = colProps;
    const [form] = Form.useForm();
    const [endUse, setEndUse] = useState(colData.isExe);
    const [isOther, setIsOther] = useState(false);

    useEffect(() => {
      // console.log(colData);
      if (colData) {
        // console.log(colData);
        if (colData.sidReaName === '其他副作用_其他' || colData.sidReaName === '骨髓抑制_其他') {
          setIsOther(true);
        }
        form.setFieldsValue({
          ...colData,
          sidReaName: colData.sidReaName ? colData.sidReaName.split('_') : null,
          begDate: colData.begDate ? moment(colData.begDate) : null,
          endDate: colData.endDate ? moment(colData.endDate) : null,
        });
      } else {
        form.resetFields();
      }
    }, [colData]);

    const confirm = () => {
      remove(colData.id);
    };

    const onFieldsChange = (e: any, allValues: [{ name: any; value: any }]) => {
      const newColData = {};
      console.log('onFieldsChange', allValues);
      for (let i = 0; i < allValues.length; i += 1) {
        newColData[allValues[i].name[0]] = allValues[i].value;
        if (allValues[i].name[0] === 'sidReaName') {
          if (allValues[i].value) {
            newColData[allValues[i].name[0]] = `${allValues[i].value[0]}_${allValues[i].value[1]}`;
          }
        }
      }
      if (colData.id) {
        newColData.id = colData.id;
      }
      // console.log(newColData)
      tmpData = tmpData.map((item: any) => {
        return item.id === newColData.id ? newColData : item;
      });
    };

    const displayRender = (label: any) => {
      if (label[0] === '骨髓抑制') {
        return '骨髓抑制';
      }
      return label[label.length - 1];
    };

    const grade_ops = [
      { value: 1, label: 1 },
      { value: 2, label: 2 },
      { value: 3, label: 3 },
      { value: 4, label: 4 },
    ];

    return (
      <Form
        form={form}
        onFieldsChange={(e, all: any) => {
          onFieldsChange(e, all);
        }}
      >
        <table className={style.row}>
          <tbody>
            <tr style={{ minHeight: '3rem' }}>
              <td style={{ width: '5.0%' }} className={style.grid}>
                {colData.key}
              </td>
              <td style={{ width: '14.0%' }} className={style.grid}>
                <Form.Item name="sidReaName" style={{ marginBottom: 0 }}>
                  <Cascader
                    placeholder="请选择"
                    style={{ width: '92%' }}
                    options={options}
                    expandTrigger="hover"
                    displayRender={displayRender}
                    onChange={(e: any) => {
                      // console.log("cascader Change", e);
                      if (e[1] === '其他') {
                        setIsOther(true);
                      } else {
                        setIsOther(false);
                      }
                    }}
                    // defaultValue={(record['sidReaName'] || '').split(',')}
                  />
                </Form.Item>
                {isOther ? (
                  <Form.Item name="sidReaNameOther" style={{ marginTop: 10, marginBottom: 0 }}>
                    <Input style={{ width: '92%' }} placeholder="请填写具体症状描述" />
                  </Form.Item>
                ) : null}
              </td>
              <td style={{ width: '9.0%' }} className={style.grid}>
                <Form.Item name="sidRecCla" style={{ marginBottom: 0 }}>
                  <Select
                    // defaultValue={record['sidRecCla']}
                    options={grade_ops}
                    style={{ width: '80%' }}
                  />
                </Form.Item>
              </td>
              <td style={{ width: '14.0%' }} className={style.grid}>
                <Form.Item name="begDate" style={{ marginBottom: 0 }}>
                  <DatePicker />
                </Form.Item>
              </td>
              <td style={{ width: '14.0%' }} className={style.grid}>
                <Form.Item name="isExe" style={{ marginBottom: 0 }}>
                  <Radio.Group
                    onChange={(e: any) => {
                      setEndUse(e.target.value);
                    }}
                  >
                    <Radio value={0}>否</Radio>
                    <Radio value={1}>是</Radio>
                  </Radio.Group>
                </Form.Item>
              </td>
              <td style={{ width: '14.0%' }} className={style.grid}>
                <Form.Item name="endDate" style={{ marginBottom: 0 }}>
                  <DatePicker disabled={endUse} />
                </Form.Item>
              </td>
              <td style={{ width: '14.0%' }} className={style.grid}>
                <Form.Item name="treatment" style={{ marginBottom: 0 }}>
                  <Input style={{ width: '92%' }} />
                </Form.Item>
              </td>
              <td style={{ width: '14.0%' }} className={style.grid}>
                <Popconfirm
                  title="确认删除?"
                  onConfirm={confirm}
                  // onCancel={cancel}
                  okText="确认"
                  cancelText="取消"
                >
                  <a href="#">删除</a>
                </Popconfirm>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    );
  };

  const save = () => {
    if (tmpData) {
      for (let i = 0; i < tmpData.length; i += 1) {
        tmpData[i].begDate = tmpData[i].begDate
          ? tmpData[i].begDate.format('YYYY-MM-DD')
          : undefined;
        tmpData[i].endDate = tmpData[i].endDate
          ? tmpData[i].endDate.format('YYYY-MM-DD')
          : undefined;
      }
    }
    console.log(tmpData);
    dispatch({
      type: 'sideEffect/modifySideEffect',
      payload: { pid, treNum, body: { data: tmpData } },
    });
  };

  return (
    <Spin spinning={sideEffectLoading}>
      <div style={{ float: 'left', marginBottom: 0, height: 50 }}>
        <Button type="primary" onClick={newMember}>
          添加
        </Button>
        <Alert
          message="注意添加下一条之前先保存上一条。"
          type="info"
          showIcon
          style={{ marginLeft: 100, marginTop: -35 }}
        />
      </div>
      <table
        style={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          border: '1px solid #dfe6e9',
          marginTop: 20,
        }}
      >
        <tbody>
          <tr style={{ height: '47px', backgroundColor: '#BCE7F2' }}>
            <th style={{ width: '5.0%' }} className={style.tHead}>
              序号
            </th>
            <th style={{ width: '14.0%' }} className={style.tHead}>
              症状描述
            </th>
            <th style={{ width: '9.0%' }} className={style.tHead}>
              分级
            </th>
            <th style={{ width: '14.0%' }} className={style.tHead}>
              开始日期
            </th>
            <th style={{ width: '14.0%' }} className={style.tHead}>
              目前是否存在
            </th>
            <th style={{ width: '14.0%' }} className={style.tHead}>
              结束日期
            </th>
            <th style={{ width: '14.0%' }} className={style.tHead}>
              治疗情况
            </th>
            <th style={{ width: '14.0%' }} className={style.tHead}>
              常用操作
            </th>
          </tr>
        </tbody>
      </table>
      <div>
        {data?.map((item: any) => {
          // console.log(item);
          return item !== undefined ? <SideEffectsCol colData={item} /> : null;
        })}
        <Button type="primary" style={{ marginTop: 20 }} onClick={save}>
          保存
        </Button>
      </div>
    </Spin>
  );
};

const mapStateToProps = ({
  sideEffect,
  loading,
}: {
  sideEffect: StateType;
  loading: { effects: Record<string, boolean> };
}) => {
  console.log('sideEffect', sideEffect);
  return {
    sideEffect: sideEffect.side_effect,
    sideEffectLoading: loading.effects['sideEffect/fetchSideEffect'],
  };
};

export default connect(mapStateToProps)(SideEffectsContent);
