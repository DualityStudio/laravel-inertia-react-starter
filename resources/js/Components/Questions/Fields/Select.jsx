import React from "react";

import { Select as ReactSelect } from "@/Components";

const Select = ({ question, form }) => {
    return (
        <div className="mt-2 md:w-1/2">
            <ReactSelect
                value={form.data[question.id] ?? null}
                onChange={e => form.setData(question.id, e)}
                options={question.answers?.map(o => ({ value: o.answer, label: o.answer }))}
            />
        </div>
    );
};

export default Select;
