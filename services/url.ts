import * as ENV from '../dotenv.config';

const BASE_URL = `http://${ENV.LOCAL_IP}:3000`;

export const COMPREHENSIVE_TASK_BY_ID = (id:number) => `${BASE_URL}/comprehension-task/${id}`;

export const IDENTIFICATION_LEVEL1_TASK_BY_PATIENT_ID = (id:number) => `${BASE_URL}/identification-level1/patientID/${id}`;
export const IDENTIFICATION_LEVEL2_TASK_BY_PATIENT_ID = (id:number) => `${BASE_URL}/identification-level2/patientID/${id}`;
export const UPDATE_ANSWER_LEVEL1 = (id:String) => `${BASE_URL}/identification-level1/updateLevel1ItemByTaskID/${id}`;
export const UPDATE_ANSWER_LEVEL2 = (id:String) => `${BASE_URL}/identification-level2/updateLevel2ItemByTaskID/${id}`;

export const DISCRIMINATION_TASK_BY_ID = (id:number) => `${BASE_URL}/discriminationQuestion/${id}`;