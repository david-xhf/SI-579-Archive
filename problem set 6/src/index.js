import ReactDOM from 'react-dom/client';
import TodoList from './TodoList';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <><h1 className='container d-flex justify-content-center my-2'>PS6: You don't really know a framework until you TODO LIST</h1><TodoList /></>
);
