import React, { useState } from 'react';
import { Button } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useContext } from 'react';

import { ListContext } from '../contexts/ListContext';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'gray',
    color: 'white'
  }
};

function CreateTaskModal({ index }) {
  const { AddNameField } = useContext(ListContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setName('');
    setIsOpen(false);
  }

  return (
    <div>
      <Button
        onClick={() => {
          openModal();
        }}
        style={{ marginRight: '5px', background: 'none', border: 'none' }}
        icon={
          <PlusOutlined
            style={{ fontSize: '20px', color: 'blue', cursor: 'pointer' }}
          />
        }
      ></Button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 style={{ marginBottom: '5px' }}>
          Enter Task Name{' '}
          <Button
            icon={
              <CloseOutlined
                style={{
                  cursor: 'pointer',
                  background: 'gray',
                  border: 'none',
                  color: 'white',
                  fontSize: '15px'
                }}
              />
            }
            onClick={closeModal}
          ></Button>
        </h3>

        <input
          onChange={e => {
            setName(e.target.value);
          }}
          value={name}
        />
        <button
          style={{ color: 'white', backgroundColor: 'green' }}
          onClick={() => {
            AddNameField(index, name);
            closeModal();
          }}
        >
          submit
        </button>
      </Modal>
    </div>
  );
}
export default CreateTaskModal;
