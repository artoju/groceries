import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { GroceryListItemField } from './GroceryListItemField'


export type GroceryListItemProps = {
    [key: string]: string | boolean | Function;
    id: string;
    name: string;
    checked: boolean;
    checkFn: Function;
    deleteFn: Function;
    editFn: Function;
}

export const GroceryListItem = ({ id, name, checked, checkFn, editFn, deleteFn }: GroceryListItemProps) => {
    const [editing, setEditState] = React.useState<boolean>(false);
    const editGrocery = () => {
        setEditState(!editing)
    }

    const editName = (edit: string) => {
        editFn(edit, id)
        setEditState(false)
    }

    return (
        <ListItem
            button={true}
            onClick={() => editGrocery()}
            classes={{
                root: 'grocery-item'
            }}>
            <ListItemIcon>
                <Checkbox
                    checked={checked}
                    onClick={e => e.stopPropagation()}
                    onChange={() => checkFn(id)}
                    inputProps={{
                        'aria-label': 'check item',
                    }}
                />
            </ListItemIcon>
            {editing ? <GroceryListItemField name={name} editFn={editName}></GroceryListItemField> : <ListItemText>{name}</ListItemText>}
            <ListItemSecondaryAction>
                <IconButton onClick={() => deleteFn(id)} edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>

        </ListItem>)
}
