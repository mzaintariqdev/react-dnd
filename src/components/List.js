import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useContext } from 'react';
import ListItems from './ListItems';

import { ListContext } from '../contexts/ListContext';
import { DeleteFilled, HolderOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Modals from './createColumnModal';
import CreateTaskModal from './createTaskModal.';
import EditColumnModal from './editColumnModal';
import { Button } from 'antd';

export function List() {
  const { list, OnDragEnd, deleteListField } = useContext(ListContext);

  return (
    <DragDropContext onDragEnd={OnDragEnd}>
      <Droppable droppableId="List" direction="horizontal" type="LIST">
        {provided => (
          <Container>
            <Navbar>
              <h1>Task with dnd</h1>
              <Modals />
            </Navbar>
            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
              {list.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {provided => (
                      <ListContainerItems
                        id={index}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <ColumnHeader>
                          <ColumnHeaderSection>
                            <HolderOutlined
                              style={{ fontSize: '30px', cursor: 'pointer' }}
                              {...provided.dragHandleProps}
                            />
                            <h2 style={{ marginLeft: '5px' }}>{name}</h2>
                          </ColumnHeaderSection>

                          <ColumnHeaderSection>
                            <Button
                              style={{
                                marginRight: '5px',
                                background: 'none',
                                border: 'none'
                              }}
                              icon={
                                <DeleteFilled
                                  style={{
                                    color: 'red',
                                    background: 'none',
                                    cursor: 'pointer',
                                    fontSize: '30px'
                                  }}
                                />
                              }
                              onClick={() => deleteListField(index)}
                            ></Button>
                            <CreateTaskModal index={index} />
                            <EditColumnModal index={index} name={name} />
                          </ColumnHeaderSection>
                        </ColumnHeader>

                        <ListItems listIndex={index} />
                      </ListContainerItems>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ListContainer>
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const Navbar = styled.div`
  width: 100%;

  background: black;
  color: white;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 12px;
  }
`;

const Container = styled.div`
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
`;
const ColumnHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;
const ColumnHeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100vw;
  max-width: 100vw;
`;
const ListContainerItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  list-style: none;
  border: solid 5px #ffffff;
  border-radius: 5px;
  padding: 20px 20px;
  margin: 10px;
  width: 325px;
`;
