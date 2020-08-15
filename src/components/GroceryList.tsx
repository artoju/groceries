import React, { useEffect } from 'react';
import { GroceryListItem } from './GroceryListItem'
import { GroceryListAdder } from './GroceryListAdder'
import List from '@material-ui/core/List'
import Chip from '@material-ui/core/Chip'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';

import { RouteComponentProps, useHistory } from 'react-router-dom';
import { createGrocery, listGroceries, updateGrocery, deleteGrocery, clearGroceries } from '../api'
import { useTranslation } from 'react-i18next';
const uuidv4 = require('uuid/v4')

interface IGrocery {
    id: string,
    name: string,
    checked: boolean
}

interface IGroceryResponse {
    id: string,
    name: string | null,
    createdAt: string,
    listId: string,
    checked: boolean,

}

type RParam = { groceryListId?: string }

const useStyles = makeStyles((theme) => ({
    "groceries-chips": {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        padding: "4px",
        marginTop: "4px",
    },
    "locale-buttons": {
        display: 'flex',
        justifyContent: 'left',
    },
    "locale-button": {
        fontSize: "1rem",
        minWidth: "46px"
    },

    chip: {
        margin: "2px",
    },
    root: {
        backgroundColor: "#4caf50"
    }
}));

const GroceryList: React.FC<RouteComponentProps<RParam>> = ({ match }) => {

    const [groceryListId, setGroceryListId] = React.useState<string>("");
    const [groceries, setGroceries] = React.useState<Array<IGrocery>>([]);
    const [copyMessageOpen, setCopyMessageOpen] = React.useState<boolean>(false)
    const [locale, setLocale] = React.useState<string>("en")

    const { t, i18n } = useTranslation();
    const classes = useStyles();
    const history = useHistory()

    const groceryCheckFunction = async (id: string) => {
        let grocery = Object.assign({ listId: groceryListId }, groceries.find(g => g.id === id))
        grocery.checked = !grocery.checked
        setGroceries(groceries.map(g => (g.id === id ? grocery : g)))
        const response = await updateGrocery(grocery)
    }

    const groceryAddFunction = async (name: string) => {
        const placeholder = uuidv4()
        setGroceries([...groceries, { id: placeholder, name, checked: false }])
        const response = await createGrocery({ listId: groceryListId, name, id: null, checked: false })
        setGroceries([...groceries, { id: response.item.groceryId.S, name, checked: false }])
    }

    const groceryEditFunction = async (name: string, id: string) => {
        const grocery = Object.assign({}, groceries.find(g => g.id === id), { name, listId: groceryListId })
        setGroceries(groceries.map(g => (g.id === id ? Object.assign({}, g, { name }) : g)))
        const response = await updateGrocery(grocery)
    }

    const groceryDeleteFunction = async (id: string) => {
        setGroceries(groceries.filter(g => g.id !== id))
        const response = await deleteGrocery({ listId: groceryListId, id, name: "", checked: false })
    }

    const groceryClear = async () => {
        setGroceries([])
        await clearGroceries(groceryListId)
    }

    const openCopyMessage = () => {
        setCopyMessageOpen(true)
    }
    const handleCopyMessageClose = () => {
        setCopyMessageOpen(false)
    }

    useEffect(() => {
        if (match.params.groceryListId) {
            setGroceryListId(match.params.groceryListId)
            fetchGroceries(match.params.groceryListId)
            localStorage.setItem("groceryListId", match.params.groceryListId)
        } else {
            const uuid = localStorage.getItem("groceryListId") || uuidv4()
            setGroceryListId(uuid)
            fetchGroceries(uuid)
            history.push(`/${uuid}`)
        }
    }, [])

    const fetchGroceries = async (id: string) => {
        const data = await listGroceries(id)

        setGroceries([...data.items.map((g: IGroceryResponse) => {
            return {
                id: g.id,
                name: g.name || "",
                checked: g.checked,
            }
        })])
    }

    const createLists = () => {
        let checked: JSX.Element[] = []
        let unchecked: JSX.Element[] = []

        groceries.forEach(grocery => {

            const listItem = <GroceryListItem
                id={grocery.id}
                key={grocery.id}
                name={grocery.name}
                checked={grocery.checked}
                checkFn={groceryCheckFunction}
                editFn={groceryEditFunction}
                deleteFn={groceryDeleteFunction}></GroceryListItem>

            if (grocery.checked) {
                checked.push(listItem)
            } else {
                unchecked.push(listItem)
            }
        })
        return { checked, unchecked }
    }
    const shareList = async () => {
        try {
            console.log(window.location.href)
            await navigator.clipboard.writeText(window.location.href)
            openCopyMessage()
        } catch (error) {
            console.log(error)
        }
    }

    const selectLocale = (event: React.MouseEvent<HTMLElement, MouseEvent>, newLocale: any) => {
        setLocale(newLocale)
        i18n.changeLanguage(newLocale)
    }

    const { checked, unchecked } = createLists()
    const copyTitle = t('copyUrl')
    const clearListTitle = t('clearList')
    const copyListMessage = t('copiedListUrl')
    return (
        <div>
            <Grid item xs={2}>
                <ToggleButtonGroup value={locale} onChange={selectLocale} size="small" exclusive className={classes["locale-buttons"]}>
                    <ToggleButton value="en" className={classes["locale-button"]}>EN</ToggleButton>
                    <ToggleButton value="fi" className={classes["locale-button"]}>FI</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <GroceryListAdder addFn={groceryAddFunction}></GroceryListAdder>
            <Paper elevation={2} square className={classes["groceries-chips"]}>
                <Chip className={classes.chip}
                    label={t('share')}
                    onDelete={shareList}
                    deleteIcon={<Tooltip title={copyTitle} placement="right"><ShareIcon /></Tooltip>}
                />
                <Chip className={classes.chip}
                    label={t('listCount', { count: groceries.length })}
                    onDelete={groceryClear}
                    deleteIcon={<Tooltip title={clearListTitle} placement="right"><DeleteIcon /></Tooltip>}
                />
            </Paper>
            <List>
                {unchecked}
            </List>
            {checked.length > 0 &&
                <div>
                    <p style={{margin:"0em"}}>{t('collected')}</p>
                    <List>
                        {checked}
                    </List>
                </div>
            }
            <Snackbar

                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={copyMessageOpen}
                onClose={handleCopyMessageClose}
                autoHideDuration={6000}
                color="success"
            >
                <Alert onClose={handleCopyMessageClose} severity="success">
                    {copyListMessage}
                </Alert>
            </Snackbar>
        </div>

    )
}

export default GroceryList