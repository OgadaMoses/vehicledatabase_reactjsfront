
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Vehiclelist from './components/Vehiclelist';

function App() {
  return (
    <div>
 <AppBar position="static">
  <Toolbar>
    <Typography variant="h6">
      Vehicle Shop
    </Typography>
  </Toolbar>

 </AppBar>
  <Vehiclelist />
    </div>
  );
}

export default App;
