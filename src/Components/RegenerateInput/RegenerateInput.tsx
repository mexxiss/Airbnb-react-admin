import React, { useCallback } from "react";

import RefreshIcon from "@mui/icons-material/Refresh";

interface RegenerateInputProps {
  value: string;
  onChange: (value: string) => void;
  generateValue: () => string;
  className?: string;
  disabled?: boolean;
}

export const RegenerateInput: React.FC<RegenerateInputProps> = React.memo(
  ({ value, onChange, generateValue, className = "", disabled = false }) => {
    const handleRegenerate = useCallback(() => {
      const newValue = generateValue();
      onChange(newValue);
    }, [generateValue, onChange]);

    return (
      <div className="relative">
        <input
          type="text"
          value={value}
          readOnly
          disabled={disabled}
          className={`w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pr-10 ${className}`}
        />
        <button
          type="button"
          onClick={handleRegenerate}
          disabled={disabled}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          title="Regenerate"
        >
          <RefreshIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }
);
