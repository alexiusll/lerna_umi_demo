/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-23 20:11:39
 */
// '几线治疗（手术、放疗、其他、1-5）(one,two,three,four,five,surgery,radiotherapy,other)'

import { Moment } from 'moment';
import { MultipleChoiceDataType } from '@/models/data';

export interface TreatmentRecordDataType {
  childOne: TreatmentRecordOneDataType;
  childTwo: TreatmentRecordTwoDataType;
  childThree: TreatmentRecordThreeDataType;
  parent: {
    id: number;
    trement: string;
  };
}

// one,two,three,four,five,other
export interface TreatmentRecordOneDataType {
  begDate: string | null | Moment;
  bioMet: MultipleChoiceDataType;
  clinTri: string;
  endDate: string | null | Moment;
  id: number;
  isRepBio: boolean;
  isTre: number;
  matPart: string;
  note: string;
  patDiaOthers: string;
  patDiaRes: any;
  patDia: MultipleChoiceDataType;
  pid: number;
  spePlan: string;
  specNum: string;
  treNum: number;
  treSolu: string;
}

// surgery
export interface TreatmentRecordTwoDataType {
  cleGro: string;
  id: number;
  isPro: boolean;
  lymDis: MultipleChoiceDataType;
  pid: number;
  posAdjChem: boolean;
  proDate: string | Moment | null;
  proDes: string;
  surDate: string | Moment | null;
  surSco: MultipleChoiceDataType;
  treNum: number;

  surScoOther: string | undefined;

  patDiaOthers: string;
  patDiaRes: any;
  patDia: MultipleChoiceDataType;
  bioMet: MultipleChoiceDataType;
  isRepBio: boolean;
  specNum: string;
  matPart: string;
}

// radiotherapy
export interface TreatmentRecordThreeDataType {
  begDate: string | Moment | null;
  dosUnit: number | boolean;
  endDate: string | Moment | null;
  id: number;
  method: string;
  pid: number;
  radDose: string;
  radSite: MultipleChoiceDataType;
  splTim: string;
  treNum: number;
  radSiteOther: string | undefined;

  patDiaOthers: string;
  patDiaRes: any;
  patDia: MultipleChoiceDataType;
  bioMet: MultipleChoiceDataType;
  isRepBio: boolean;
  specNum: string;
  matPart: string;
}

// therapy_plan 详细治疗方案
export interface TherapyPlanDataType {
  AntivascularTherapy: TherapyPlanListDataType[];
  Chemotherapy: TherapyPlanListDataType[];
  ImmunityTherapy: TherapyPlanListDataType[];
  TargetedTherapy: TherapyPlanListDataType[];
}

// item 详细治疗方案
export interface TherapyPlanListDataType {
  begDate: string;
  currPeriod: string;
  drugs: string;
  endDate: string;
  id: number;
  note: string;
  treSche: string;
  treSolu: string;
  treatName: string;
}
