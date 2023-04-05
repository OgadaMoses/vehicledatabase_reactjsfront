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
}