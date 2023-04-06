import React, {useEffect, useState} from 'react';
import { SERVER_URL }  from '../constants.js';
import {DataGrid} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import {GridToolbarContainer, GridToolbarExport,gridClasses} 
  from '@mui/x-data-grid'; 

import AddVehicle from './AddVehicle.js';
import EditVehicle from './EditVehicle.js';

function Vehiclelist() {
    const updateVehicle = (vehicle, link) => {
        fetch(link,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(vehicle)
            })
            .then(response =>{
                if (response.ok) {
                    fetchVehicles();
                }
                else {
                    alert('Something went wrong!');
                }
            })
            .catch(err => console.error(err))
     }
    const [open, setOpen] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const columns = [
        {field: 'brand', headerName: 'Brand', width: 200},
        {field: 'model', headerName: 'Model', width: 200},
        {field: 'color', headerName: 'Color', width: 200},
        {field: 'vyear', headerName: 'Year', width: 200},
        {field: 'price', headerName: 'Price', width: 150},

    {
        field: '_links.vehicle.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
            <EditVehicle
              data={row}
              updateVehicle={updateVehicle} />
        },

        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
            <button
             onClick={() => onDelClick(row.id)}>Delete
             </button>
        }
    ];

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = ()=> {
        fetch(SERVER_URL + '/api/vehicles')
        .then(response => response.json ())
        .then(data => setVehicles (data._embedded.vehicles))
       
     .catch(err => console.error(err));
    }

    const addVehicle = (vehicle) => {
        fetch(SERVER_URL + '/api/vehicles', {
            method: 'POST',
            header: {'Content-type': 'application/json'},
            body: JSON.stringify (vehicle)
        })
        .then (response=> {
            if (response.ok) {
               fetchVehicles();
            }
            else  {
                alert ('Something went wrong!');
            }
        })
        .catch(err => console.error(err))
     }

    

    const onDelClick = (url) => {
        if (window.confirm("Are you sure you want to delete?")) {
        fetch(url, {method: 'DELETE'})
        .then(response => {
            if (response.ok) {
            fetchVehicles();
            setOpen(true);
            }
            else {
                alert('Something went wrong!');
            }
        })
        .catch(err => console.error(err))
     } 

     


    }

    return (
        <React.Fragment>
            <AddVehicle addVehicle={addVehicle}/>
        <div style={{height: 500, width: '100%'}}>
            <DataGrid
            rows={vehicles}
            columns={columns}
            disableRowSelectionOnClick={true}
            getRowId={row => row._links.self.href} />  

            <Snackbar 
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen (false)}
            message= "Vehicle deleted"
            />
        </div>
        </React.Fragment>
    );
}

export default Vehiclelist;