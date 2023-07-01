import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import EditNote from './pages/EditNote';

export const URL = process.env.REACT_APP_SERVER_URL;
function App() {
  return (
   <>
     <Routes>
      <Route path='/' element={<Home /> } />
      <Route path='/:_id' element={<EditNote />} />
     </Routes>
   </>
  );
}

export default App;
