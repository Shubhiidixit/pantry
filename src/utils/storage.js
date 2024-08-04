export const loadFolders = () => {
    if (typeof window !== 'undefined') {
        const savedFolders = localStorage.getItem('pantryFolders');
        return savedFolders ? JSON.parse(savedFolders) : { 'Shubhi': ['Apples', 'Bananas'] };
    }
    return { 'Shubhi': ['Apples', 'Bananas'] };
};

export const saveFolders = (folders) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('pantryFolders', JSON.stringify(folders));
    }
};
