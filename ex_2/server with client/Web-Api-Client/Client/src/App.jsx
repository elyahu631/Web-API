import { Link, Route, Routes } from 'react-router-dom';
import PDeleteById from './pages/PDeleteById';
import PGetAllTremps from './pages/PGetAllTremps';
import PGetById from './pages/PGetById';
import PInsertTremp from './pages/PInsertTremp';
import PUpdateTremp from './pages/PUpdateTremp';

const apiUrl = 'http://localhost:56148/api/tremps/';

function App() {

  return (
    <div style={{ textAlign:"center",margin:"50px "}}>
      <div style={{display:"flex" ,justifyContent:"space-between"}}>
      <Link  to={"/"}>GetAll</Link>
      <Link to={"/GetById"}>GetById</Link>
      <Link to={"/InsertTremp"}>InsertTremp</Link>
      <Link to={"/UpdateById"}>UpdateById</Link>
      <Link to={"/DeleteById"}>DeleteById</Link>


      </div>

      <div >
      <Routes>
        <Route path="/" element={<PGetAllTremps apiUrl={apiUrl} />} />
        <Route path="/GetById" element={<PGetById apiUrl={apiUrl}/>} />
        <Route path="/InsertTremp" element={<PInsertTremp apiUrl={apiUrl}/>} />
        <Route path="/UpdateById" element={<PUpdateTremp apiUrl={apiUrl}/>} />
        <Route path="/DeleteById" element={<PDeleteById apiUrl={apiUrl}/>} />

      </Routes>
      </div>

    </div>
  );
}

export default App;
