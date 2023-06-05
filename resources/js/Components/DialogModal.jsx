import React from "react";
import { Modal } from "@/Components/Modal";

DialogModal.Content = function DialogModalContent ({ title, children }) {
    return (
        <div className="px-6 py-4">
            <div className="text-lg">{title}</div>

            <div className="mt-4">{children}</div>
        </div>
    );
};

DialogModal.Footer = function DialogModalFooter ({ children }) {
    return <div className="px-6 py-4 bg-gray-100 text-right">{children}</div>;
};

export default function DialogModal ({ children, ...modalProps }) {
    return <Modal {...modalProps}>{children}</Modal>;
}
