/*
 * @Author: linkenzone
 * @Date: 2021-06-03 20:20:34
 * @Descripttion: Do not edit
 */
import { Button, Card, List, Layout } from 'antd';
import React, { useEffect } from 'react';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import type { StateType } from '@/models/orthanc/study';
import style from './index.less';
import { history } from 'umi';

const { Header, Footer, Sider, Content } = Layout;

type StudyProps = {
  uuid: string | null;
  dispatch: Dispatch;

  curPatientInfo: any;
  curStudyInfo: any;
  curSeriesList: any[];

  fetchStudyLoading: boolean;
};

const Study: React.FC<StudyProps> = (props) => {
  const { dispatch, curPatientInfo, curStudyInfo, uuid, curSeriesList, fetchStudyLoading } = props;

  useEffect(() => {
    if (uuid === null) return;
    dispatch({
      type: 'Orthanc_study/fetchStudy',
      payload: { uuid },
    });
    // 销毁的时候
    // return () => {};
  }, [uuid]);

  return (
    <>
      {/* <Button
        onClick={() => {
          history.goBack();
        }}
      >
        返回
      </Button> */}

      <Layout>
        <Sider theme="light" width="20%">
          <div style={{ paddingRight: '12px' }}>
            <Card
              title="Patient"
              bodyStyle={{ padding: '12px' }}
              headStyle={{ backgroundColor: '#39bbdb' }}
              size="small"
              hoverable
              onClick={() => {
                history.push(`/Patient?uuid=${curPatientInfo.ID}`);
              }}
            >
              <p className={style.custom_p} style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {curPatientInfo?.MainDicomTags.PatientName}
              </p>
              <p className={style.custom_p}>
                PatientBirthDate: {curPatientInfo?.MainDicomTags.PatientBirthDate}
              </p>
              <p className={style.custom_p}>PatientID: {curPatientInfo?.MainDicomTags.PatientID}</p>
              <p className={style.custom_p}>
                PatientSex: {curPatientInfo?.MainDicomTags.PatientSex}
              </p>
            </Card>

            <Card
              title="Study"
              bodyStyle={{ padding: '12px' }}
              headStyle={{ backgroundColor: '#39bbdb' }}
              size="small"
            >
              <p className={style.custom_p} style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {curStudyInfo?.MainDicomTags.StudyDescription}
              </p>
              <p className={style.custom_p}>
                AccessionNumber: {curStudyInfo?.MainDicomTags.AccessionNumber}
              </p>
              <p className={style.custom_p}>
                ReferringPhysicianName: {curStudyInfo?.MainDicomTags.ReferringPhysicianName}
              </p>
              <p className={style.custom_p}>StudyDate: {curStudyInfo?.MainDicomTags.StudyDate}</p>
              <p className={style.custom_p}>StudyID: {curStudyInfo?.MainDicomTags.StudyID}</p>
              <p className={style.custom_p}>
                StudyInstanceUID: {curStudyInfo?.MainDicomTags.StudyInstanceUID}
              </p>
            </Card>
          </div>
        </Sider>

        <Layout>
          <Content style={{ background: 'white' }}>
            <List
              bordered
              itemLayout="horizontal"
              dataSource={curSeriesList}
              loading={fetchStudyLoading}
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
                    console.log('item', item);

                    window.location.href = `/Series?uuid=${item.ID}`;
                  }}
                >
                  <List.Item.Meta
                    title={item.MainDicomTags.SeriesDescription}
                    description={
                      <div>
                        <div>{`Status : ${item.Status}`}</div>
                        <div>{`Modality : ${item.MainDicomTags.Modality}`}</div>
                        <div>{`NumberOfSlices : ${item.MainDicomTags.NumberOfSlices}`}</div>
                        <div>{`OperatorsName : ${item.MainDicomTags.OperatorsName}`}</div>
                        <div>{`SeriesInstanceUID : ${item.MainDicomTags.SeriesInstanceUID}`}</div>
                        <div>{`SeriesNumber : ${item.MainDicomTags.SeriesNumber}`}</div>
                        <div>{`SeriesType : ${item.MainDicomTags.SeriesType}`}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

const mapStateToProps = ({
  Orthanc_study,
  loading,
}: {
  Orthanc_study: StateType;
  loading: { effects: Record<string, boolean> };
}) => {
  return {
    fetchStudyLoading: loading.effects['Orthanc_study/fetchStudy'],
    curPatientInfo: Orthanc_study.curPatientInfo,
    curStudyInfo: Orthanc_study.curStudyInfo,
    curSeriesList: Orthanc_study.curSeriesList,
  };
};

const ConnectedStudy = connect(mapStateToProps)(Study);

export default ConnectedStudy;
