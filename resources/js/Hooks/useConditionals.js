import React from "react";

const useConditionals = () => {
    return (conditionalVisibility, responses) => {
        if (conditionalVisibility) {
            const [field, operator, comparison] = conditionalVisibility.split('|');
            const fieldValue = responses[field];

            switch (operator) {
                case '===':
                    if (!fieldValue || fieldValue != comparison) {
                        return false;
                    }
                    break;
                case 'in':
                    if (!fieldValue || !comparison?.split(',').includes(fieldValue)) {
                        return false;
                    }
                    break;
                case '>':
                    if (!fieldValue || Number(fieldValue) <= Number(comparison)) {
                        return false;
                    }
                    break;
                case '<':
                    if (!fieldValue || Number(fieldValue) >= Number(comparison)) {
                        return false;
                    }
                    break;
                case '!==':
                    if (!fieldValue || fieldValue == comparison) {
                        return false;
                    }
                    break;
                case '>=':
                    if (!fieldValue || Number(fieldValue) < Number(comparison)) {
                        return false;
                    }
                    break;
                case '<=':
                    if (!fieldValue || Number(fieldValue) > Number(comparison)) {
                        return false;
                    }
                    break;
                default:
                    console.log(conditionalVisibility);
                    break;
            }
        }

        return true;
    };
};

export default useConditionals;
