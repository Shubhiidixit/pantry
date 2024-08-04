import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const ItemList = ({ items, onRemove }) => {
    return (
        <List>
            {items.map((item, index) => (
                <ListItem key={index} secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => onRemove(index)}>
                        <DeleteIcon />
                    </IconButton>
                }>
                    <ListItemText primary={item} />
                </ListItem>
            ))}
        </List>
    );
};

export default ItemList;
