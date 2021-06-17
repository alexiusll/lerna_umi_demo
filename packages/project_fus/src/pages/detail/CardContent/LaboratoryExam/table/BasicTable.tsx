/* eslint-disable no-console */
/*
 * @Descripttion:
 * @Author: hlgdb
 * @Date: 2020-09-17 22:02:18
 */

import { Button, DatePicker, Form, Input, InputNumber, Radio, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import FileTable from '@/components/FileTable';
import moment, { Moment } from 'moment';
import { RedoOutlined } from '@ant-design/icons';
import { StateType } from './model';
import style from './table.css';
// import { BloodRoutineDataType } from '../data';

interface BasicTableContentProps {
  dispatch: Dispatch;
  LabExamData: any;
  BloodRoutineLoading: boolean;
  BloodBioLoading: boolean;
  ThyroidLoading: boolean;
  CoagulationLoading: boolean;
  MyocardialEnzymeLoading: boolean;
  CytokinesLoading: boolean;
  LymSubsetsLoading: boolean;
  UrineRoutineLoading: boolean;
  TumorMarkerLoading: boolean;
  pid: number;
  treNum: number;
  title: string;
  para: object;
}

const { TextArea } = Input;

const BasicTableContent: React.FC<BasicTableContentProps> = (props) => {
  const {
    pid,
    treNum,
    title,
    para,
    dispatch,
    LabExamData,
    BloodRoutineLoading,
    BloodBioLoading,
    ThyroidLoading,
    CoagulationLoading,
    MyocardialEnzymeLoading,
    CytokinesLoading,
    LymSubsetsLoading,
    UrineRoutineLoading,
    TumorMarkerLoading,
  } = props;
  const [form] = Form.useForm();
  const [id, setId] = useState(undefined);
  const [folder, setFolder] = useState('');
  const [loading, setLoading] = useState(false);

  // const [samplingTime, setSamplingTime] = useState<Moment | null>(null);

  const IsNormalRadios = (radioProps: any) => {
    const { name } = radioProps;
    const [state, setState] = useState<null | number>(null);
    const [state1, setState1] = useState<null | number>(null);

    useEffect(() => {
      if (pid !== -404) {
        switch (title) {
          case '血常规':
            if (LabExamData.bloodRoutine) {
              if (LabExamData.bloodRoutine[name] || LabExamData.bloodRoutine[name] === 0) {
                if (LabExamData.bloodRoutine[name] === -1) {
                  setState1(-1);
                  setState(null);
                } else if (LabExamData.bloodRoutine[name] === 0) {
                  setState1(0);
                } else {
                  setState(LabExamData.bloodRoutine[name]);
                  setState1(-1);
                }
              }
            }
            break;
          case '血生化':
            if (LabExamData.bloodBio) {
              if (LabExamData.bloodBio[name] || LabExamData.bloodBio[name] === 0) {
                if (LabExamData.bloodBio[name] === -1) {
                  setState1(-1);
                  setState(null);
                } else if (LabExamData.bloodBio[name] === 0) {
                  setState1(0);
                } else {
                  setState(LabExamData.bloodBio[name]);
                  setState1(-1);
                }
              }
            }
            break;
          case '甲状腺功能':
            if (LabExamData.thyroid) {
              if (LabExamData.thyroid[name] || LabExamData.thyroid[name] === 0) {
                if (LabExamData.thyroid[name] === -1) {
                  setState1(-1);
                  setState(null);
                } else if (LabExamData.thyroid[name] === 0) {
                  setState1(0);
                } else {
                  setState(LabExamData.thyroid[name]);
                  setState1(-1);
                }
              }
            }
            break;
          case '凝血功能':
            if (LabExamData.coagulation) {
              if (LabExamData.coagulation[name] || LabExamData.coagulation[name] === 0) {
                if (LabExamData.coagulation[name] === -1) {
                  setState1(-1);
                  setState(null);
                } else if (LabExamData.coagulation[name] === 0) {
                  setState1(0);
                } else {
                  setState(LabExamData.coagulation[name]);
                  setState1(-1);
                }
              }
            }
            break;
          case '心肌酶谱':
            if (LabExamData.myocardialEnzyme) {
              if (LabExamData.myocardialEnzyme[name] || LabExamData.myocardialEnzyme[name] === 0) {
                if (LabExamData.myocardialEnzyme[name] === -1) {
                  setState1(-1);
                  setState(null);
                } else if (LabExamData.myocardialEnzyme[name] === 0) {
                  setState1(0);
                } else {
                  setState(LabExamData.myocardialEnzyme[name]);
                  setState1(-1);
                }
              }
            }
            break;
          case '细胞因子':
            if (LabExamData.cytokines) {
              if (LabExamData.cytokines[name] || LabExamData.cytokines[name] === 0) {
                if (LabExamData.cytokines[name] === -1) {
                  setState1(-1);
                  setState(null);
                } else if (LabExamData.cytokines[name] === 0) {
                  setState1(0);
                } else {
                  setState(LabExamData.cytokines[name]);
                  setState1(-1);
                }
              }
            }
            break;
          case '淋巴细胞亚群':
            if (LabExamData.lymSubsets) {
              if (LabExamData.lymSubsets[name] || LabExamData.lymSubsets[name] === 0) {
                if (LabExamData.lymSubsets[name] === -1) {
                  setState1(-1);
                  setState(null);
                } else if (LabExamData.lymSubsets[name] === 0) {
                  setState1(0);
                } else {
                  setState(LabExamData.lymSubsets[name]);
                  setState1(-1);
                }
              }
            }
            break;
          case '尿常规':
            if (LabExamData.urine_routine) {
              if (LabExamData.urine_routine[name] || LabExamData.urine_routine[name] === 0) {
                if (LabExamData.urine_routine[name] === -1) {
                  setState1(-1);
                  setState(null);
                } else if (LabExamData.urine_routine[name] === 0) {
                  setState1(0);
                } else {
                  setState(LabExamData.urine_routine[name]);
                  setState1(-1);
                }
              }
            }
            break;
          case '肿瘤标志物':
            if (LabExamData.tumor_marker) {
              if (LabExamData.tumor_marker[name] || LabExamData.tumor_marker[name] === 0) {
                if (LabExamData.tumor_marker[name] === -1) {
                  setState1(-1);
                  setState(null);
                } else if (LabExamData.tumor_marker[name] === 0) {
                  setState1(0);
                } else {
                  setState(LabExamData.tumor_marker[name]);
                  setState1(-1);
                }
              }
            }
            break;
          default:
        }
      }
    }, [LabExamData, title]);

    const onChange = (e: any) => {
      setState(e.target.value);
    };

    const onChange1 = (e: any) => {
      setState1(e.target.value);
      // if (e.target.value === 0) {
      //   form.setFieldsValue({ [name]: 0 });
      //   console.log('form', form.getFieldsValue());
      // }
      form.setFieldsValue({ [name]: e.target.value });
    };

    return (
      <div>
        <Radio.Group
          onChange={onChange1}
          value={state1}
          style={{ marginTop: state1 === -1 ? 0 : '12%' }}
        >
          <Radio value={0}>正常</Radio>
          <Radio value={-1}>异常</Radio>
          <Button
            style={{ marginRight: '8px', borderRadius: '50%' }}
            size="small"
            shape="circle"
            onClick={() => {
              form.setFieldsValue({ [name]: null });
              setState(null);
              setState1(null);
            }}
          >
            <RedoOutlined />
          </Button>
        </Radio.Group>
        <Form.Item name={name} style={{ marginBottom: 0 }}>
          <Radio.Group
            style={{ display: state1 === -1 ? 'block' : 'none', marginTop: 10 }}
            onChange={onChange}
            value={state}
          >
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
            <Radio value={4}>4</Radio>
            <Radio value={5}>5</Radio>
          </Radio.Group>
        </Form.Item>
      </div>
    );
  };

  const onFinish = (values: any) => {
    // console.log('values', values);
    values.samplingTime = values.samplingTime ? values.samplingTime.format('YYYY-MM-DD') : null;
    switch (title) {
      case '血常规':
        if (LabExamData.bloodRoutine.id !== -404) {
          values.id = LabExamData.bloodRoutine.id;
        }
        console.log('post', values);
        dispatch({
          type: 'laboratoryExam/modifyBloodRoutine',
          payload: {
            pid,
            treNum,
            body: values,
          },
        });
        break;
      case '血生化':
        if (LabExamData.bloodBio.id !== -404) {
          values.id = LabExamData.bloodBio.id;
        }
        dispatch({
          type: 'laboratoryExam/modifyBloodBio',
          payload: {
            pid,
            treNum,
            body: values,
          },
        });
        break;
      case '甲状腺功能':
        if (LabExamData.thyroid.id !== -404) {
          values.id = LabExamData.thyroid.id;
        }
        dispatch({
          type: 'laboratoryExam/modifyThyroid',
          payload: {
            pid,
            treNum,
            body: values,
          },
        });
        break;
      case '凝血功能':
        if (LabExamData.coagulation.id !== -404) {
          values.id = LabExamData.coagulation.id;
        }
        dispatch({
          type: 'laboratoryExam/modifyCoagulation',
          payload: {
            pid,
            treNum,
            body: values,
          },
        });
        break;
      case '心肌酶谱':
        if (LabExamData.myocardialEnzyme.id !== -404) {
          values.id = LabExamData.myocardialEnzyme.id;
        }
        dispatch({
          type: 'laboratoryExam/modifyMyocardialEnzyme',
          payload: {
            pid,
            treNum,
            body: values,
          },
        });
        break;
      case '细胞因子':
        if (LabExamData.cytokines.id !== -404) {
          values.id = LabExamData.cytokines.id;
        }
        dispatch({
          type: 'laboratoryExam/modifyCytokines',
          payload: {
            pid,
            treNum,
            body: values,
          },
        });
        break;
      case '淋巴细胞亚群':
        if (LabExamData.lymSubsets.id !== -404) {
          values.id = LabExamData.lymSubsets.id;
        }
        dispatch({
          type: 'laboratoryExam/modifyLymSubsets',
          payload: {
            pid,
            treNum,
            body: values,
          },
        });
        break;
      case '尿常规':
        if (LabExamData.urine_routine.id !== -404) {
          values.id = LabExamData.urine_routine.id;
        }
        dispatch({
          type: 'laboratoryExam/modifyUrineRoutine',
          payload: {
            pid,
            treNum,
            body: values,
          },
        });
        break;
      case '肿瘤标志物':
        if (LabExamData.tumor_marker.id !== -404) {
          values.id = LabExamData.tumor_marker.id;
        }
        dispatch({
          type: 'laboratoryExam/modifyTumorMarker',
          payload: {
            pid,
            treNum,
            body: values,
          },
        });
        break;
      default:
    }
  };

  // useEffect的第二个参数是，useEffect会在这个参数数组中包含的参数发生变化时调用
  useEffect(() => {
    if (pid !== -404) {
      switch (title) {
        case '血常规':
          dispatch({
            type: 'laboratoryExam/fetchBloodRoutine',
            payload: { pid, treNum },
          });
          break;
        case '血生化':
          dispatch({
            type: 'laboratoryExam/fetchBloodBio',
            payload: { pid, treNum },
          });
          break;
        case '甲状腺功能':
          dispatch({
            type: 'laboratoryExam/fetchThyroid',
            payload: { pid, treNum },
          });
          break;
        case '凝血功能':
          dispatch({
            type: 'laboratoryExam/fetchCoagulation',
            payload: { pid, treNum },
          });
          break;
        case '心肌酶谱':
          dispatch({
            type: 'laboratoryExam/fetchMyocardialEnzyme',
            payload: { pid, treNum },
          });
          break;
        case '细胞因子':
          dispatch({
            type: 'laboratoryExam/fetchCytokines',
            payload: { pid, treNum },
          });
          break;
        case '淋巴细胞亚群':
          dispatch({
            type: 'laboratoryExam/fetchLymSubsets',
            payload: { pid, treNum },
          });
          break;
        case '尿常规':
          dispatch({
            type: 'laboratoryExam/fetchUrineRoutine',
            payload: { pid, treNum },
          });
          break;
        case '肿瘤标志物':
          dispatch({
            type: 'laboratoryExam/fetchTumorMarker',
            payload: { pid, treNum },
          });
          break;
        default:
      }
    }
    // 销毁的时候
    return () => {};
  }, [pid, treNum, title]);

  useEffect(() => {
    // console.log(id);
    switch (title) {
      case '血常规':
        if (LabExamData.bloodRoutine) {
          if (LabExamData.bloodRoutine.id !== -404) {
            form.setFieldsValue({
              ...LabExamData.bloodRoutine,
              samplingTime: LabExamData.bloodRoutine.samplingTime
                ? moment(LabExamData.bloodRoutine.samplingTime)
                : null,
            });
            if (LabExamData.bloodRoutine.id >= 0) {
              setId(LabExamData.bloodRoutine.id);
              setFolder('blood_routine');
            }
          } else {
            form.resetFields();
            dispatch({
              type: 'laboratoryExam/modifyBloodRoutine',
              payload: {
                pid,
                treNum,
                body: {},
              },
            });
          }
        }
        break;
      case '血生化':
        if (LabExamData.bloodBio) {
          if (LabExamData.bloodBio.id !== -404) {
            form.setFieldsValue({
              ...LabExamData.bloodBio,
              samplingTime: LabExamData.bloodBio.samplingTime
                ? moment(LabExamData.bloodBio.samplingTime)
                : null,
            });
            if (LabExamData.bloodBio.id >= 0) {
              setId(LabExamData.bloodBio.id);
              setFolder('blood_bio');
            }
          } else {
            form.resetFields();
            dispatch({
              type: 'laboratoryExam/modifyBloodBio',
              payload: {
                pid,
                treNum,
                body: {},
              },
            });
          }
        }
        break;
      case '甲状腺功能':
        if (LabExamData.thyroid) {
          if (LabExamData.thyroid.id !== -404) {
            form.setFieldsValue({
              ...LabExamData.thyroid,
              samplingTime: LabExamData.thyroid.samplingTime
                ? moment(LabExamData.thyroid.samplingTime)
                : null,
            });
            if (LabExamData.thyroid.id >= 0) {
              setId(LabExamData.thyroid.id);
              setFolder('thyroid');
            }
          } else {
            form.resetFields();
            dispatch({
              type: 'laboratoryExam/modifyThyroid',
              payload: {
                pid,
                treNum,
                body: {},
              },
            });
          }
        }
        break;
      case '凝血功能':
        if (LabExamData.coagulation) {
          if (LabExamData.coagulation.id !== -404) {
            form.setFieldsValue({
              ...LabExamData.coagulation,
              samplingTime: LabExamData.coagulation.samplingTime
                ? moment(LabExamData.coagulation.samplingTime)
                : null,
            });
            if (LabExamData.coagulation.id >= 0) {
              setId(LabExamData.coagulation.id);
              setFolder('coagulation');
            }
          } else {
            form.resetFields();
            dispatch({
              type: 'laboratoryExam/modifyCoagulation',
              payload: {
                pid,
                treNum,
                body: {},
              },
            });
          }
        }
        break;
      case '心肌酶谱':
        if (LabExamData.myocardialEnzyme) {
          if (LabExamData.myocardialEnzyme.id !== -404) {
            form.setFieldsValue({
              ...LabExamData.myocardialEnzyme,
              samplingTime: LabExamData.myocardialEnzyme.samplingTime
                ? moment(LabExamData.myocardialEnzyme.samplingTime)
                : null,
            });
            if (LabExamData.myocardialEnzyme.id >= 0) {
              setId(LabExamData.myocardialEnzyme.id);
              setFolder('myocardial_enzyme');
            }
          } else {
            form.resetFields();
            dispatch({
              type: 'laboratoryExam/modifyMyocardialEnzyme',
              payload: {
                pid,
                treNum,
                body: {},
              },
            });
          }
        }
        break;
      case '细胞因子':
        if (LabExamData.cytokines) {
          if (LabExamData.cytokines.id !== -404) {
            form.setFieldsValue({
              ...LabExamData.cytokines,
              samplingTime: LabExamData.cytokines.samplingTime
                ? moment(LabExamData.cytokines.samplingTime)
                : null,
            });
            if (LabExamData.cytokines.id >= 0) {
              setId(LabExamData.cytokines.id);
              setFolder('cytokines');
            }
          } else {
            form.resetFields();
            dispatch({
              type: 'laboratoryExam/modifyCytokines',
              payload: {
                pid,
                treNum,
                body: {},
              },
            });
          }
        }
        break;
      case '淋巴细胞亚群':
        if (LabExamData.lymSubsets) {
          if (LabExamData.lymSubsets.id !== -404) {
            form.setFieldsValue({
              ...LabExamData.lymSubsets,
              samplingTime: LabExamData.lymSubsets.samplingTime
                ? moment(LabExamData.lymSubsets.samplingTime)
                : null,
            });
            if (LabExamData.lymSubsets.id >= 0) {
              setId(LabExamData.lymSubsets.id);
              setFolder('lymSubsets');
            }
          } else {
            form.resetFields();
            dispatch({
              type: 'laboratoryExam/modifyLymSubsets',
              payload: {
                pid,
                treNum,
                body: {},
              },
            });
          }
        }
        break;
      case '尿常规':
        if (LabExamData.urine_routine) {
          if (LabExamData.urine_routine.id !== -404) {
            form.setFieldsValue({
              ...LabExamData.urine_routine,
              samplingTime: LabExamData.urine_routine.samplingTime
                ? moment(LabExamData.urine_routine.samplingTime)
                : null,
            });
            if (LabExamData.urine_routine.id >= 0) {
              setId(LabExamData.urine_routine.id);
              setFolder('urineRoutine');
            }
          } else {
            form.resetFields();
            dispatch({
              type: 'laboratoryExam/modifyUrineRoutine',
              payload: {
                pid,
                treNum,
                body: {},
              },
            });
          }
        }
        break;
      case '肿瘤标志物':
        if (LabExamData.tumor_marker) {
          if (LabExamData.tumor_marker.id !== -404) {
            form.setFieldsValue({
              ...LabExamData.tumor_marker,
              samplingTime: LabExamData.tumor_marker.samplingTime
                ? moment(LabExamData.tumor_marker.samplingTime)
                : null,
            });
            if (LabExamData.tumor_marker.id >= 0) {
              setId(LabExamData.tumor_marker.id);
              setFolder('tumorMarker');
            }
          } else {
            form.resetFields();
            dispatch({
              type: 'laboratoryExam/modifyTumorMarker',
              payload: {
                pid,
                treNum,
                body: {},
              },
            });
          }
        }
        break;
      default:
    }
  }, [LabExamData, title]);

  useEffect(() => {
    if (pid !== -404) {
      switch (title) {
        case '血常规':
          setLoading(BloodRoutineLoading);
          break;
        case '血生化':
          setLoading(BloodBioLoading);
          break;
        case '甲状腺功能':
          setLoading(ThyroidLoading);
          break;
        case '凝血功能':
          setLoading(CoagulationLoading);
          break;
        case '心肌酶谱':
          setLoading(MyocardialEnzymeLoading);
          break;
        case '细胞因子':
          setLoading(CytokinesLoading);
          break;
        case '淋巴细胞亚群':
          setLoading(LymSubsetsLoading);
          break;
        case '尿常规':
          setLoading(UrineRoutineLoading);
          break;
        case '肿瘤标志物':
          setLoading(TumorMarkerLoading);
          break;
        default:
      }
    }
    // 销毁的时候
    return () => {};
  }, [
    BloodRoutineLoading,
    BloodBioLoading,
    ThyroidLoading,
    CoagulationLoading,
    MyocardialEnzymeLoading,
    CytokinesLoading,
    LymSubsetsLoading,
    UrineRoutineLoading,
    TumorMarkerLoading,
    title,
  ]);

  return (
    <Spin spinning={loading}>
      <h2>{title}</h2>
      <Form
        form={form}
        name="lab_exam"
        wrapperCol={{
          span: 24,
        }}
        onFinish={(values: any) => {
          onFinish(values);
        }}
      >
        <Form.Item label="检查时间" name="samplingTime">
          <DatePicker
          // value={samplingTime}
          // onChange={(e) => {
          //   setSamplingTime(e);
          //   // form.setFieldsValue({ examDate: e });
          // }}
          />
        </Form.Item>

        <table
          style={{
            width: '100%',
            height: '100%',
            textAlign: 'center',
            border: '1px solid #dfe6e9',
          }}
        >
          <tbody>
            <tr style={{ height: '47px', backgroundColor: '#BCE7F2' }}>
              <th style={{ width: '12.5%' }} className={style.tHead}>
                代码
              </th>
              <th style={{ width: '16.6%' }} className={style.tHead}>
                项目
              </th>
              <th style={{ width: '16.6%' }} className={style.tHead}>
                测定值
              </th>
              {title === '尿常规' ? null : (
                <th style={{ width: '8.3%' }} className={style.tHead}>
                  单位
                </th>
              )}
              <th style={{ width: '16.7%' }} className={style.tHead}>
                临床意义判断
              </th>
              <th style={{ width: '16.7%' }} className={style.tHead}>
                备注
              </th>
            </tr>
          </tbody>
        </table>
        {Object.keys(para).map((key) => {
          return (
            <table className={style.row}>
              <tbody>
                <tr style={{ minHeight: '3rem' }}>
                  <td style={{ width: '12.5%' }} className={style.grid}>
                    {key}
                  </td>
                  <td style={{ width: '16.6%' }} className={style.grid}>
                    {para[key].name}
                  </td>
                  <td style={{ width: '16.6%' }} className={style.grid}>
                    <Form.Item name={`${para[key].key}`}>
                      {title === '尿常规' ? (
                        <Input style={{ marginTop: '10%', width: '96%' }} autoComplete="off" />
                      ) : (
                        <InputNumber
                          style={{ marginTop: '10%', width: '96%' }}
                          autoComplete="off"
                        />
                      )}
                    </Form.Item>
                  </td>
                  {title === '尿常规' ? null : (
                    <td style={{ width: '8.3%' }} className={style.grid}>
                      {para[key].unit}
                    </td>
                  )}
                  <td style={{ width: '16.7%' }} className={style.grid}>
                    <IsNormalRadios name={`${para[key].key}Mea`} />
                  </td>
                  <td style={{ width: '16.7%' }} className={style.grid}>
                    <Form.Item name={`${para[key].key}Note`}>
                      <TextArea style={{ marginTop: 20, width: '96%' }} />
                    </Form.Item>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}

        <FileTable pid={pid} folder={folder} id={id} buttonStyle={{ marginTop: '20px' }} />

        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

const mapStateToProps = ({
  laboratoryExam,
  loading,
}: {
  laboratoryExam: StateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  console.log('laboratoryExam', laboratoryExam);
  return {
    LabExamData: laboratoryExam,
    BloodRoutineLoading: loading.effects['laboratoryExam/fetchBloodRoutine'],
    BloodBioLoading: loading.effects['laboratoryExam/fetchBloodBio'],
    ThyroidLoading: loading.effects['laboratoryExam/fetchThyroid'],
    CoagulationLoading: loading.effects['laboratoryExam/fetchCoagulation'],
    MyocardialEnzymeLoading: loading.effects['laboratoryExam/fetchMyocardialEnzyme'],
    CytokinesLoading: loading.effects['laboratoryExam/fetchCytokines'],
    LymSubsetsLoading: loading.effects['laboratoryExam/fetchLymSubsets'],
    UrineRoutineLoading: loading.effects['laboratoryExam/fetchUrineRoutine'],
    TumorMarkerLoading: loading.effects['laboratoryExam/fetchTumorMarker'],
  };
};

export default connect(mapStateToProps)(BasicTableContent);
