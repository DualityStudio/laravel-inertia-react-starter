import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

import RenderQuestionField from './RenderQuestionField';
import { InputError } from '@/Components';

const Question = ({ question, form, ...rest }) => {
    const questionCompleted = !!form?.data[question.id];

    if (!question.visible) {
        return null;
    }

    return (
        <div className={`relative sm:rounded-lg border ${questionCompleted ? "border-green-600 bg-green-600 bg-opacity-10" : "border-white bg-white"}`}>
            {questionCompleted && (
                <div className="h-6 w-6 rounded-full bg-green-600 text-white flex justify-center items-center absolute -left-3 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            )}

            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {question.text}
                </h3>

                <RenderQuestionField
                    question={question}
                    form={form}
                    {...rest}
                />

                <InputError className="mt-2" message={form.errors[question.id]} />
            </div>
        </div>
    );
};

export default Question;
