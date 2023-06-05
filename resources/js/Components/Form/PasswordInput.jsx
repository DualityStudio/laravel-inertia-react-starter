import React, { forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";

import TextInput from "./TextInput";

const PasswordInput = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <TextInput
                { ...props }
                type={visible ? 'text' : 'password'}
                ref={ref}
            />

            <div className="right-4 inset-y-0 absolute flex items-center">
                <FontAwesomeIcon
                    className="text-gray-500 cursor-pointer"
                    icon={visible ? faEyeSlash : faEye}
                    onClick={() => setVisible(!visible)}
                />
            </div>
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
