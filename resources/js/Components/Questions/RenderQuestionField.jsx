import React from "react";

import { MultipleChoice, YesNo, Rating, Select, Text, Textarea } from "./Fields";

const RenderQuestionField = ({ question, ...rest }) => {
    switch (question.type) {
        case 'yes-no':
            return (
                <YesNo
                    question={question}
                    {...rest}
                />
            );
        case 'rating':
            return (
                <Rating
                    question={question}
                    {...rest}
                />
            );
        case 'select':
            return (
                <Select
                    question={question}
                    {...rest}
                />
            );
        case 'multiple-choice':
            return (
                <MultipleChoice
                    question={question}
                    {...rest}
                />
            );
        case 'text':
            return (
                <Text
                    question={question}
                    {...rest}
                />
            );
        case 'textarea':
            return (
                <Textarea
                    question={question}
                    {...rest}
                />
            );
    }

    return question.type;
};

export default RenderQuestionField;


// textarea
// number
// date
