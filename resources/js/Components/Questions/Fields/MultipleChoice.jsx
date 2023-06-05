import React from "react";

const MultipleChoice = ({ question, form }) => {
    const values = form.data[question.id];

    const handleChange = (e) => {
        if (values?.includes(e.target.value)) {
            form.setData(question.id, values.filter(value => value !== e.target.value));
        } else {
            form.setData(question.id, [...values ?? [], e.target.value]);
        }
    };

    return (
        <div className="mt-2 grid grid-cols-3">
            {question.answers.map((answer, index) => (
                <div key={index} className="flex items-center">
                    <input
                        type="checkbox"
                        name={question.id}
                        value={answer.answer}
                        checked={values?.includes(answer.answer) ?? false}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label>{answer.answer}</label>
                </div>
            ))}
        </div>
    );
};

export default MultipleChoice;
