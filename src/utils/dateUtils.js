export const currentDateTime = () => {
    const date = new Date();
    return `
        ${date.getFullYear()}-
        ${String(date.getMonth() + 1).padStart(2, '0')}-
        ${String(date.getDate()).padStart(2, '0')}T
        ${String(date.getHours()).padStart(2, '0')}:
        ${String(date.getMinutes()).padStart(2, '0')}`.replace(/\s+/g, '').trim();

};

export const maxDate = () => {
    const date = new Date();
    return `
        ${date.getFullYear()}-
        ${String(date.getMonth() + 2).padStart(2, '0')}-
        ${String(date.getDate()).padStart(2, '0')}T
        ${String(date.getHours()).padStart(2, '0')}:
        ${String(date.getMinutes()).padStart(2, '0')}`.replace(/\s+/g, '').trim();

};

export const formatDate = (input) => {
    const date = new Date(input);

    return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
}