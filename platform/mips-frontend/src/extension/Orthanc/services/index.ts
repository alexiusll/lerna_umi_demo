/*
 * @Author: linkenzone
 * @Date: 2021-06-02 19:22:11
 * @Descripttion: orthanc 服务器的请求
 */
import { FetchAllPatients, FetchPatient, FetchPatientStudies } from './patients';
import { FetchSeriesOfStudies, FetchStudies } from './studies';
import { FetchSeries, FetchInstancesOfSeries } from './series';

const services = {
  // patients
  FetchAllPatients,
  FetchPatient,
  FetchPatientStudies,
  // studies
  FetchSeriesOfStudies,
  FetchStudies,
  // Series
  FetchSeries,
  FetchInstancesOfSeries,
};

export default services;
