/*
 * @Descripttion:
 * @Author: hlgdb
 * @Date: 2020-09-18 22:25:17
 */

export interface BloodRoutineDataType {
  RBC_detect_num: number;
  RBC_normal: number;
  RBC_note: string;

  HGb_detect_num: number;
  HGb_normal: number;
  HGb_note: string;

  HCT_detect_num: number;
  HCT_normal: number;
  HCT_note: string;

  MCV_detect_num: number;
  MCV_normal: number;
  MCV_note: string;

  MCH_detect_num: number;
  MCH_normal: number;
  MCH_note: string;

  MCHC_detect_num: number;
  MCHC_normal: number;
  MCHC_note: string;

  RDWCV_detect_num: number;
  RDWCV_normal: number;
  RDWCV_note: string;

  RDWSD_detect_num: number;
  RDWSD_normal: number;
  RDWSD_note: string;

  WBC_detect_num: number;
  WBC_normal: number;
  WBC_note: string;

  _GRAN_detect_num: number;
  _GRAN_normal: number;
  _GRAN_note: string;

  _LYM_detect_num: number;
  _LYM_normal: number;
  _LYM_note: string;

  _EOS_detect_num: number;
  _EOS_normal: number;
  _EOS_note: string;

  _MID_detect_num: number;
  _MID_normal: number;
  _MID_note: string;

  _BASO_detect_num: number;
  _BASO_normal: number;
  _BASO_note: string;

  PLT_detect_num: number;
  PLT_normal: number;
  PLT_note: string;

  LYM_detect_num: number;
  LYM_normal: number;
  LYM_percentage_note: string;

  MID_detect_num: number;
  MID_normal: number;
  MID_note: string;

  GRAN_detect_num: number;
  GARN_normal: number;
  GARN_note: string;

  EOS_detect_num: number;
  EOS_normal: number;
  EOS_note: string;

  BASO_detect_num: number;
  BASO_normal: number;
  BASO_note: string;

  NEUT_detect_num: number;
  NEUT_normal: number;
  NEUT_note: string;

  detectTime: string;
  filePath: string;

  id: number;
  pid: number;
  treNum: number;
}

export interface BloodChemistryDataType {
  TP_detect_num: number;
  TP_normal: number;
  TP_note: string;

  ALB_detect_num: number;
  ALB_normal: number;
  ALB_note: string;

  GLO_detect_num: number;
  GLO_normal: number;
  GLO_note: string;

  ALT_detect_num: number;
  ALT_normal: number;
  ALT_note: string;

  AST_detect_num: number;
  AST_normal: number;
  AST_note: string;

  LDH_detect_num: number;
  LDH_normal: number;
  LDH_note: string;

  GGT_detect_num: number;
  GGT_normal: number;
  GGT_note: string;

  TBIL_detect_num: number;
  TBIL_normal: number;
  TBIL_note: string;

  DBIL_detect_num: number;
  DBIL_normal: number;
  DBIL_note: string;

  IBIL_detect_num: number;
  IBIL_normal: number;
  IBIL_note: string;

  GLU_detect_num: number;
  GLU_normal: number;
  GLU_note: string;

  TC_detect_num: number;
  TC_normal: number;
  TC_note: string;

  LDL_detect_num: number;
  LDL_normal: number;
  LDL_note: string;

  HDL_detect_num: number;
  HDL_normal: number;
  HDL_note: string;

  TG_detect_num: number;
  TG_normal: number;
  TG_note: string;

  UREA_detect_num: number;
  UREA_normal: number;
  UREA_note: string;

  ALP_detect_num: number;
  ALP_normal: number;
  ALP_note: string;

  CREA_detect_num: number;
  CREA_normal: number;
  CREA_note: string;

  UA_detect_num: number;
  UA_normal: number;
  UA_note: string;

  CO2_detect_num: number;
  CO2_normal: number;
  CO2_note: string;

  K_detect_num: number;
  K_normal: number;
  K_note: string;

  Na_detect_num: number;
  Na_normal: number;
  Na_note: string;

  Cl_detect_num: number;
  Cl_normal: number;
  Cl_note: string;

  Ca_detect_num: number;
  Ca_normal: number;
  Ca_note: string;

  Mg_detect_num: number;
  Mg_normal: number;
  Mg_note: string;

  p_detect_num: number;
  p_normal: number;
  p_note: string;

  detectTime: string;
  filePath: string;

  id: number;
  pid: number;
  treNum: number;
}
