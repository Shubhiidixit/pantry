export const loadItems = () => {
    if (typeof window !== 'undefined') {
        const savedItems = localStorage.getItem('pantryItems');
        return savedItems ? JSON.parse(savedItems) : [];
    }
    return [];
};

export const saveItems = (items) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('pantryItems', JSON.stringify(items));
    }
};
