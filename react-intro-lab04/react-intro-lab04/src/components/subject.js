import React from 'react';
import Subject from './components/subject';


const subject = () => {

    return (
        <p>This is a subject!</p>
    )
}
function App() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <Subject />
      </div>
    );
  }



export default subject;
