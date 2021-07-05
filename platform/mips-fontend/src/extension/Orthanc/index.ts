/*
 * @Author: linkenzone
 * @Date: 2021-05-27 16:35:04
 * @Descripttion: Do not edit
 */
import UploadFilesComponent from './uploadFiles/UploadFilesComponent';
import ConnectedAllPatients from './patient/ConnectedAllPatients';
import ConnectedPatient from './patient/ConnectedPatient';
import ConnectedStudy from './study/ConnectedStudy';
import ConnectedSeries from './Series/ConnectedSeries';
import services from './services';

const OrthancExtension = {
  ConnectedAllPatients,
  ConnectedPatient,
  ConnectedStudy,
  ConnectedSeries,

  UploadFilesComponent,
  services,
};

export {
  ConnectedAllPatients,
  ConnectedPatient,
  ConnectedStudy,
  ConnectedSeries,
  UploadFilesComponent,
  services,
};

export default OrthancExtension;
