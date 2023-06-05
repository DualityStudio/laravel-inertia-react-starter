import React from "react";

const Header = ({ children, className }) => {
    return (
        <div className={`px-4 md:px-6 pt-4 md:pt-6 text-lg leading-6 font-medium text-gray-900 ${className}`}>
            {children}
        </div>
    );
}

export default Header;
