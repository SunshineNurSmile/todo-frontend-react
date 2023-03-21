import { selectTodoById } from './todosApiSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ToggleButton from './ToggleButton';
import React from 'react';

const Todo = ({ todoId }) => {
  const todo = useSelector((state) => selectTodoById(state, todoId));

  const navigate = useNavigate();

  const onEditClicked = () => {
    navigate(`/edit/${todoId}`);
  };

  return (
    <div className="card w-96 bg-neutral text-neutral-content shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{todo.title}</h2>
        <p>{todo.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={onEditClicked}>
            Edit
          </button>
          <ToggleButton todoId={todoId} status={todo.status} />
        </div>
      </div>
    </div>
  );
};

const memo = React.memo(Todo);

export default memo;
