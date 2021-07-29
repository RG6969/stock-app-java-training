import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCompany from './components/company/AddCompany';
import CompanyList from './components/company/CompanyList';
import EditCompany from './components/company/EditCompany';
import AddSector from './components/sector/AddSector';
import EditSector from './components/sector/EditSector';
import SectorList from './components/sector/SectorList';
import AddStockExchange from './components/stock_exchange/AddStockExchange';
import EditStockExchange from './components/stock_exchange/EditStockExchange';
import ListStockExchange from './components/stock_exchange/ListStockExchange';
import ConnectSector from './components/company/ConnectSector';
import LinkStockExchange from './components/company/LinkStockExchange';
import AddStockPrice from './components/stock_price/AddStockPrice';
import ViewChart from './components/user/ViewChart';
import Companies from './components/user/Companies';
import StockExchanges from './components/user/StockExchanges';
import Sectors from './components/user/Sectors';
import SectorCompanies from './components/user/SectorCompanies';
import StockExchangeCompanies from './components/user/StockExchangeCompanies';
import ListIpo from './components/ipo/ListIpo';
import AddIpo from './components/ipo/AddIpo';
import EditIpo from './components/ipo/EditIpo';
import Login from './components/auth/Login';
import VerifyUser from './components/auth/VerifyUser';
import Signup from './components/auth/Signup';
import SignupComplete from './components/auth/SignupComplete'
import Account from './components/auth/Account';
import Company from './components/user/Company';
import AdminLogin from './components/auth/AdminLogin';
import SectorComp from './components/sector/SectorComp';
import AdminAccount from './components/auth/AdminAccount';
import StockCompanies from './components/stock_exchange/StockCompanies';
import CompareCompanies from './components/user/CompareCompanies';

import UserRoute from './components/routing/UserRoute';
import AdminRoute from './components/routing/AdminRoute';
import Home from './components/Home';


function App() {
  return (
    <Router>
    <ToastContainer/>
      <Switch>
        <UserRoute exact path="/companies" component={Companies}></UserRoute>
        <UserRoute exact path="/compare/companies" component={CompareCompanies}></UserRoute>
        <UserRoute exact path="/company/:id" component={Company}></UserRoute>
        <UserRoute exact path="/sectors" component={Sectors}></UserRoute>
        <Route exact path="/manage/companies/sector/:id" component={SectorComp}></Route>
        <UserRoute exact path="/companies/sector/:id" component={SectorCompanies}></UserRoute>
        <UserRoute exact path="/companies/stockExchange/:id" component={StockExchangeCompanies}></UserRoute>
        <UserRoute exact path="/stockExchanges" component={StockExchanges}></UserRoute>
        <AdminRoute exact path="/manage/companies/stockExchange/:id" component={StockCompanies}></AdminRoute>
        <AdminRoute exact path="/manage/stockexchanges" component={ListStockExchange}></AdminRoute>
        <AdminRoute exact path="/manage/stockexchange/add" component={AddStockExchange}></AdminRoute>
        <AdminRoute exact path="/manage/stockexchange/edit/:id" component={EditStockExchange}></AdminRoute>
        <AdminRoute exact path="/manage/ipos" component={ListIpo}></AdminRoute>
        <AdminRoute exact path="/manage/ipo/add" component={AddIpo}></AdminRoute>
        <AdminRoute exact path="/manage/ipo/edit/:id" component={EditIpo}></AdminRoute>
        <AdminRoute exact path="/manage/companies" component={CompanyList}></AdminRoute>
        <AdminRoute exact path="/manage/company/add" component={AddCompany}></AdminRoute>
        <AdminRoute exact path="/manage/company/connect-sector/:id" component={ConnectSector}></AdminRoute>
        <AdminRoute exact path="/manage/company/connect-stock-exchange/:id" component={LinkStockExchange}></AdminRoute>
        <AdminRoute exact path="/manage/company/edit/:id" component={EditCompany}></AdminRoute>
        <AdminRoute exact path="/manage/sectors" component={SectorList}></AdminRoute>
        <AdminRoute exact path="/manage/sector/add" component={AddSector}></AdminRoute>
        <AdminRoute exact path="/manage/sector/edit/:id" component={EditSector}></AdminRoute>
        <AdminRoute exact path="/manage/stock-prices" component={AddStockPrice}></AdminRoute>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/signup/complete" component={SignupComplete}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/admin/login" component={AdminLogin}></Route>
        <Route exact path="/verify/user/:id" component={VerifyUser}></Route>
        <Route exact path="/" component={Home}></Route>
        <UserRoute exact path="/account" component={Account}></UserRoute>
        <AdminRoute exact path="/admin/account" component={AdminAccount}></AdminRoute>
      </Switch>
    </Router>
  );
}

export default App;
