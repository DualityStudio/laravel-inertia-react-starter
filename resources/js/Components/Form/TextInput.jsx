import React, { forwardRef } from "react";
import classNames from "classnames";

const TextInput = forwardRef((props, ref) => (
    <input
        {...props}
        ref={ref}
        className={classNames(
            "border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm",
            props.className,
        )}
    />
));

export default TextInput;
