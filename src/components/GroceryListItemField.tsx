
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

export type GroceryListItemFieldProps = {
    name: string;
    editFn: (name: string) => void;
}
const useStyles = makeStyles((theme) => ({
    input: {
      width: "100%"
    }
  }));
  
export const GroceryListItemField = ({ name, editFn }: GroceryListItemFieldProps) => {
    const [field, setName] = React.useState<string>(name);
    const classes = useStyles()

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            editFn(field)
        }
    }
    const handleBlur = () => {
        editFn(field)
    }

    return (
        <InputBase value={ field }
        onChange={ e => setName( e.target.value )}
        onKeyPress={handleKeyPress}
        onBlur={handleBlur}
        onClick={ e => e.stopPropagation()}
        autoFocus
        className={classes.input}
        />
    )
}