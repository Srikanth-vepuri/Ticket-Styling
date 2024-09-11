import {BrowserRouter,Link,NavLink,Route,Routes} from 'react-router-dom';
import { useState } from "react";
import TicketsFunction from './Ticket-Raising-Application/TicketsFunction.js';
import AdminLoginPageFunction from './Ticket-Raising-Application/AdminLoginPageFunction.js';
import SignInPageFunction from './Ticket-Raising-Application/SignInPageFunction.js';
import LoginPageFunction from './Ticket-Raising-Application/LoginPageFunction.js';
import UserSignInPageFunction from './Ticket-Raising-Application/UserSignInPageFunction.js';
import UserTicketFunction from './Ticket-Raising-Application/UserTicketFunction.js';
import ViewTickets from './Ticket-Raising-Application/ViewTickets.js';
import AdminDashBoardFunction from './Ticket-Raising-Application/AdminDashBoardFunction.js';
import RiseTicket from './Ticket-Raising-Application/RiseTicket.js';
import AdminDashBoardInOrderFunction from './Ticket-Raising-Application/AdminDashBoardInOrderFunction.js';
import UserLoginPageFunction from './Ticket-Raising-Application/UserLoginPageFunction.js';
import AuthContext from './Ticket-Raising-Application/AuthContext.js';

function App(){
  const [globalUsername,setUsername]=useState("")
  return(
    <>
       <BrowserRouter>
       <AuthContext.Provider value={{globalUsername:globalUsername,setUsername:setUsername}}>
       <Routes>
        <Route path="/" element={<LoginPageFunction></LoginPageFunction>}></Route>
        <Route path="/adminLogin" element={<AdminLoginPageFunction></AdminLoginPageFunction>}></Route>
        <Route path="/adminSignInPage" element={<SignInPageFunction></SignInPageFunction>}></Route>
        <Route path="/userLogin" element={<UserLoginPageFunction></UserLoginPageFunction>}></Route>
        <Route path="/userSignIn" element={<UserSignInPageFunction></UserSignInPageFunction>}></Route>
        <Route path="/adminDashboard" element={<AdminDashBoardFunction></AdminDashBoardFunction>}></Route>
        <Route path="/adminDashboardInOrder" element={<AdminDashBoardInOrderFunction></AdminDashBoardInOrderFunction>}></Route>
        <Route path="/tickets" element={<TicketsFunction></TicketsFunction>}></Route>
        <Route path="/userTicket" element={<UserTicketFunction></UserTicketFunction>}></Route>
        <Route path="/viewTicket" element={<ViewTickets></ViewTickets>}></Route>
        <Route path="/riseTicket" element={<RiseTicket></RiseTicket>}></Route>
        </Routes>
        </AuthContext.Provider>
        </BrowserRouter>
    </>
  )
}
export default App;