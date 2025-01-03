import React, { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect/index"; // Import the monthSelect plugin
import "flatpickr/dist/plugins/monthSelect/style.css"; // Plugin styles
import { format } from "date-fns"; // For date formatting

interface MonthPickerProps {
  label?: string;
  value?: string; // The selected date in "YYYY-MM" format
  onChange?: (value: string) => void; // Callback for date change
}

const MonthPicker: React.FC<MonthPickerProps> = ({
  label,
  value,
  onChange,
}) => {
  // Set the current month as the default value
  const currentMonth = format(new Date(), "yyyy-MM");
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : new Date(currentMonth)
  );

  useEffect(() => {
    if (!value && onChange) {
      onChange(currentMonth); // Trigger default current month on load
    }
  }, [value, onChange, currentMonth]);

  const handleDateChange = (dates: Date[]) => {
    if (dates.length > 0) {
      const selected = dates[0];
      setSelectedDate(selected);

      const formattedDate = format(selected, "yyyy-MM");
      if (onChange) {
        onChange(formattedDate); // Pass formatted date to parent component
      }
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-sm font-medium">{label}</label>
      )}
      <Flatpickr
        value={selectedDate || undefined}
        options={{
          dateFormat: "Y-m", // Flatpickr format for "YYYY-MM"
          plugins: [
            monthSelectPlugin({ shorthand: true }), // Use the imported plugin
          ],
        }}
        onChange={handleDateChange}
        className="border rounded px-3 py-2 w-full"
      />
    </div>
  );
};

export default MonthPicker;
