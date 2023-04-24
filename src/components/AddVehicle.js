import React, {useState} from 'react';
import Dialog  from '@mui/material/Dialog';
import DialogActions  from '@mui/material/DialogActions';
import DialogContent  from '@mui/material/DialogContent';
import DialogTitle  from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


function AddVehicle (props) {
    const [open, setOpen] = useState(false);
    const [vehicle, setVehicle] = useState ( {
        brand: '',
        model: '',
        color: '',
        vyear:'',
        price: '',
    });
    const handleClickOpen = () => {
        setOpen (true);
    };

    const handleClose = () => {
        setOpen (false);
    };

    const handleChange = (event) => {
        setVehicle({...vehicle, [event.target.name]:
            event.target.value});
    }

    const handleSave = () => {
        props.addVehicle(vehicle);
        handleClose();
     }


    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>New Vehicle
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Vehicle</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="Brand" name="brand"
                        autoFocus
                        variant="standard" value={vehicle.brand}
                        onChange={handleChange}/>
                        <TextField label="Model" name="model"
                        autoFocus
                        variant="standard" value={vehicle.model}
                        onChange={handleChange}/>
                        <TextField label="Color" name="color"
                        autoFocus
                        variant="standard" value={vehicle.color}
                        onChange={handleChange}/>
                        <TextField label="Year" name="vyear"
                        autoFocus
                        variant="standard" value={vehicle.vyear}
                        onChange={handleChange}/>
                        <TextField label="Price" name="price"
                        autoFocus
                        variant="standard" value={vehicle.price}
                        onChange={handleChange}/>
                        </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
       </div>

    );
}

export default AddVehicle;