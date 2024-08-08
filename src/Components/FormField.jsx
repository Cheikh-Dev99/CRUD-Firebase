import React from "react";
import FormInput from "../Utils/FormInput";
import { fields } from "../Utils/Utils";

export default function FormField({ formValues, handleChange, errors }) {
  return (
    <>
      {fields.map((field) => (
        <div key={field.id}>
          <FormInput
            {...field}
            value={formValues[field.name]}
            onChange={handleChange}
          />
          {errors[field.name] && (
            <p className="text-red-500 text-sm">{errors[field.name]}</p>
          )}
        </div>
      ))}
    </>
  );
}
