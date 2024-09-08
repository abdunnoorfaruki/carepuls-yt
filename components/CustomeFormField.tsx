"use client";
import Image from "next/image";
import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormFieldType } from "@/components/forms/PatientForm";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectTrigger } from "@radix-ui/react-select";
import { Textarea } from "@/components/ui/textarea";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface CustomeFormFieldProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  placeHolder?: string;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderFormField = ({
  field,
  props,
}: {
  field: any;
  props: CustomeFormFieldProps;
}) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeHolder,
    dateFormat,
    showTimeSelect,
    renderSkeleton,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              className="ml-2"
              width={24}
              height={24}
            />
          )}
          <FormControl>
            <Input
              placeholder={placeHolder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            international
            onChange={field.onChange}
            value={field.value}
            placeholder={placeHolder}
            withCountryCallingCode
            className="input-phone"
          />
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeHolder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src={"/assets/icons/calendar.svg"}
            alt="Calender"
            className="ml-2"
            height={24}
            width={24}
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
              dateFormat={dateFormat && "MM/dd/yyyy"}
              showTimeInput={showTimeSelect ?? false}
              wrapperClassName="date-picker"
              timeInputLabel="Time:"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl className="w-full">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 ">
              <SelectTrigger className="shad-select-trigger border-2 text-muted-foreground placeholder:text-muted-foreground ">
                <SelectValue placeholder={props.placeHolder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content border-2">
              <SelectGroup>{props.children}</SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton({ field }) : null;
    default:
      break;
  }
};

const CustomeFormField = (props: CustomeFormFieldProps) => {
  const { control, fieldType, label, name } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderFormField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomeFormField;
