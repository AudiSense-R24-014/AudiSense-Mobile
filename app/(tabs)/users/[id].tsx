import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView } from "react-native";
import OrganizationService from "@/services/Organization.service";

const UserPage = () => {
  const [patient, setPatient] = useState<any>(null);
  const [organization, setOrganization] = useState<any>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      const storedData = await AsyncStorage.getItem("audi-patient");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setPatient(parsedData);
        OrganizationService.getOrganizationById(parsedData.organization)
          .then((response) => {
            setOrganization(response);
          });
      }
    };
    fetchPatientData();
  }, []);

  if (!patient) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      <View style={{ padding: 16, backgroundColor: "#f3f4f6", height: "100%" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#2563eb", marginBottom: 16 }}>
          Patient Details
        </Text>
        <View style={{ backgroundColor: "#ffffff", padding: 16, borderRadius: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#374151" }}>
            {patient.firstName} {patient.lastName}
          </Text>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>
            Date of Birth: {new Date(patient.dob).toLocaleDateString()}
          </Text>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>Gender: {patient.gender}</Text>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>Email: {patient.email}</Text>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>
            Contact: {patient.contactNo}
          </Text>
        </View>

        <View style={{ marginTop: 24, backgroundColor: "#ffffff", padding: 16, borderRadius: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2563eb", marginBottom: 8 }}>
            Implant Details
          </Text>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>
            Is Implanted: {patient.implant.isImplanted ? "Yes" : "No"}
          </Text>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>
            Surgery Date:{" "}
            {patient.implant.surgeryDate
              ? new Date(patient.implant.surgeryDate).toLocaleDateString()
              : "N/A"}
          </Text>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>
            Switch-On Date:{" "}
            {patient.implant.switchOnDate
              ? new Date(patient.implant.switchOnDate).toLocaleDateString()
              : "N/A"}
          </Text>
        </View>

        <View style={{ marginTop: 24, backgroundColor: "#ffffff", padding: 16, borderRadius: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2563eb", marginBottom: 8 }}>
            Additional Details
          </Text>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>
            Hearing Age: {patient.hearingAge} years
          </Text>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>
            Created On: {new Date(patient.createdOn).toLocaleDateString()}
          </Text>
          <Text style={{ fontSize: 14, color: "#6b7280" }}>
            Updated On: {new Date(patient.updatedOn).toLocaleDateString()}
          </Text>
        </View>

        {organization && (
          <View style={{ marginTop: 24, backgroundColor: "#ffffff", padding: 16, borderRadius: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#2563eb", marginBottom: 8 }}>
              Organization Details
            </Text>
            <Text style={{ fontSize: 14, color: "#6b7280" }}>Name: {organization.name}</Text>
            <Text style={{ fontSize: 14, color: "#6b7280" }}>Country: {organization.country}</Text>
            <Text style={{ fontSize: 14, color: "#6b7280" }}>City: {organization.city}</Text>
            <Text style={{ fontSize: 14, color: "#6b7280" }}>Address: {organization.address}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UserPage;