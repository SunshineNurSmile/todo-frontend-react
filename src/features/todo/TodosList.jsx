import Spinner from '../../components/Spinner';
import Todo from './Todo';
import { useGetTodosQuery } from './todosApiSlice';
import { useSelector } from 'react-redux';
import { selectTodoIds } from './todosApiSlice';

const TodosList = () => {
  const { isLoading, isSuccess } = useGetTodosQuery();

  const todoIds = useSelector(selectTodoIds);

  let content = null;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = todoIds.map((id) => {
      return <Todo key={id} todoId={id} />;
    });
  }

  return (
    <div className="flex flex-col gap-2 jusitify-center items-center my-4">
      {content}
    </div>
  );
};

export default TodosList;
