import React, {useState,useCallback} from 'react';
import './App.css';
import Planificador from './views/Planificador'

const App = () => {
  const [personas,setPersonas] = useState([])
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  return ( 
  <div className="App">
    <h1>Planificador horario semanal</h1>
    <Planificador
      personas = {personas}
      setPersonas={setPersonas}
      forceUpdate={forceUpdate}
    />
    <footer>
      <p>Idea de María de los Angeles Yari y desarrollado por Alexander Alzate.<br/>
        Sitio web: <a href="alexalzate.com">alexalzate.com</a>
      </p>
    </footer>
  </div> 
);
}
 
export default App;

