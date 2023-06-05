import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-light-svg-icons/faPlus";

import { Trigger } from "@/Components/Modal";
import useRoute from "@/Hooks/useRoute";

const Empty = ({ routeName, params, type, className, modal }) => {
    const route = useRoute();

    const inner = (
        <button
            type="button"
            className={`relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ${className}`}
        >
            <FontAwesomeIcon className="mx-auto h-12 w-12 text-gray-400" icon={faPlus} />

            <span className="mt-2 block text-sm font-semibold text-gray-900">
                    There are no {type ?? 'item'}s to show you, do you want to create one?
                </span>
        </button>
    );

    if (routeName) {
        return (
            <InertiaLink
                href={route(routeName, params)}
                className="flex justify-center w-full"
            >
                {inner}
            </InertiaLink>
        );
    }

    if (modal) {
        return (
            <Trigger
                className="flex justify-center w-full"
                modal={modal}
            >
                {inner}
            </Trigger>
        );
    }

    return null;
};

export default Empty;
