import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import PizzaPal from './containers/PizzaPal/PizzaPal';
import Layout from './components/Layout/Layout';


function App() {
  return (
    <Layout>
      <PizzaPal />
    </Layout>
  );
}

export default App;
