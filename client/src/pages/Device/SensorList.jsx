import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';



const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 100 },
  { field: 'position', headerName: 'Position', width: 150 },
  { field: 'data', headerName: 'Data' ,width: 150 },
  { field: 'state', headerName: 'Working State', width: 150,},
  {
    field: 'Control',
    headerName: 'Control',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    renderCell: (params) => (
        <div>
          <button onClick={() => handleTurnOnOff(params.row.id)}>
            {params.row.state === 'Normal' ? 'Turn On' : 'Turn Off'}
          </button>
        </div>
      ),
  },
];

const rows = [
  { id: 1,name: 'DHT20' ,state: 'Normal', position: '1', data: '30°C/45%' },
  { id: 2,name: 'DHT20' , state: 'Normal', position: '2', data: '30°C/45%' },
  { id: 3,name: 'DHT20' , state: 'Normal', position: '3', data: '30°C/45%' },
  { id: 4,name: 'DHT20' , state: 'Normal', position: '4', data: '30°C/45%' },
  { id: 5,name: 'DHT20' , state: 'Inactive', position: '5', data: 'null' },
  { id: 6,name: 'DHT20' , state: 'Normal', position: '6', data: '30°C/45%' },
  { id: 7,name: 'DHT20' , state: 'Normal', position: '7', data: '30°C/45%' },
  { id: 8,name: 'DHT20' , state: 'Normal', position: '8', data: '30°C/45%' },
  { id: 9 ,name: 'DHT20', state: 'Normal', position: '9', data: '30°C/45%' },
];

const handleTurnOnOff = (id) => {
    // Implement the logic to turn on/off based on the ID
    // You can update the 'state' property in your 'rows' data accordingly
    // For example, you can use state management like React's useState and useEffect here.
  };

export default function SensorList() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}