import React, {useEffect, useState} from 'react';
import { SERVER_URL }  from '../constants.js';
import {DataGrid} from '@mui/x-data-grid';

function Vehiclelist() {
    const [vehicles, setVehicles] = useState([]);
    const columns = [
        {field: 'brand', headerName: 'Brand', width: 200},
        {field: 'model', headerName: 'Model', width: 200},
        {field: 'color', headerName: 'Color', width: 200},
        {field: 'vyear', headerName: 'Year', width: 200},
        {field: 'price', headerName: 'Price', width: 150},
    ];
    
    useEffect(() => {
        fetch(SERVER_URL + 'api/vehicles')
        .then(response => response.json ())
        .then(data => setVehicles (data._embedded.vehicles))
        .catch(err => console.error(err));
    }, []);

    return (
        <div style={{height: 500, width: '100%'}}>
            <DataGrid
            rows={vehicles}
            columns={columns}
            getRowId={row => row._links.self.href} />  
        </div>
    );
}

export default Vehiclelist;