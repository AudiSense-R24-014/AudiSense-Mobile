import * as ENV from '../dotenv.config';

const BASE_URL = `http://${ENV.LOCAL_IP}:3000`;

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

export const IDENTIFICATION_LEVEL1_TASK_BY_PATIENT_ID = (id: number) => `${BASE_URL}/api/level1/patientID/${id}`;

export const DISCRIMINATION_TASK_BY_ID = (id: number) => `${BASE_URL}/discriminationQuestion/${id}`;

