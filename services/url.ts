import * as ENV from '../dotenv.config';

const BASE_URL = `http://${ENV.LOCAL_IP}:3000`;

export const COMPREHENSIVE_TASK_BY_ID = (id:number) => `${BASE_URL}/comprehension-task/${id}`;
export const IDENTIFICATION_LEVEL1_TASK_BY_PATIENT_ID = (id:number) => `${BASE_URL}/api/level1/patientID/${id}`;
