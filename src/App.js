// import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import Header from './components/Layout/DefaultLayout/Header/Header';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  // Link
} from "react-router-dom";
import Home from './pages/Home';
import DownloadLink from './pages/DownloadLink';
import Store from './pages/stores';
import RegisterIntroduction from './pages/RegisterIntroduction';
import DefaultLayout from './components/Layout/DefaultLayout';
import CreateFood from './pages/stores/CreateFood';
import StoreRegister from './pages/stores/StoreRegister';
import ViewFood from './pages/stores/ViewFood';
import Topping from './pages/stores/Topping';


function App() {
  
  return (
    <>
    {/* <CreateFood/> */}
    {/* <StoreRegister /> */}
    
      <BrowserRouter>

        <Routes>
          <Route exact="true" path="/" element={<><Header/><Home /></>}></Route>
          <Route path="/downloadLink" element={<><Header/><DownloadLink /></>}></Route>
          <Route path="/introduction" element={<><Header/><RegisterIntroduction /></>}></Route>          
          <Route path="/login" element={<Login/>}></Route>
          <Route path='/store' element={<><Store /></>}></Route>
          <Route path='/storeRegister' element={<><Header/><StoreRegister /></>}></Route>
          <Route exact path='/store/food' element={<DefaultLayout><ViewFood/></DefaultLayout>}></Route>
          <Route path='/store/food/createFood' element={<DefaultLayout><CreateFood/></DefaultLayout>}></Route>
          <Route path='/store/topping' element={<DefaultLayout><Topping/></DefaultLayout>}></Route>
          {/* <Route path='/store/food/updateFood/' element={<DefaultLayout><CreateFood/></DefaultLayout>}></Route> */}
          
        </Routes>
        
      </BrowserRouter>
    </>

  );
}
export default App;
