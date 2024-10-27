import * as URL from "./url";

const getDiscriminationTaskById = async (id : any) => {
  const response = await fetch(URL.DISCRIMINATION_TASK_BY_ID(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const saveDiscrimantionTaskResponse = async (id : any, body : any) => {
  const response = await fetch(URL.DISCRIMINATION_TASK_BY_ID(id), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}

const saveDiscriminationActvityResponse = async (req : any) => {
  
  const response = await fetch(URL.DISCRIMINATION_ACTIVITY, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  const data = await response.json();
  return data;
}
export default{
    getDiscriminationTaskById,
    saveDiscriminationActvityResponse,
}