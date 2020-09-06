import React from 'react';
import Rotas from './rotas'
import '../bootstrap/bootswatch/pulse/bootstrap.css'
import '../views/custom.css'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

class App extends React.Component {



  render(){
    return (
      <>
      <div >
        <Rotas/>
      </div>      
      </>
    );
  }
}

export default App;
