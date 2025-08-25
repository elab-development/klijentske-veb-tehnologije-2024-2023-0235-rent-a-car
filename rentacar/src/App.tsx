import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Contact from './pages/Contact';
import Popular from './pages/Popular';

function App() {
  return (
    <div className='bg-slate-50'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cars' element={<Cars />} />
          <Route path='/cars/:id' element={<CarDetails />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/popular' element={<Popular />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
