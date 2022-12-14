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
import UpdateFood from './pages/stores/UpdateFood';
import StoreRegister from './pages/stores/StoreRegister';
import ViewFood from './pages/stores/ViewFood';
import Topping from './pages/stores/Topping';
import ViewOrders from './pages/stores/ViewOrders';
import OrderDetail from './pages/stores/OrderDetail';
import Reviews from './pages/stores/Reviews';
import ViewVouchers from './pages/stores/ViewVouchers';
import CreateVoucher from './pages/stores/CreateVoucher';
import Statistics from './pages/stores/Statistics';
import UpdateVoucher from './pages/stores/UpdateVoucher';
import Notify from './Notify';
import ForgotPassword from './pages/forgotPassword';
import ChangePassword from './pages/forgotPassword/ChangePassword';


function App() {

  return (
    <>
      <BrowserRouter>
        <Notify />

        <Routes>
          <Route exact="true" path="/" element={<><Header /><Home /></>}></Route>
          <Route path="/downloadLink" element={<><Header /><DownloadLink /></>}></Route>
          <Route path="/introduction" element={<><Header /><RegisterIntroduction /></>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/changePass" element={<ChangePassword />}></Route>
          <Route path='/store' element={<><Store /></>}></Route>
          <Route path='/storeRegister' element={<><Header /><StoreRegister /></>}></Route>
          <Route exact='true' path='/store/food' element={<DefaultLayout><ViewFood /></DefaultLayout>}></Route>
          <Route path='/store/food/createFood' element={<DefaultLayout><CreateFood /></DefaultLayout>}></Route>
          <Route path='/store/food/updateFood/:id' element={<DefaultLayout><UpdateFood /></DefaultLayout>}></Route>
          <Route path='/store/topping' element={<DefaultLayout><Topping /></DefaultLayout>}></Route>
          <Route exact='true' path='/store/orders' element={<DefaultLayout><ViewOrders /></DefaultLayout>}></Route>
          <Route path='/store/order/detail/:id' element={<DefaultLayout><OrderDetail /></DefaultLayout>}></Route>
          <Route path='/store/reviews' element={<DefaultLayout><Reviews /></DefaultLayout>}></Route>
          <Route exact='true' path='/store/vouchers' element={<DefaultLayout><ViewVouchers /></DefaultLayout>}></Route>
          <Route path='/store/vouchers/createVoucher' element={<DefaultLayout><CreateVoucher /></DefaultLayout>}></Route>
          <Route path='/store/vouchers/updateVoucher/:id' element={<DefaultLayout><UpdateVoucher /></DefaultLayout>}></Route>
          <Route path='/store/statistics' element={<DefaultLayout><Statistics /></DefaultLayout>}></Route>
          {/* <Route path='/store/food/updateFood/' element={<DefaultLayout><CreateFood/></DefaultLayout>}></Route> */}

        </Routes>

      </BrowserRouter>
    </>

  );
}
export default App;
