import classNames from "classnames";
import React, { forwardRef } from "react";

const TextInput = forwardRef(({ hasError, className, type = "text", ...rest}, ref) => (
    <input
        {...rest}
        type={type}
        ref={ref}
        className={classNames(
            `${hasError ? 'border-red-600' : 'border-gray-300'} w-full focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm`,
            className
        )}
    />
));

TextInput.displayName = "TextInput";

export default TextInput;
