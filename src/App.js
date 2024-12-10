
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogBook from './Component/LogBook';
import Login from './Component/Login';
import Edit from './Component/Edit';
import AddContractor from './Component/AddContractor';
import ContractorsTable from './Component/ContractorsTable';
import EditContractor from './Component/EditContractor';
import AddVehical from './Component/AddVehical';
import VehicalTable from './Component/VehicalTable';
import EditVehical from './Component/EditVehical';

function App() {
  return (

    <>
      <div >
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/logbook" element={<LogBook />} /> 
            <Route path="/editlog" element={<Edit />} /> 
            <Route path="/addcontractor" element={<AddContractor />} />
            <Route path="/contractortable" element={<ContractorsTable />} />
            <Route path="/vehicaltable" element={<VehicalTable />} />
            <Route path="/editcontractor" element={<EditContractor />} /> 
            <Route path="/editvehical" element={<EditVehical />} /> 
            <Route path="/addvehical" element={<AddVehical />} />
           
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
