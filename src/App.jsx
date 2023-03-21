import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Error from './components/Error';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import TodosList from './features/todo/TodosList';
import CreateTodo from './features/todo/CreateTodo';
import EditTodo from './features/todo/EditTodo';

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<TodosList />} />
        <Route path="/create" element={<CreateTodo />} />
        <Route path="/edit/:todoId" element={<EditTodo />} />
      </Route>
      
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
