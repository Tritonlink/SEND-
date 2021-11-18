import * as React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/'>
        <Route path="hehe" element={<><pre>hehe</pre></>}></Route>
      </Route>
      </Routes>
    </Router>
  );
}

export default App;
