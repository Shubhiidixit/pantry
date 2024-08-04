import { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import ItemList from '../components/ItemList';
import { loadItems, saveItems } from '../utils/storage';

export default function Home() {
    const [item, setItem] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(loadItems());
    }, []);

    const handleAddItem = () => {
        if (item.trim() !== '') {
            const newItems = [...items, item.trim()];
            setItems(newItems);
            saveItems(newItems);
            setItem('');
        }
    };

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        saveItems(newItems);
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2em' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Pantry Tracker
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
            <ItemList items={items} onRemove={handleRemoveItem} />
        </Container>
    );
}
