import './App.css'
import { Route, Routes } from 'react-router'
import Header from './componets/header'
import Login from './apps/auth/presentation/view/Login';
import Admin from './apps/admin/presentation/view/Admin';
import Ticket from './apps/ticket/presentation/view/Tickets';
import Signup from './apps/auth/presentation/view/Signup';
import Update from './apps/admin/presentation/componets/Update';

function App() {

  return (
    <>
    
      <Routes>
        <Route path="/header" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={<Admin />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path='/ticket' element={<Ticket />} />
      </Routes>
        
    
    </>
  )
}

export default App;
