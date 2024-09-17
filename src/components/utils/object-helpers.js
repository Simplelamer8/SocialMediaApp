export const updateObjectInArray = (itemsArray, itemProp, itemID, itemObject) => {
    return itemsArray.map((item) => {
        if (item[itemProp] === itemID)
        {
            return {...item, ...itemObject};   
        }
        return {...item};
    })
}