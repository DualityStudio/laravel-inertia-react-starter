import React, { useState } from "react";

const useUpload = () => {
    const [progress, setProgress] = useState({});

    const upload = (file, id) => Vapor.store(file, {
        progress: (uploadProgress) => setProgress({
            ...progress,
            [id]: Math.round(uploadProgress * 100),
        }),
    });

    return {
        upload,
        progress,
    };
};

export default useUpload;
