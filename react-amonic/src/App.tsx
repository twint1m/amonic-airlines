import React from 'react';
import Header from "./components/Header";
import Register from './components/pages/Register'
import AddUser from './components/pages/AddUser'
import UsersInfoTable from './components/pages/UsersInfo'
import EditUserForm from './components/pages/EditUser'
import UsersActivity from './components/pages/UserActivity'
import {Outlet} from 'react-router-dom'
function App() {
  return (
      <div className="App">
          <Header/>
          <Outlet/>
          {/*<Register/>*/}
          {/*<UsersInfoTable/>*/}
          {/*<AddUser/>*/}
          {/*<EditUserForm/>*/}
          {/*<UsersActivity/>*/}
      </div>
  );
}

export default App;
