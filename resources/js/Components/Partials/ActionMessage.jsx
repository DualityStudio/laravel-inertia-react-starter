import { Transition } from "@headlessui/react";
import React from "react";

const ActionMessage = ({ on, className, children, }) => {
    return (
        <div className={className}>
            <Transition
                show={on}
                leave="transition ease-in duration-1000"
                leave-from-class="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    {children}
                </div>
            </Transition>
        </div>
    );
};

export default ActionMessage;
