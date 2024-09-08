"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import {
  APPOINTMENT_COLLECTION_ID,
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Console } from "console";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", user.email)]);
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log("[GET-USER_ACTION]: ", error);
  }
};
export const getPatient = async (userId: string) => {
  try {
    const patient = await databases.listDocuments(DATABASE_ID!,PATIENT_COLLECTION_ID!,[Query.equal("userId", userId)])
    return parseStringify(patient.documents[0]);
  } catch (error) {
    console.log("[GET-PATIENT_ACTION]: ", error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patientData
}: RegisterUserParams) => {
  try {
    console.log({...patientData})
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument.get("blobFile") as Blob,
        identificationDocument.get("fileName") as string
      );
  
      file = await storage.createFile(BUCKET_ID!,ID.unique(), inputFile)
    }
  
    const newPatient = await databases.createDocument(DATABASE_ID!, PATIENT_COLLECTION_ID!, ID.unique(),{
      identificationDocumentId: file?.$id,
      identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
      ...patientData
    })
    return parseStringify(newPatient)
  } catch (error) {
    console.log("[REGISTER_PATIENT_ERROR]: ", error)
  }
};
