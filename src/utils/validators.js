export const checkForErrors = (object) => {
    return (Object.values(object).some(x => x !== ''));
};

export const hasEmptyProperty = (values) => {
    return (Object.values(values).some(x => x === ''));
};