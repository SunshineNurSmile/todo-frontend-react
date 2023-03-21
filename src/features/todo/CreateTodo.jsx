import { useCreateTodoMutation } from './todosApiSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '../../components/Spinner';

const CreateTodo = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const onSaveClicked = async (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      description,
    };

    try {
      await createTodo(newTodo).unwrap();
      setTitle('');
      setDescription('');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
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
            />
          </label>
        </div>
        <div className="form-control">
          <textarea
            className="textarea textarea-bordered"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add New Todo
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
