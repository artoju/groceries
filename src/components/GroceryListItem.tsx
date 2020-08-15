import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { GroceryListItemField } from './GroceryListItemField'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';


export type GroceryListItemProps = {
    [key: string]: string | boolean | Function;
    id: string;
    name: string;
    checked: boolean;
    checkFn: (id: string) => void;
    deleteFn: (id: string) => void;
    editFn: (name: string, id: string) => void;
}
const useStyles = makeStyles((theme) => ({
    listItem: {
        backgroundColor: "#4CAF50",
        margin: "5px 0 5px 0",

        '&:hover': {
            backgroundColor: "rgba(76, 175, 79, 0.555)"
        }
    },
    root: {
        "& span": {
    
        textOverflow: "ellipsis",
            overflow: "hidden",
        }
        
    },
    textfield: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));
export const GroceryListItem = ({ id, name, checked, checkFn, editFn, deleteFn }: GroceryListItemProps) => {
    const [editing, setEditState] = React.useState<boolean>(false);
    const { t } = useTranslation();
    const editGrocery = () => {
        setEditState(!editing)
    }
    const classes = useStyles()

    const editName = (edit: string) => {
        editFn(edit, id)
        setEditState(false)
    }

    const uncheckTitle = t('uncheck')
    const checkTitle = t('check')
    const deleteTitle = t('delete')
    return (
        <ListItem
            button={true}
            onClick={() => editGrocery()}
            className={classes.listItem}>
            <ListItemIcon>
                <Tooltip title={checked ? uncheckTitle : checkTitle} placement="left">
                    <Checkbox
                        checked={checked}
                        onClick={e => e.stopPropagation()}
                        onChange={() => checkFn(id)}
                        inputProps={{
                            'aria-label': 'check item',
                        }}
                    />
                </Tooltip>
            </ListItemIcon>
            {editing ? <GroceryListItemField name={name} editFn={editName}></GroceryListItemField> : <ListItemText className={classes.root}>{name}</ListItemText>}
            <ListItemSecondaryAction>
                <Tooltip title={deleteTitle} placement="right">
                    <IconButton onClick={() => deleteFn(id)} edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </ListItemSecondaryAction>

        </ListItem>)
}
