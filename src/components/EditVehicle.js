import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions  from '@mui/material/DialogActions';
import DialogContent  from '@mui/material/DialogContent';
import DialogTitle  from '@mui/material/DialogTitle';

function EditVehicle (props) {
    const [open,setOpen] = useState(false);
    const [vehicle, setVehicle] = useState({
        brand:'', model: '', color:'',
        vyear: '', price:''
    });

    const handleClickOpen = () => {
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

    }

    return (
        <div>
            <button onClick={handleClickOpen}>Edit</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Vehicle</DialogTitle>
                <DialogContent>
                    <input placeholder="Brand" name="brand"
                    value={vehicle.brand} onChange={handleChange}
                    /><br/>

                  <input placeholder="Model" name="model"
                    value={vehicle.brand} onChange={handleChange}
                    /><br/>

                  <input placeholder="Color" name="color"
                    value={vehicle.brand} onChange={handleChange}
                    /><br/>

                  <input placeholder="Year" name="vyear"
                    value={vehicle.brand} onChange={handleChange}
                    /><br/>

                  <input placeholder="Price" name="price"
                    value={vehicle.brand} onChange={handleChange}
                    /><br/>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button  onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditVehicle;