// import logo from './logo.svg';
import './App.css';
import Form from './components/form/Form';
import { Provider, useSelector } from 'react-redux';
import { store } from './components/redux/store/store';
import Loader from './ui/loading/Loader';
import AllRoutes from './routers/AllRoutes';
import Login from './pages/Login';


function App() {
  const loading = useSelector(state => state?.form?.loading);

  return (
    <div className='font-inter'>
      {/* <Login /> */}
      <AllRoutes />
      {loading && <Loader />}
    </div>
  );
}

export default App;
