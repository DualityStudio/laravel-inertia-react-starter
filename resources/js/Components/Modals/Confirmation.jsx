import React from "react";

import Container from "./Container";

ConfirmationModal.Content = () => ({ title, children }) => {
    return (
        <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                        className="h-6 w-6 text-red-600 dark:text-red-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {title}
                    </h3>

                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

ConfirmationModal.Footer = ({ children }) => {
    return (
        <div className="px-6 py-4 bg-gray-100 dark:bg-gray-800 text-right">
            {children}
        </div>
    );
};

const ConfirmationModal = ({ children, ...props }) => {
    return <Container {...props}>{children}</Container>;
};

export default ConfirmationModal;
