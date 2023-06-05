import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import useRoute from "@/Hooks/useRoute";

const SideNav = ({ links }) => {
    const route = useRoute();

    return (
        <nav className="space-y-1">
            {links?.map((link, key) => (
                <InertiaLink
                    key={`${key}-route`}
                    href={link?.route ? route(link?.route, link?.params) : null}
                    className={`${route().current(link?.route, link?.params) ? 'bg-gray-50 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} flex items-center rounded-md px-3 py-2 text-sm font-medium`}
                >
                    <span className="truncate">{ link?.label }</span>
                </InertiaLink>
            ))}
        </nav>
    );
};

export default SideNav;
