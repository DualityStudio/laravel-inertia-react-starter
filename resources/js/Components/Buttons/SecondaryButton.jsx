import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";

export default function SecondaryButton ({ children, processing, ...props }) {
    return (
        <button
            {...props}
            disabled={processing || props.disabled}
            className={classNames(
                "inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50 disabled:opacity-25 transition",
                props.className
            )}
        >
            {processing && (
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
            )}

            {children}
        </button>
    );
}
