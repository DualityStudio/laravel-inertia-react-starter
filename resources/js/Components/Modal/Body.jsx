import React from "react";

const Body = ({ children, className }) => {
    return (
        <div className={`p-4 md:p-6 ${className}`}>
            {children}
        </div>
    );
};

export default Body;
