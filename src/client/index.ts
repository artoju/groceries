import { API } from "aws-amplify";

type Grocery = {
    listId: string;
    name: string;
    id: string | null;
    checked: boolean;
}

export const createGrocery = async (values: Grocery) => {
    return await API.post("groceries", "/groceries", {
        body: values
    })
}

export const listGroceries = async (listId: string) => {
    return await API.get("groceries", `/groceries/${listId}`, {})
}

export const updateGrocery = async (values: Grocery) => {
    return await API.put("groceries", `/groceries`, {
        body: values
    })
}

export const deleteGrocery = async (values: Grocery) => {
    return await API.del("groceries", `/groceries`, {
        body: values
    })
}