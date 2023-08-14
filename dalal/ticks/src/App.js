import './App.css';
import View from './components/View';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <View />
      <ToastContainer />
    </div>
  );
}

export default App;
