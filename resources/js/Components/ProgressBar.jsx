import React from "react";

const ProgressBar = ({ progress }) => {
    return (
        <div className="h-3 bg-gray-100 rounded">
            <div className="h-3 text-white text-[0.6rem] flex items-center justify-center overflow-hidden transition bg-indigo-500 text-center rounded" style={{ width: `${progress}%`}}>
                {progress}%
            </div>
        </div>
    );
}

export default ProgressBar;
