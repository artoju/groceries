import React from 'react';
import TextField from '@material-ui/core/TextField';

type GroceryAdderProps = {
    addFn: Function
}

export const GroceryAdder = ({ addFn }: GroceryAdderProps) => {
    const [name, setName] = React.useState<string>("");



    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addFn(name)
            setName("")
        }
    }
    return (
        <TextField value={ name }
        variant="filled"
        onChange={ e => setName( e.target.value )}
        onKeyPress={handleKeyPress}
        />
    )
}
