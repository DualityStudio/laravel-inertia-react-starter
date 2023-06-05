import React from "react";

import Pagination from "./Pagination";

/**
 * @function PaginationBar
 * @param {Number} total
 * @param pageCount
 * @param page
 * @param className
 * @param goToPage
 * @return {JSX.Element}
 * @constructor
 */
const PaginationBar = ({ total, pageCount, page, className, route }) => {
    return (
        <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-start mb-4 md:mb-0">
            <div className="mt-4 text-sm leading-5 text-gray-700 md:my-auto">
                {total} {`result${total > 1 ? "s" : ""}`} in {pageCount} page{pageCount > 1 ? "s" : ""}
            </div>

            <div>
                <Pagination
                    pageCount={pageCount}
                    page={page}
                    className={className}
                    route={route}
                />
            </div>
        </div>
    );
};

export default PaginationBar;
