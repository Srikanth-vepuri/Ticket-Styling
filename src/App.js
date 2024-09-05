import {BrowserRouter,Link,NavLink,Route,Routes} from 'react-router-dom'
import AdminLoginPageFunction from './Ticket-Raising-Application/AdminLoginPageFunction.js';
import AdminDashboard from './Ticket-Raising-Application/AdminDashBoard.js';
import TicketsFunction from './Ticket-Raising-Application/TicketsFunction.js';
import SignInPageFunction from './Ticket-Raising-Application/SignInPageFunction.js';
import AdminDashBoardInOrder from './Ticket-Raising-Application/AdminDashBoardInOrder.js';
// import './Ticket-Raising-Application/Styles/AdminDashboard.css';
// import './Ticket-Raising-Application/Styles/AdminLoginClass.css';
// import './Ticket-Raising-Application/Styles/AdminDashBoardInOrder.css';
// import './Ticket-Raising-Application/Styles/ClosedTickets.css';
// import './Ticket-Raising-Application/Styles/OpenedTickets.css';
// import './Ticket-Raising-Application/Styles/SignInPage.css';
// import './Ticket-Raising-Application/Styles/TicketsPageClass.css';
function App(){
  return(
    <>
       { <BrowserRouter>
       <Link to="/"></Link>
       <Link to="/tickets"></Link>
       <Link to="/signInPage"></Link>
       <Link to="/adminDashboard"></Link>
       <Link to="adminDashboardInOrder"></Link>
       <Routes>
        <Route path="/" element={<AdminLoginPageFunction></AdminLoginPageFunction>}></Route>
        <Route path="/tickets" element={<TicketsFunction></TicketsFunction>}></Route>
        <Route path="signInPage" element={<SignInPageFunction></SignInPageFunction>}></Route>
        <Route path="/adminDashboard" element={<AdminDashboard></AdminDashboard>}></Route>
        <Route path="adminDashboardInOrder" element={<AdminDashBoardInOrder></AdminDashBoardInOrder>}></Route>
        </Routes>
        </BrowserRouter> }

    </>
  )
}
export default App