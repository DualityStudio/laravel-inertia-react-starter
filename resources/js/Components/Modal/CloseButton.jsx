import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

const CloseButton = ({ handleClose }) => {
    return (
        <div className="absolute -top-8 -right-8">
            <div
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition duration-200 transform hover:scale-110 cursor-pointer shadow"
                onClick={() => handleClose()}
            >
                <FontAwesomeIcon icon={faTimes} />
            </div>
        </div>
    );
};

export default CloseButton;
