import React from "react";

const InputError = ({ message, className, children }) => {
    if (!message && !children) {
        return null;
    }

    return (
        <div className={className}>
            <p className="text-sm text-red-600 dark:text-red-400">
                {message || children}
            </p>
        </div>
    );
};

export default InputError;
