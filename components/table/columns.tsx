"use client";

import { Appointment } from "@/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../statusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import { AppointmentModal } from "../AppointmentModal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },

  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <p className="text-14-medium"> {row.original.patient.name} </p>
    ),
  },

  {
    accessorKey: "status",
    header: "Header",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="min-w-[100px] text-14-regular ">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },

  {
    accessorKey: "primaryPhynician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => (doc.name = row.original.primaryPhysician)
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt={doctor?.name!}
            height={100}
            width={100}
            className="size-8"
          />
          <p className="whitespace-normal">{doctor?.name}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row:{original:data} }) => (
      <div className="flex gap-1">
        <AppointmentModal type="schedule" patientId={data.patient.$id} userId={data.userId} appointment={data} />
        <AppointmentModal type="cancel" patientId={data.patient.$id} userId={data.userId} appointment={data} />
      </div>
    ),
  },
];
