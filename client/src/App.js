// import logo from './logo.svg';
import './App.css';
import Loader from './ui/loading/Loader';
import AllRoutes from './routers/AllRoutes';
import { useSelector } from 'react-redux';


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
