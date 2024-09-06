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

export default{
    getComprehensiveTaskById,
}
