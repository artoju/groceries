
import React from 'react';
import TextField from '@material-ui/core/TextField';

export type GroceryListItemFieldProps = {
    name: string;
    editFn: Function;
}

export const GroceryListItemField = ({ name, editFn }: GroceryListItemFieldProps) => {
    const [field, setName] = React.useState<string>(name);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            editFn(field)
        }
    }
    const handleBlur = () => {
        editFn(field)
    }

    return (
        <TextField value={ field }
        variant="filled"
        onChange={ e => setName( e.target.value )}
        onKeyPress={handleKeyPress}
        onBlur={handleBlur}
        onClick={ e => e.stopPropagation()}
        autoFocus
        />
    )
}