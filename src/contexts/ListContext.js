import { createContext, useState } from 'react';

export const ListContext = createContext();

export function ListProvider({ children }) {
  const DndList = [];
  const [list, setList] = useState(DndList);
  const [nameNumber, setNameNumber] = useState(1);

  function OnDragEnd(result) {
    if (!result.destination) return;
    const mainList = Array.from(list);
    if (result.type === 'LIST') {
      const length = mainList.length;
      const [sourceItem] = mainList.splice(result.source.index, 1);
      mainList.splice(result.destination.index, 0, sourceItem);

      for (var i = 0; i < length; i++) {
        const listId = 'list-' + (i + 1);
        mainList[i].id = listId;
      }

      setList(mainList);
    } else {
      if (result.source.droppableId === result.destination.droppableId) {
        const listSelector = result.source.droppableId.substr(5, 1);
        const itemsList = mainList[listSelector - 1].items;

        const [sourceItem] = itemsList.splice(result.source.index, 1);
        itemsList.splice(result.destination.index, 0, sourceItem);

        mainList[listSelector - 1].items = itemsList;

        setList(mainList);
      } else {
        const sourceListSelector = result.source.droppableId.substr(5, 1);
        const destinationListSelector = result.destination.droppableId.substr(
          5,
          1
        );

        const [sourceItem] = mainList[sourceListSelector - 1].items.splice(
          result.source.index,
          1
        );
        mainList[destinationListSelector - 1].items.splice(
          result.destination.index,
          0,
          sourceItem
        );

        setList(mainList);
      }
    }
  }

  function AddListField(name) {
    const newList = Array.from(list);
    const clone = {
      id: 'list-' + (newList.length + 1),
      name: name,
      items: []
    };
    newList.push(clone);
    setList(newList);
  }

  function AddNameField(index, name) {
    const newName = Array.from(list);
    const clone = {
      id: 'name-' + nameNumber,
      name: name
    };
    newName[index].items.push(clone);
    setList(newName);
    setNameNumber(nameNumber + 1);
  }

  function editTask(index, listSelector, name) {
    const editList = Array.from(list);
    editList[listSelector].items[index].name = name;

    setList(editList);
  }

  function editColumn(index, name) {
    const editList = Array.from(list);
    editList[index].name = name;

    setList(editList);
  }

  function deleteListField(index) {
    const deleteItem = Array.from(list);
    deleteItem.splice(index, 1);
    const length = deleteItem.length;

    for (var i = 0; i < length; i++) {
      const listId = 'list-' + (i + 1);
      deleteItem[i].id = listId;
    }

    setList(deleteItem);
  }

  function deleteNameField(index, listSelector) {
    const deleteItem = Array.from(list);
    deleteItem[listSelector].items.splice(index, 1);

    setList(deleteItem);
  }

  return (
    <ListContext.Provider
      value={{
        list,
        OnDragEnd,
        AddListField,
        AddNameField,
        editTask,
        editColumn,
        deleteNameField,
        deleteListField
      }}
    >
      {children}
    </ListContext.Provider>
  );
}
