import React from "react";
import ReactSelect from "react-select";

const MultiSelect = ({ value, options, onChange, hasError, ...rest }) => {
    const valueSelected = options.filter(o => value?.includes(o.value));

    const handleSelected = (options) => onChange(options?.map(o => o.value));

    return (
        <ReactSelect
            isMulti
            styles={{
                control: styles => ({
                    ...styles,
                    borderColor: hasError ? 'rgb(220 38 38)' : 'rgb(209, 213, 219)',
                    minHeight: 42,
                    borderRadius: '0.375rem',
                })
            }}
            options={options}
            value={valueSelected}
            onChange={handleSelected}
            {...rest}
        />
    );
};

export default MultiSelect;
