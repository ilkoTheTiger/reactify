export const checkForErrors = (object) => {
    return (Object.values(object).some(x => x !== ''));
};

export const validateAll = (values) => {
    return (Object.values(values).some(x => x === ''));
};