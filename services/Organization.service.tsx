import * as URL from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getOrganizationById = async (id: string) => {
    const token = await AsyncStorage.getItem("audi-token");
    const response = await fetch(URL.ORGANIZATION_BY_ID(id), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch organization data.");
    }

    const data = await response.json();
    return data;
};

export default { getOrganizationById };