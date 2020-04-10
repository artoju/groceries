import React, { useEffect } from 'react';
import { GroceryListItem } from './GroceryListItem'
import { GroceryAdder } from './GroceryAdder'
import List from '@material-ui/core/List'
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { createGrocery, listGroceries, updateGrocery, deleteGrocery } from './client'
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

const GroceryList: React.FC<RouteComponentProps<RParam>> = ({ match }) => {

    const [groceryListId, setGroceryListId] = React.useState<string>("");
    const [groceries, setGroceries] = React.useState<Array<IGrocery>>([]);
    const history = useHistory()

    const groceryCheckFunction = async (id: string) => {
        let grocery = Object.assign({listId: groceryListId},groceries.find(g => g.id === id))
        grocery.checked = !grocery.checked
        const response = await updateGrocery(grocery)
        setGroceries(groceries.map(g => (g.id === id ? grocery : g)))
    }

    const groceryAddFunction = async (name: string) => {
        const response = await createGrocery({ listId: groceryListId, name, id: null, checked: false })
        setGroceries([...groceries, { id: response.item.groceryId.S, name, checked: false }])
    }

    const groceryEditFunction = async (name: string, id: string) => {
        const grocery = Object.assign({}, groceries.find(g => g.id === id), { name, listId: groceryListId })
        const response = await updateGrocery(grocery)
        setGroceries(groceries.map(g => (g.id === id ? Object.assign({}, g, { name }) : g)))
    }

    const groceryDeleteFunction = async (id: string) => {
        const response = await deleteGrocery({listId: groceryListId, id, name:"", checked: false})
        setGroceries(groceries.filter(g => g.id !== id))

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
        return {checked, unchecked}
    }

    const { checked, unchecked } = createLists()

    return (
        <div>
            <GroceryAdder addFn={groceryAddFunction}></GroceryAdder>
            <List>
                {unchecked}
            </List>
            <p>Done</p>
            <List>
                {checked}
            </List>
        </div>

    )
}

export default GroceryList