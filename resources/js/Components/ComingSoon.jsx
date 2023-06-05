import React from "react";

import { Card, CardBody } from "@/Components/Card";

const ComingSoon = ({ children }) => {
    return (
        <Card>
            <CardBody>
                Coming Soon

                {children}
            </CardBody>
        </Card>
    );
};

export default ComingSoon;
