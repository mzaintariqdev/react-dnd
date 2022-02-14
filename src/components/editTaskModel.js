import React, { useState } from 'react';
import { Button } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
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

function EditTaskModal({ taskIndex, listIndex, name }) {
  const { editTask } = useContext(ListContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [nameOfTask, setNameOFTask] = useState(name);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Button
        style={{ background: 'none', border: 'none' }}
        onClick={() => {
          openModal();
        }}
        icon={
          <EditOutlined
            style={{ fontSize: '25px', color: 'green', cursor: 'pointer' }}
          />
        }
      >
        {' '}
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 style={{ marginBottom: '5px' }}>
          Enter Channel Name{' '}
          <Button icon={<CloseOutlined />} onClick={closeModal}></Button>
        </h3>

        <input
          onChange={e => {
            setNameOFTask(e.target.value);
          }}
          value={nameOfTask}
        />
        <button
          onClick={() => {
            editTask(taskIndex, listIndex, nameOfTask);
            closeModal();
          }}
        >
          submit
        </button>
      </Modal>
    </div>
  );
}
export default EditTaskModal;
