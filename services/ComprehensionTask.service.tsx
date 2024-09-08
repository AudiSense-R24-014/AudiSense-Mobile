import * as URL from "./url";

const getComprehensiveTaskById = async (id: any) => {
  const response = await fetch(URL.COMPREHENSIVE_TASK_BY_ID(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const getActivityById = async (id: any) => {
  const response = await fetch(URL.COMPREHENSIVE_ACTIVITY_BY_ID(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

const updateActivityById = async (id: any, body: any) => {
  const response = await fetch(URL.COMPREHENSIVE_ACTIVITY_BY_ID(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}

export default{
    getComprehensiveTaskById,
    getActivityById,
    updateActivityById
}
