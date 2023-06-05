import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";

import { Trigger } from "@/Components";

export default function DropdownLink ({ as, href, children, className, modal }) {
    return (
        <div>
            { (() => {
                switch (as) {
                    case "button":
                        return (
                            <button
                                type="submit"
                                className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
                            >
                                { children }
                            </button>
                        );
                    case "a":
                        return (
                            <a
                                href={ href }
                                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
                            >
                                { children }
                            </a>
                        );
                    case "modal":
                        return (
                            <Trigger
                                modal={modal}
                                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
                            >
                                { children }
                            </Trigger>
                        );
                    default:
                        return (
                            <InertiaLink
                                href={ href || "" }
                                className={`block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ${className}`}
                            >
                                { children }
                            </InertiaLink>
                        );
                }
            })() }
        </div>
    );
}
