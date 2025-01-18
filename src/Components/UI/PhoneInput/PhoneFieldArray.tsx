import React from "react";
import { FieldArray, useFormikContext } from "formik";
import { PhoneInput } from "./PhoneInput";

interface PhoneFieldArrayProps {
  name: string;
  label?: string;
}

export const PhoneFieldArray: React.FC<PhoneFieldArrayProps> = ({
  name,
  label,
}) => {
  const { values, setFieldValue } = useFormikContext<any>();
  const phones = values[name] as string[];

  React.useEffect(() => {
    if (!phones || phones.length === 0) {
      setFieldValue(name, [""]);
    }
  }, []);

  if (!phones || phones.length === 0) {
    return null;
  }

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div>
          {phones.map((phone, index) => (
            <PhoneInput
              key={index}
              name={`${name}.${index}`}
              label={index === 0 ? label : undefined}
              index={index}
              isArray={true}
              onRemove={
                phones.length > 1
                  ? (index) => arrayHelpers.remove(index)
                  : undefined
              }
              canAdd={index === phones.length - 1}
              onAdd={() => arrayHelpers.push("")}
            />
          ))}
        </div>
      )}
    />
  );
};
