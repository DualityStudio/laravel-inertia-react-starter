import React from "react";

/**
 * @function Card
 * @param {JSX.Element} children
 * @param {string} className
 * @parma {object} rest
 * @return {JSX.Element}
 * @constructor
 */
const Card = ({ children, className, ...rest }) => {
    return (
        <div
            className={`bg-white shadow w-full rounded-md ${className}`}
            {...rest}
        >
            {children}
        </div>
    );
};

export default Card;
