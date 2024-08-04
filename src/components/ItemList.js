import { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, TextField } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';

const ItemList = ({ items, onRemove, onUpdate }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditText(items[index]);
    };

    const handleSave = (index) => {
        onUpdate(index, editText);
        setEditIndex(null);
    };

    return (
        <List>
            {items.map((item, index) => (
                <ListItem key={index} secondaryAction={
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
                                <IconButton edge="end" aria-label="delete" onClick={() => onRemove(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        )}
                    </>
                }>
                    {editIndex === index ? (
                        <TextField
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            fullWidth
                        />
                    ) : (
                        <ListItemText primary={item} />
                    )}
                </ListItem>
            ))}
        </List>
    );
};

export default ItemList;
