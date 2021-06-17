/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-19 14:55:43
 */

import { MultipleChoiceDataType } from '@/models/data';

export interface FirstVisitDataType {
  Ki67: string;
  PSScore: number;
  TSize: string;
  bioMet: MultipleChoiceDataType;
  cStage: string;
  cliStage: string;
  cliniManifest: MultipleChoiceDataType;
  comCar: string;
  firVisDate: string;
  id: number;
  massSize: string;
  mitIma: string;
  necArea: string;
  pStage: string;
  part: MultipleChoiceDataType;
  patDia: MultipleChoiceDataType;
  patDiaOthers: string;
  patNum: string;
  patReDate: string;
  patStage: string;
  pleInv: boolean;
  speSite: string;
  stage: string;
  traSite: MultipleChoiceDataType;
  videography: boolean;
}
