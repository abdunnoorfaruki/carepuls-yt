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
  messaging,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify, formatDateTime } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
  appoinementData: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appoinementData
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log("[CREATE_APPOINEMENT_ERROR]: ", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log("[GET_APPOINTMEEENT]: ", error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, curr) => {
        if (curr.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (curr.status === "pending") {
          initialCounts.pendingCount += 1;
        } else if (curr.status === "cancelled") {
          initialCounts.cancelledCount += 1;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCounts: appointments.total,
      documents: appointments.documents,
      ...counts,
    };

    return parseStringify(data);
  } catch (error) {
    console.log("[GET_RECENTS_APPOINTMENTS_ERROR]: ", error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  appointment,
  type,
  userId,
}: UpdateAppointmentParams) => {
  try {
    console.log(appointment);
    const updateAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );
    if (!updateAppointment) {
      throw new Error("Appointment not found");
    }

    //TODO:  SMS notification
    const smsMessage = `
    Hi, it's CarePlus.
    ${
      type === "scheduled"
        ? `Your appointment has been scheduled for ${
            formatDateTime(appointment.schedule!).dateTime
          }`
        : `We regret to inform you that your appointment has been cancelled for the following reason: ${appointment.cancellationReason}`
    }
  `;
    await sendSMSNotification(userId, smsMessage)
    revalidatePath("/admin");
    return parseStringify(updateAppointment);
  } catch (error: any) {
    throw new Error(error.message);
    console.log("[UPDATE_APPOINTMENT_ERROR]: ", error.message);
  }
};

const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.log("[SEND_SMS_NOTIFICATION_ERROR]: ", error);
  }
};
