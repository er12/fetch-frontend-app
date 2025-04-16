import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Location } from '../api/interfaces';

const columns: GridColDef[] = [
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'county', headerName: 'County', width: 130 },
    { field: 'latitude', headerName: 'Latitude', type: 'number', width: 130 },
    { field: 'longitude', headerName: 'Longitude', type: 'number', width: 130 },
    { field: 'state', headerName: 'State', width: 35 },
    { field: 'zip_code', headerName: 'ZipCode', width: 130 },

];


interface LocationsDataTableProps {
    locations: Location[];
}

const paginationModel = { page: 0, pageSize: 25 };

const LocationsDataTable: React.FC<LocationsDataTableProps> = ({ locations }) => {
    console.log(locations);

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                getRowId={(row: Location) => `${row.city}-${row.sate}-${row.zip_code}`}
                rows={locations}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 25]}
                checkboxSelection
                sx={{ border: 0 }}

            />
        </Paper>
    );
}

export default LocationsDataTable;
