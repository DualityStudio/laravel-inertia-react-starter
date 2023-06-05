import React from "react";

/**
 * @function CardHeader
 * @param {JSX.Element} children
 * @param {string} className
 * @param {string} headerClassName
 * @return {JSX.Element}
 * @constructor
 */
const CardHeader = ({ children, className }) => {
    return (
        <div className={`bg-white px-4 py-5 sm:p-6 rounded-t-md border-b border-gray-200 text-lg leading-6 font-medium text-gray-900 ${className}`}>
            {children}
        </div>
    );
};

export default CardHeader;
