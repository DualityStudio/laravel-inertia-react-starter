import React from "react";
import APITokenManager from "@/Pages/API/Partials/APITokenManager";
import AppLayout from "@/Layouts/AppLayout";

export default function ApiTokenIndex ({
    tokens,
    availablePermissions,
    defaultPermissions,
}) {
    return (
        <AppLayout title={"API Tokens"}>
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <APITokenManager
                        tokens={tokens}
                        availablePermissions={availablePermissions}
                        defaultPermissions={defaultPermissions}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
