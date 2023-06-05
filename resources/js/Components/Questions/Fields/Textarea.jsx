import React from "react";

const Textarea = ({ question, form }) => {
    return (
        <div className="mt-2 md:w-1/2">
            <textarea
                value={form.data[question.id] || ''}
                onChange={e => form.setData(question.id, e.currentTarget.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
        </div>
    );
};

export default Textarea;
