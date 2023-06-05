import React from "react";
import { DateTime } from "luxon";
import { InertiaLink } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

import { PaginationBar, SearchBar } from "@/Components";
import { Empty } from "@/Components/States";

const SitesTable = ({ sites, searchTerm }) => {
    return (
        <div className="space-y-4">
            <SearchBar searchTerm={searchTerm} />

            {sites?.total === 0 && (
                <Empty
                    routeName="sites.create"
                    className="max-w-4xl"
                    type="site"
                />
            )}

            {sites?.total > 0 && (
                <>
                    <div className="overflow-hidden bg-white shadow rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            {sites?.data?.map(site => (
                                <li key={site.id}>
                                    <InertiaLink href={route('sites.show', { site: site.id })} className="block transition duration-200 hover:bg-gray-50">
                                        <div className="flex items-center px-4 py-4 sm:px-6">
                                            <div className="flex min-w-0 flex-1 items-center">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="h-12 w-12 rounded-full"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                    <div>
                                                        <p className="truncate text-sm font-medium text-indigo-600">
                                                            {site.name}
                                                        </p>
                                                        <p className="mt-2 flex items-center text-sm text-gray-500">
                                                            <FontAwesomeIcon icon={faGlobe} className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                                                            <span className="truncate">{ site.site_count } sites</span>
                                                        </p>
                                                    </div>
                                                    <div className="hidden md:block">
                                                        <div>
                                                            <p className="text-sm text-gray-900">
                                                                Created on { DateTime.fromISO(site.created_at).toLocaleString(DateTime.DATE_MED) }
                                                            </p>
                                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                                <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                                                     viewBox="0 0 20 20" fill="currentColor"
                                                                     aria-hidden="true">
                                                                    <path fillRule="evenodd"
                                                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                                          clipRule="evenodd"/>
                                                                </svg>
                                                                Something goes here?
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <FontAwesomeIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    icon={faChevronRight}
                                                />
                                            </div>
                                        </div>
                                    </InertiaLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <PaginationBar
                        total={sites?.total}
                        page={sites?.current_page}
                        pageCount={sites?.last_page}
                        route="/sites?page="
                    />
                </>
            )}
        </div>
    );
};

export default SitesTable;
