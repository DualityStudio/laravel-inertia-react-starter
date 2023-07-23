import React from "react";

import ComingSoon from "@/Components/ComingSoon";

import AppLayout from "@/Layouts/AppLayout";

const Dashboard = () => {
    return (
        <AppLayout
            title="Dashboard"
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            )}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ComingSoon />
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
