import React, {useEffect, useState} from 'react'

function Vehiclelist() {
    const [vehicles, setVehicles] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:8080/api/vehicles')
        .then(response => response.json ())
        .then(data => setVehicles (data._embedded.vehicles))
        .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <table>
                <tbody>
                    {
                        vehicles.map((vehicle, index) =>
                        <tr key={index}>
                            <td>{vehicle.brand}</td>
                            <td>{vehicle.model}</td>
                            <td>{vehicle.color}</td>
                            <td>{vehicle.vyear}</td>
                            <td>{vehicle.price}</td>
                            <td>{vehicle.registerNumber}</td>
                        </tr>)   
                    }
                    </tbody>
            </table>
        </div>
    );
}

export default Vehiclelist;