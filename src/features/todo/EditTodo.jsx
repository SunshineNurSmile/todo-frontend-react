import {
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  selectTodoById,
} from './todosApiSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const EditTodo = () => {
  const { todoId } = useParams();

  const todo = useSelector((state) => selectTodoById(state, todoId));

  const navigate = useNavigate();

  const [title, setTitle] = useState(todo?.title);
  const [description, setDescription] = useState(todo?.description);

  const [updateTodo, { isLoading: isUpdateLoading }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleteLoading }] = useDeleteTodoMutation();

  const onSaveClicked = async (e) => {
    e.preventDefault();
    const updatedTodo = {
      ...todo,
      todoId,
      title,
      description,
    };

    try {
      await updateTodo(updatedTodo).unwrap();
      setTitle('');
      setDescription('');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const onDeleteClicked = async () => {
    try {
      await deleteTodo(todoId).unwrap();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (isDeleteLoading || isUpdateLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center mt-4">
      <form className="flex flex-col gap-4" onSubmit={onSaveClicked}>
        <div className="form-control">
          <label className="input-group">
            <span className="w-full">Title</span>
            <input
              type="text"
              className="input input-bordered"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>
        </div>
        <div className="form-control">
          <textarea
            className="textarea textarea-bordered"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        <button className="btn btn-secondary" onClick={onDeleteClicked}>
          Delete
        </button>
        <button type="submit" className="btn btn-primary w-full">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
