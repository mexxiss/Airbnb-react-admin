import React, { useEffect } from "react";
import { FieldArray } from "formik";
import { Delete, Add } from "@mui/icons-material";

interface EssentialWork {
  itemService: string;
  quantity: number;
  priceUnit: number;
  priceSummary: number;
}

interface EssentialWorksFieldProps {
  values: EssentialWork[];
  onChange: (name: string, value: any) => void;
  setFieldValue: (field: string, value: any) => void;
}

const EssentialWorksField: React.FC<EssentialWorksFieldProps> = ({
  values,
  onChange,
  setFieldValue,
}) => {
  const emptyWork: EssentialWork = {
    itemService: "",
    quantity: 0,
    priceUnit: 0,
    priceSummary: 0,
  };

  useEffect(() => {
    values.forEach((_, index) => {
      const quantity = values[index].quantity;
      const priceUnit = values[index].priceUnit;
      const priceSummary = quantity * priceUnit;

      setFieldValue(`essentialWorks[${index}].priceSummary`, priceSummary);
    });
  }, [values, setFieldValue]);

  return (
    <div className="p-4 space-y-4 bg-white rounded-lg shadow-sm">
      <FieldArray
        name="essentialWorks"
        render={(arrayHelpers) => (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Essential Works
              </h3>
              <button
                type="button"
                onClick={() => arrayHelpers.push(emptyWork)}
                className="bg-primary p-2 rounded flex items-center gap-2 text-white hover:bg-[#967e56] transition-colors"
              >
                <Add /> Add Work
              </button>
            </div>

            <div className="space-y-4">
              {values.map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-white rounded-lg shadow-sm"
                >
                  <div>
                    <label className="text-[15px] text-gray-900 mb-2 inline-block">
                      Item Service
                    </label>
                    <input
                      name={`essentialWorks[${index}].itemService`}
                      placeholder="Item Service"
                      value={values[index].itemService}
                      onChange={onChange as any}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[15px] text-gray-900 mb-2 inline-block">
                      Quantity
                    </label>
                    <input
                      name={`essentialWorks[${index}].quantity`}
                      placeholder="Quantity"
                      type="number"
                      value={values[index].quantity}
                      onChange={onChange as any}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[15px] text-gray-900 mb-2 inline-block">
                      Price per Unit
                    </label>
                    <input
                      name={`essentialWorks[${index}].priceUnit`}
                      placeholder="Price per Unit"
                      type="number"
                      value={values[index].priceUnit}
                      onChange={onChange as any}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[15px] text-gray-900 mb-2 inline-block">
                      Price Summary
                    </label>
                    <input
                      name={`essentialWorks[${index}].priceSummary`}
                      placeholder="Price Summary"
                      type="number"
                      disabled
                      value={values[index].priceSummary}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                      className="flex items-center justify-center w-full py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                    >
                      <Delete /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default EssentialWorksField;
