import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions  from '@mui/material/DialogActions';
import DialogContent  from '@mui/material/DialogContent';
import DialogTitle  from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function EditVehicle (props) {
    const [open,setOpen] = useState(false);
    const [vehicle, setVehicle] = useState({
        brand:'', model: '', color:'',
        vyear: '', price:''
    });

    const handleClickOpen = () => {
        setVehicle({
            brand: props.data.row.brand,
            model: props.data.row.model,
            color: props.data.row.color,
            vyear: props.data.row.vyear,
            price: props.data.row.price
        })
        setOpen (true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setVehicle({...vehicle,
        [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        props.updateVehicle(vehicle, props.data.id);
        handleClose();
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <EditIcon color="primary" />
                </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Vehicle</DialogTitle>
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
                    <Button  onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditVehicle;