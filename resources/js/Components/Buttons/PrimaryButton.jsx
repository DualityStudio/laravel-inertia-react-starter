import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import classNames from "classnames";

export default function PrimaryButton ({ children, processing, ...props }) {
    return (
        <button
            {...props}
            disabled={processing || props.disabled}
            className={classNames(
                "inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition",
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
