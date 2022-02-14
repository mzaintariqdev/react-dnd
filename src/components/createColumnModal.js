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

function Modals({ index }) {
  const { AddListField } = useContext(ListContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [Name, setName] = useState('');
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
        style={{ color: 'white', cursor: 'pointer', background: 'green' }}
        icon={<PlusOutlined />}
        onClick={openModal}
      >
        {' '}
        Add Columns
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 style={{ marginBottom: '5px' }}>
          Enter Column Name
          <Button
            style={{ background: 'none' }}
            icon={
              <CloseOutlined
                style={{
                  cursor: 'pointer',
                  background: 'none',
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
          value={Name}
        />
        <button
          style={{
            cursor: 'pointer',
            color: 'white',
            backgroundColor: 'green'
          }}
          onClick={() => {
            AddListField(Name);
            closeModal();
          }}
        >
          submit
        </button>
      </Modal>
    </div>
  );
}
export default Modals;
