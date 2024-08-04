// components/PantryList.js
import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Folder as FolderIcon } from '@mui/icons-material';

const PantryList = ({ pantries, onRemove, onSelect, onUpdate, onAdd }) => {
    const [newPantryName, setNewPantryName] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditText(Object.keys(pantries)[index]);
    };

    const handleSave = (index) => {
        const oldName = Object.keys(pantries)[index];
        onUpdate(oldName, editText);
        setEditIndex(null);
    };

    const handleAddPantry = () => {
        if (newPantryName.trim() !== '') {
            onAdd(newPantryName.trim());
            setNewPantryName('');
        }
    };

    return (
        <div>
            <TextField
                label="New Pantry Name"
                variant="outlined"
                fullWidth
                value={newPantryName}
                onChange={(e) => setNewPantryName(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddPantry}
                style={{ marginTop: '1em', marginBottom: '1em' }}
                fullWidth
            >
                Add Pantry
            </Button>
            <List>
                {Object.keys(pantries).map((pantry, index) => (
                    <ListItem key={index} button onClick={() => onSelect(pantry)} secondaryAction={
                        <>
                            {editIndex === index ? (
                                <>
                                    <IconButton edge="end" aria-label="save" onClick={() => handleSave(index)}>
                                        <SaveIcon />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(index)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => onRemove(pantry)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </>
                    }>
                        <FolderIcon />
                        {editIndex === index ? (
                            <TextField
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                fullWidth
                            />
                        ) : (
                            <ListItemText primary={pantry} />
                        )}
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default PantryList;
