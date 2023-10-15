import React from "react";

import classNames from "classnames";

Card.Header = ({ children, ...props }) => {
    return (
        <div
            {...props}
            className={classNames(
                "bg-white dark:bg-gray-800 px-4 py-5 sm:p-6 rounded-t-md border-b border-gray-200 dark:border-gray-700",
                props.className
            )}
        >
            {children}
        </div>
    );
};

Card.Title = ({ children, ...props }) => {
    return (
        <div
            {...props}
            className={classNames(
                "text-lg leading-6 font-medium text-gray-900 dark:text-gray-100",
                props.className
            )}
        >
            {children}
        </div>
    );
};

Card.Body = ({ children, ...props }) => {
    return (
        <div
            {...props}
            className={classNames(
                "px-4 py-5 sm:p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200",
                props.className
            )}
        >
            {children}
        </div>
    );
};

Card.Footer = ({ children, ...props }) => {
    return (
        <div
            {...props}
            className={classNames(
                "px-4 py-5 border-t border-gray-200 dark:border-gray-700 bg-gray-100 bg-opacity-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
                props.className
            )}
        >
            {children}
        </div>
    );
};

export default function Card ({ children }) {
    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            {children}
        </div>
    );
}
