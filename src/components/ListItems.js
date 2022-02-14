import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useContext } from 'react';
import { ListContext } from '../contexts/ListContext';
import { DeleteFilled, HolderOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import EditTaskModal from './editTaskModel';

export default function ListItems(props) {
  const { list, deleteNameField } = useContext(ListContext);
  const listIndex = props.listIndex;
  const items = list[listIndex].items;

  return (
    <Droppable droppableId={list[listIndex].id} type="ITEM">
      {provided => (
        <ListItemsContainers
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {items.map(({ id, name }, index) => {
            return (
              <Draggable key={id} draggableId={id} index={index}>
                {provided => (
                  <ContainerItems
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <HolderOutlined
                      style={{ cursor: 'pointer' }}
                      {...provided.dragHandleProps}
                    />
                    <h4>{name}</h4>
                    <EditTaskModal
                      taskIndex={index}
                      listIndex={listIndex}
                      name={name}
                    />

                    <DeleteFilled
                      style={{
                        fontSize: '30px',
                        cursor: 'pointer',
                        color: 'red'
                      }}
                      onClick={() => deleteNameField(index, listIndex)}
                    />
                  </ContainerItems>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </ListItemsContainers>
      )}
    </Droppable>
  );
}
const ListItemsContainers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  border: solid 5px #ffffff;
  border-radius: 5px;
  padding: 10px 10px;
  margin: 5px;
  width: 275px;
`;

const ContainerItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid 2px #ffffff;
  border-radius: 5px;
  padding: 20px 20px;
  margin-bottom: 10px;
`;
