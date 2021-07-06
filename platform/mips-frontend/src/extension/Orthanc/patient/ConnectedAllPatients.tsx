/*
 * @Author: linkenzone
 * @Date: 2021-06-03 17:13:02
 * @Descripttion: Do not edit
 */
import { Button, List } from 'antd';
import React, { useEffect } from 'react';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import type { StateType } from '@/models/orthanc/patients';
import style from './index.less';
// import { history } from 'umi';

type AllPatientsProps = {
  dispatch: Dispatch;
  patientList: any[];
};

const AllPatients: React.FC<AllPatientsProps> = (props) => {
  const { dispatch, patientList } = props;

  useEffect(() => {
    dispatch({
      type: 'Orthanc_patients/fetchAllPatients',
      payload: { params: { expand: '', since: 0, limit: 101 } },
    });
    // 销毁的时候
    return () => {};
  }, []);

  return (
    <>
      <List
        bordered
        itemLayout="horizontal"
        dataSource={patientList}
        header={<div>All patients</div>}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        renderItem={(item) => (
          <List.Item
            className={style.custom_list_item}
            onClick={() => {
              console.log('item.ID', item.ID);
              // history.push(`/Patient?uuid=${item.ID}`);
              window.location.href = `/Patient?uuid=${item.ID}`;
            }}
          >
            <List.Item.Meta
              title={item.MainDicomTags.PatientName}
              description={
                <div>
                  <div>{`PatientBirthDate : ${item.MainDicomTags.PatientBirthDate}`}</div>
                  <div>{`PatientID : ${item.MainDicomTags.PatientID}`}</div>
                  <div>{`PatientSex : ${item.MainDicomTags.PatientSex}`}</div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

const mapStateToProps = ({ Orthanc_patients }: { Orthanc_patients: StateType }) => {
  return {
    patientList: Orthanc_patients.patientList,
  };
};

const ConnectedAllPatients = connect(mapStateToProps)(AllPatients);

export default ConnectedAllPatients;
