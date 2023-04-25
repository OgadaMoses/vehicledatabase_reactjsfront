import {render, screen, fireEvent} from '@testing-library/react';
import App from './App';
import TestRenderer from 'react-test-renderer';
import AddVehicle from './components/AddVehicle';

test('renders a snapshot', () => {
  const tree = TestRenderer.create
        (<AddVehicle/>).toJSON();
    expect(tree).toMatchSnapshot();    
});

test('open add vehicle modal form',async () =>{
     render (<App />);
     fireEvent.click(screen.getByText("New Vehicle"));
     expect(screen.getByRole('dialog')).toHaveTextContent ('New Vehicle');
});