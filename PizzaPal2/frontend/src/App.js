import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Layout from './components/Layout/Layout';

function App() {

  return (
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
  );
}

export default App;
