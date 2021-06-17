/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-16 17:17:19
 */

export interface LungFunctionDataType {
  samplingTime: string;

  DLCO_exMea: number;
  DLCO_exNote: string;
  DLCO_ex_best: number;
  DLCO_ex_exp: number;
  DLCO_ex_ratio: number;

  DLCO_sbMea: number;
  DLCO_sbNote: string;
  DLCO_sb_best: number;
  DLCO_sb_exp: number;
  DLCO_sb_ratio: number;

  FEV1_FVCMea: number;
  FEV1_FVCNote: string;
  FEV1_FVC_best: number;
  FEV1_FVC_exp: number;
  FEV1_FVC_ratio: number;

  FVCMea: number;
  FVCNote: string;
  FVC_best: number;
  FVC_exp: number;
  FVC_ratio: number;

  KCOMea: number;
  KCONote: string;
  KCO_best: number;
  KCO_exp: number;
  KCO_ratio: number;

  MEF25Mea: number;
  MEF25Note: string;
  MEF25_best: number;
  MEF25_exp: number;
  MEF25_ratio: number;

  MEF50Mea: number;
  MEF50Note: string;
  MEF50_best: number;
  MEF50_exp: number;
  MEF50_ratio: number;

  MEF75Mea: number;
  MEF75Note: string;
  MEF75_best: number;
  MEF75_exp: number;
  MEF75_ratio: number;

  MEFMea: number;
  MEFNote: string;
  MEF_best: number;
  MEF_exp: number;
  MEF_ratio: number;

  RV_TLCMea: number;
  RV_TLCNote: string;
  RV_TLC_best: number;
  RV_TLC_exp: number;
  RV_TLC_ratio: number;

  RVMea: number;
  RVNote: string;
  RV_best: number;
  RV_exp: number;
  RV_ratio: number;

  TLC_sbMea: number;
  TLC_sbNote: string;
  TLC_sb_best: number;
  TLC_sb_exp: number;
  TLC_sb_ratio: number;

  VCMea: number;
  VCNote: string;
  VC_best: number;
  VC_exp: number;
  VC_ratio: number;

  detectTime: string;
  filePath: string;

  id: number;
  pid: number;
  treNum: number;
}
