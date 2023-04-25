import {render, screen, fireEvent} from '@testing-library/react';
import App from './App';

test('open add vehicle modal form',async () =>{
     render (<App />);
     fireEvent.click(screen.getByText("New Vehicle"));
     expect(screen.getByRole('dialog')).toHaveTextContent ('New Vehicle');
});