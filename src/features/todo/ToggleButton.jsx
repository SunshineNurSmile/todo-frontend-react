import { useToggleStatusMutation } from './todosApiSlice';

const ToggleButton = ({ todoId, status }) => {
  const [toggleStatus] = useToggleStatusMutation();

  return (
    <button
      className="btn btn-secondary"
      onClick={() => {
        toggleStatus(todoId);
      }}
    >
      {status ? 'Mark Unfinished' : 'Mark Finished'}
    </button>
  );
};

export default ToggleButton;
