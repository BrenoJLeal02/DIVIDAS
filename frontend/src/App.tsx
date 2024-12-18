
import { MainRoutes } from './routes/MainRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
        <MainRoutes/>
      </Router>
      
    </div>
  );
}

export default App;
