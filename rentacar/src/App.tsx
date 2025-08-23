import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Contact from './pages/Contact';

function App() {
  return (
    <div className='bg-slate-50'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cars' element={<Cars />} />
          <Route path='/cars/:id' element={<CarDetails />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
