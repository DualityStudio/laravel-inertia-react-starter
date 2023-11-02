import { Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { useState } from "react";

export default function Dropdown ({
    align = "right",
    width = "48",
    contentClasses = "py-1 bg-white",
    renderTrigger,
    children,
    menu,
}) {
    const [open, setOpen] = useState(false);

    const widthClass = {
        48: "w-48",
    }[width.toString()];

    const alignmentClasses = (() => {
        if (align === "left") {
            return "origin-top-left left-0";
        } else if (align === "right") {
            return "origin-top-right right-0";
        } else {
            return "origin-top";
        }
    })();

    const handleClose = () => setOpen(false);

    return (
        <div className="relative">
            <div onClick={ () => setOpen(!open) }>{ renderTrigger() }</div>

            {/* <!-- Full Screen Dropdown Overlay --> */ }
            <div
                className="fixed inset-0 z-40"
                style={ { display: open ? "block" : "none" } }
                onClick={ () => setOpen(false) }
            />

            <Transition
                show={ open }
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                className={ "relative z-50" }
            >
                {children && (
                    <div
                        className={ classNames(
                            "absolute mt-2 rounded-md shadow-lg",
                            widthClass,
                            alignmentClasses
                        ) }
                        onClick={ handleClose }
                    >
                        <div
                            className={ classNames(
                                "rounded-md ring-1 ring-black ring-opacity-5",
                                contentClasses
                            ) }
                        >
                            { children }
                        </div>
                    </div>
                )}

                {menu && (
                    <div
                        className={ classNames(
                            "absolute mt-2 rounded-md shadow-lg",
                            widthClass,
                            alignmentClasses
                        ) }
                    >
                        <div
                            className={ classNames(
                                "rounded-md ring-1 ring-black ring-opacity-5",
                                contentClasses
                            ) }
                        >
                            { menu(handleClose) }
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    );
}