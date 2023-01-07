import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "pages/Home";
import ProductInfo from "pages/ProductInfo";
import Dashboard from "pages/Dashboard";
import Login from "pages/Login";
import Checkout from "pages/Checkout";
import ProductUpdate from "pages/ProductUpdate";
import UserAccountInfo from "pages/UserAccountInfo";
import AddNewProduct from "pages/AddNewProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/product/:productId' element={<ProductInfo />} />
        <Route
          path='/admin/dashboard/product/:productId'
          element={<ProductUpdate />}
        />
        <Route path='/admin/dashboard/product/' element={<AddNewProduct />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/user/account' element={<UserAccountInfo />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
