import React from "react";

export default function InputLabel ({ value, htmlFor, children, className }) {
    return (
        <label
            className={`block font-medium text-sm text-gray-700 ${className}`}
            htmlFor={htmlFor}
        >
            {value || children}
        </label>
    );
}
