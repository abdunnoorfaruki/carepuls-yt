import clsx from "clsx";
import Image from "next/image";
import React from "react";
interface StatProps {
  count: number;
  type: "appointments" | "cancelled" | "pending";
  label: string;
  icon: string;
}
const StatCard = ({ count = 0, type, label, icon }: StatProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt={label}
          height={32}
          width={32}
          className="size-8 w-fit"
        />
        <h2 className="text-32 font-bold text-white" >{count}</h2>
      </div>
      <p className="text-14-regular" >{label}</p>
    </div>
  );
};

export default StatCard;
