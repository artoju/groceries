import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { Divider, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

type GroceryListAdderProps = {
  addFn: (name: string) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
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

export const GroceryListAdder = ({ addFn }: GroceryListAdderProps) => {
  const [name, setName] = React.useState<string>("");
  const classes = useStyles()
  const { t } = useTranslation();


  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addItem()
    }
  }
  const addItem = () => {
    addFn(name)
    setName("")
  }
  const addTitle = t('add')
  return (
    <Paper elevation={2} className={classes.root}>
      <InputBase value={name}
        className={classes.input}
        onChange={e => setName(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={t('addPlaceholder')}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip title={addTitle} placement="right">
        <IconButton className={classes.iconButton} onClick={addItem} aria-label="search">
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Paper>

  )
}
