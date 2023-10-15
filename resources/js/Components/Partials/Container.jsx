import React from "react";
import classNames from "classnames";

const Container = ({ children, ...props }) => {
    return (
        <div
            { ...props }
            className={classNames(
                "max-w-7xl mx-auto sm:px-6 lg:px-8 py-12",
                props.className
            )}
        >
            {children}
        </div>
    );
};

export default Container;
