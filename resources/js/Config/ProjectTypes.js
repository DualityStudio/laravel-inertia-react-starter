const projectTypes = window.options?.project_types;

export default Object.keys(projectTypes)?.map(key => ({
    label: projectTypes[key],
    value: key,
}));
