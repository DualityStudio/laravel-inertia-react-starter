import React from "react";

const Th = ({ children }) => {
    return (
        <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
            {children}
        </th>
    );
};

export default Th;
