import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Location } from '../api/interfaces';
import { InputLabel } from '@mui/material';
import { useZipCodes } from '../api/context/ZipCodesContext';

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
    setZipCodes?: React.Dispatch<React.SetStateAction<string[]>>;
}

const paginationModel = { page: 0, pageSize: 25 };

const LocationsDataTable: React.FC<LocationsDataTableProps> = ({ locations }) => {

      const { setZipCodes } = useZipCodes();
    
    const addZipCode = (zip_code: string) => {
        
        setZipCodes?.((prev)=>([...prev, zip_code]));
    };

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            {
                locations.length
                    ? <InputLabel variant='outlined'>{`Click Rows to add Zip codes`}</InputLabel>
                    : null
            }
            <DataGrid
                getRowId={(row: Location) => `${row.city}-${row.state}-${row.zip_code}`}
                rows={locations}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[]}
                onRowClick={(params) => { addZipCode(params.row.zip_code); }}
                sx={{ border: 0 }}
                />
        </Paper>
    );
}

export default LocationsDataTable;
