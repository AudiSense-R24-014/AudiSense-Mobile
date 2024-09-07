import * as ENV from '../dotenv.config';

const BASE_URL = `http://${ENV.LOCAL_IP}:3000`;

export const COMPREHENSIVE_TASK_BY_ID = (id:number) => `${BASE_URL}/comprehension-task/${id}`;
export const DISCRIMINATION_TASK_BY_ID = (id:number) => `${BASE_URL}/discriminationQuestion/${id}`;