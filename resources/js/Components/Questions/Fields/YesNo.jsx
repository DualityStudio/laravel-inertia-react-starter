import React from "react";

const YesNo = ({ question, form }) => {
    return (
        <div className="flex space-x-4 mt-2">
            <AnswerButton
                onClick={() => form.setData(question.id, 'Yes')}
                selected={form.data[question.id] === 'Yes'}
            >
                Yes
            </AnswerButton>
            <AnswerButton
                onClick={() => form.setData(question.id, 'No')}
                selected={form.data[question.id] === 'No'}
            >
                No
            </AnswerButton>
        </div>
    );
};

const AnswerButton = ({ children, selected, ...rest }) => {
    return (
        <button
            type="button"
            {...rest}
            className={`inline-flex items-center px-4 py-2 ${selected ? 'bg-gray-800 text-white' : 'text-gray-800 hover:bg-gray-200'} border border-gray-800 rounded-md font-semibold text-xs uppercase tracking-widest active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition`}
        >
            {children}
        </button>
    );
};

export default YesNo;
