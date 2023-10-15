import React from "react";

import { App } from "@/Components";

import APITokenManager from "./Partials/APITokenManager";

const ApiTokenIndex = ({ tokens, availablePermissions, defaultPermissions }) => {
    return (
        <App
            title={"API Tokens"}
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    API Tokens
                </h2>
            )}
        >
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <APITokenManager
                        tokens={tokens}
                        availablePermissions={availablePermissions}
                        defaultPermissions={defaultPermissions}
                    />
                </div>
            </div>
        </App>
    );
};

export default ApiTokenIndex;
