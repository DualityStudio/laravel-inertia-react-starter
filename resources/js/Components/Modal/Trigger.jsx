import React, { useState } from "react";

import Modal from "./Modal";

const Trigger = ({ modal, children, size, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };

    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Modal
                size={size}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                {isOpen && (
                    <>
                        {modal(handleClose)}
                    </>
                )}
            </Modal>

            <span onClick={handleOpen} className={`${className} cursor-pointer`}>
                {children}
            </span>
        </>
    );
};

export default Trigger;
