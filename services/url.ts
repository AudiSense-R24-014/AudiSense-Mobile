import * as ENV from '../dotenv.config';

// const BASE_URL = `http://${ENV.LOCAL_IP}:3000`;
const BASE_URL = `https://apigateway-pv2f.onrender.com`;

export const PATIENT_LOGIN = `${BASE_URL}/patients/login`;

export const GET_AWARENESS_TASKS_BY_PATIENT_ID = (patientID: string) => `${BASE_URL}/awareness-sound/patientID/${patientID}`;
export const GET_LING6_TASKS_BY_PATIENT_ID = (patientID: string) => `${BASE_URL}/ling6-all/patientID/${patientID}`;
export const GET_LING6_SEPARATE_TASKS_BY_PATIENT_ID = (patientID: string) => `${BASE_URL}/ling6-separate/patientID/${patientID}`;

export const AWARENESS_BASIC_ID = (id: string) => `${BASE_URL}/awareness-sound/${id}/`;
export const LING6_TASKS_BY_ID = (id: string) => `${BASE_URL}/ling6-all/${id}/`;
export const LING6_SEPARATE_TASKS_BY_ID = (id: string) => `${BASE_URL}/ling6-separate/${id}/`;

export const AWARENESS_BASIC_COLLECT_RESPONSE = (id: string) => `${BASE_URL}/awareness-sound/collectResponse/${id}`;
export const LING6_COLLECT_RESPONSE = (id: string) => `${BASE_URL}/ling6-all/collectResponse/${id}`;
export const LING6_SEPARATE_COLLECT_RESPONSE = (id: string) => `${BASE_URL}/ling6-separate/collectResponse/${id}`;

export const COMPREHENSIVE_TASK_BY_ID = (id: number) => `${BASE_URL}/comprehension-task/${id}`;
export const COMPREHENSIVE_ACTIVITY_BY_ID = (id: number) => `${BASE_URL}/comprehension-activity/${id}`;
export const COMPREHENSIVE_ACTIVITY_BY_PATIENT_ID = (id: number) => `${BASE_URL}/comprehension-activity/patient/${id}`;
export const COMPREHENSIVE_ASSIGNED_ACTIVITIES_BY_PATIENT_ID = (id: number) => `${BASE_URL}/comprehension-activity/patient/${id}/assigned`;

export const IDENTIFICATION_LEVEL1_TASK_BY_PATIENT_ID = (id: number) => `${BASE_URL}/api/level1/patientID/${id}`;
export const IDENTIFICATION_LEVEL2_TASK_BY_PATIENT_ID = (id:number) => `${BASE_URL}/identification-level2/patientID/${id}`;
export const UPDATE_ANSWER_LEVEL1 = (id:string) => `${BASE_URL}/identification-level1/updateLevel1ItemByTaskID/${id}`;
export const UPDATE_ANSWER_LEVEL2 = (id:string) => `${BASE_URL}/identification-level2/updateLevel2ItemByTaskID/${id}`;

export const DISCRIMINATION_TASK_BY_ID = (id: number) => `${BASE_URL}/discriminationQuestion/${id}`;

export const DISCRIMINATION_ACTIVITY_BY_ID = (id: number) => `${BASE_URL}/activityDiscrimination/${id}`;
export const DISCRIMINATION_ACTIVITY = `${BASE_URL}/activityDiscrimination/`;
export const DISCRIMINATION_ACTIVITY_BY_PATIENT_ID = (id: number) => `${BASE_URL}/activityDiscrimination/patient/${id}`;
