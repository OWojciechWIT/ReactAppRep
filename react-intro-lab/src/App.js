import './App.css';
import Subject from './components/subject';

function App() {
  return (
    <div className="container">
      <h1>Hi, I'm a React App</h1>
      <Subject title="Web App Development 2" year="Year 3" lecturer="Rosanne Birney">
        Read more about this subject...
      </Subject>
      <Subject title="NoSQL Databases" year="Year 3" lecturer="T.J. McDonald">
        Read more about this subject...
      </Subject>
      <Subject title="Digital Graphic Design" year="Year 3" lecturer="Sinead O' Riordan">
        Read more about this subject...
      </Subject>
    </div>
  );
}

export default App;
