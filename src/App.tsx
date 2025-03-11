import './App.css'
import { Route, Routes } from 'react-router'
import Login from './apps/auth/presentation/view/Login';
import Admin from './apps/admin/presentation/view/Admin';
import Ticket from './apps/ticket/presentation/view/Tickets';
import Signup from './apps/auth/presentation/view/Signup';
import Update from './apps/admin/presentation/componets/Update';
import { Landing } from './componets/landing';
import ProtectedRoute from './componets/protect';

function App() {

  return (
    <>
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/admin" element={<ProtectedRoute component={Admin} allowedRoles={["admin"]} />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/ticket" element={<ProtectedRoute component={Ticket} allowedRoles={["user"]} />} />
        <Route path='/' element={<Landing />} />
      </Routes>
        
    
    </>
  )
}

export default App;
