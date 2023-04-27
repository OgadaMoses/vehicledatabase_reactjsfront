import React, {useEffect, useState} from 'react';
import { SERVER_URL }  from '../constants.js';
import {DataGrid} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import {GridToolbarContainer, GridToolbarExport,gridClasses} 
  from '@mui/x-data-grid'; 
  import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import AddVehicle from './AddVehicle.js';
import EditVehicle from './EditVehicle.js';

function Vehiclelist() {
    const updateVehicle = (vehicle, link) => {
        const token = sessionStorage.getItem("jwt");

        fetch(link,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json',
                'Authorization' :token
            },
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
            <IconButton onClick={() => onDelClick(row.id)}>
                <DeleteIcon color="error" />
             </IconButton>
        }
    ];

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = ()=> {
        const token = sessionStorage.getItem("jwt");

        fetch(SERVER_URL + '/api/vehicles', {
           headers: {'Authorization' : token}
        })
        .then(response => response.json ())
        .then(data => setVehicles (data._embedded.vehicles))
        .catch(err => console.error(err));
    }

    const addVehicle = (vehicle) => {
        const token = sessionStorage.getItem("jwt");

        fetch(SERVER_URL + 'api/vehicles', {
            method: 'POST',
            header: {'Content-type': 'application/json',
            'Authorization' :token
           },
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
            const token = sessionStorage.getItem("jwt");

        fetch(url, {
            method: 'DELETE',
            headers: {'Authorization' :token}
        })
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
            <Stack mt={2} mb={2}> 
            <AddVehicle addVehicle={addVehicle}/>
             </Stack> 
        <div style={{height: 500, width: '100%'}}>
            <DataGrid
            rows={vehicles}
            columns={columns}
            disableRowSelectionOnClick={true}
            getRowId={row => row._links.self.href} 
            components={{Toolbar: CustomToolbar}} 
            /> 
            

            <Snackbar 
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen (false)}
            message= "Vehicle deleted"
            />
        </div>
        </React.Fragment>
    );

    function CustomToolbar() {
        return (
            <GridToolbarContainer
               className={gridClasses.toolbarContainer}>
               <GridToolbarExport />
            </GridToolbarContainer>
        );
    }
}



export default Vehiclelist;