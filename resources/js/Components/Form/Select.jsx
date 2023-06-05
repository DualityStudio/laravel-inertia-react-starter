import React from "react";
import ReactSelect from "react-select";

const Select = ({ value, options, onChange, hasError, ...rest }) => {
    return (
        <ReactSelect
            styles={{
                control: styles => ({
                    ...styles,
                    borderColor: hasError ? 'rgb(220 38 38)' : 'rgb(209, 213, 219)',
                    height: 42,
                    borderRadius: '0.375rem',
                })
            }}
            options={options}
            value={options?.find(o => o.value === value)}
            onChange={option => onChange(option?.value)}
            {...rest}
        />
    );
};

export default Select;
