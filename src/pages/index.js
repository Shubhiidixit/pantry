// pages/index.js
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import ItemList from '../components/ItemList';
import PantryList from '../components/PantryList'; // Updated import
import { loadFolders, saveFolders } from '../utils/storage';

export default function Home() {
    const [pantries, setPantries] = useState({});
    const [selectedPantry, setSelectedPantry] = useState(null);
    const [item, setItem] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setPantries(loadFolders());
    }, []);

    const handleAddItem = () => {
        if (item.trim() !== '' && selectedPantry) {
            const newItems = [...pantries[selectedPantry], item.trim()];
            const newPantries = { ...pantries, [selectedPantry]: newItems };
            setPantries(newPantries);
            saveFolders(newPantries);
            setItem('');
        }
    };

    const handleRemoveItem = (index) => {
        if (selectedPantry) {
            const newItems = pantries[selectedPantry].filter((_, i) => i !== index);
            const newPantries = { ...pantries, [selectedPantry]: newItems };
            setPantries(newPantries);
            saveFolders(newPantries);
        }
    };

    const handleUpdateItem = (index, newText) => {
        if (selectedPantry) {
            const newItems = pantries[selectedPantry].map((item, i) => (i === index ? newText : item));
            const newPantries = { ...pantries, [selectedPantry]: newItems };
            setPantries(newPantries);
            saveFolders(newPantries);
        }
    };

    const handleAddPantry = (pantryName) => {
        if (!pantries[pantryName]) {
            const newPantries = { ...pantries, [pantryName]: [] };
            setPantries(newPantries);
            saveFolders(newPantries);
        }
    };

    const handleRemovePantry = (pantryName) => {
        const newPantries = { ...pantries };
        delete newPantries[pantryName];
        setPantries(newPantries);
        saveFolders(newPantries);
        if (selectedPantry === pantryName) {
            setSelectedPantry(null);
        }
    };

    const handleUpdatePantry = (oldName, newName) => {
        if (newName !== '' && oldName !== newName) {
            const newPantries = { ...pantries, [newName]: pantries[oldName] };
            delete newPantries[oldName];
            setPantries(newPantries);
            saveFolders(newPantries);
            if (selectedPantry === oldName) {
                setSelectedPantry(newName);
            }
        }
    };

    const filteredItems = selectedPantry ? pantries[selectedPantry].filter(item => item.toLowerCase().includes(searchTerm.toLowerCase())) : [];

    return (
        <Container maxWidth="sm" style={{ marginTop: '2em' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Pantry Tracker
            </Typography>
            <PantryList
                pantries={pantries} // Updated prop name
                onRemove={handleRemovePantry}
                onSelect={setSelectedPantry}
                onUpdate={handleUpdatePantry}
                onAdd={handleAddPantry}
            />
            {selectedPantry && (
                <>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {selectedPantry}&apos;s Pantry
                    </Typography>
                    <TextField
                        label="Add Item"
                        variant="outlined"
                        fullWidth
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddItem}
                        style={{ marginTop: '1em', marginBottom: '1em' }}
                        fullWidth
                    >
                        Add Item
                    </Button>
                    <TextField
                        label="Search Items"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginBottom: '1em' }}
                    />
                    <ItemList items={filteredItems} onRemove={handleRemoveItem} onUpdate={handleUpdateItem} />
                </>
            )}
        </Container>
    );
}
