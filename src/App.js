import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import EmpListing from './EmpListring';
import EmpCreate from './EmpCreate';
import EmpDetail from './EmpDetail';
import EmpEdit from './EmpEdit';

function App() {
  return (
    <div className="App">
      <h1>React JS CRUD Opertations</h1>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmpListing />} />
          <Route path='/employee/create' element={<EmpCreate />} />
          <Route path='/employee/detail/:empid' element={<EmpDetail />} />
          <Route path='/employee/edit/:empid' element={<EmpEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
