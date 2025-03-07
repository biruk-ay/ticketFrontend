import './App.css'
import { Route, Routes } from 'react-router'
import Header from './componets/header'
import Loading from './componets/loading';
import Login from './apps/auth/presentation/view/Login';
import Admin from './apps/admin/presentation/view/Admin';
import Ticket from './apps/ticket/presentation/view/Tickets';
import Signup from './apps/auth/presentation/view/Signup';

function App() {

  return (
    <>
    
      <Routes>
        <Route path="/header" element={<Header />} />
        {/* <Route path="/loading" element={<Loading />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/ticket' element={<Ticket />} />
      </Routes>
        
    
    </>
  )
}

export default App;
