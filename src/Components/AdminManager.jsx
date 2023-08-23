import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import "./AdminManager.css";
import { TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Table } from 'react-bootstrap';
import EditPermissison from './Permissions/EditPermission';

const boxStyle = {
    width: '200px',
    height: '200px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 0 10px 5px transparent',
    transition: 'box-shadow 0.3s ease',
    ':hover': {
        boxShadow: '0 0 10px 5px purple',
    },
};

const columns = [
    { id: 'numbers', label: '#', minWidth: 50 },
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'mobile', label: 'Mobile', minWidth: 100 },
    { id: 'kyc', label: 'KYC', minWidth: 100 },
    { id: 'edit', label: 'Edit Permission', minWidth: 150 },
];

function createData(numbers, id, name, mobile, kyc) {
    return { id, numbers, name, mobile, kyc };
}

const initialRows = [
    createData('Game-001', 'Player-1', 'Player 1', '+91 1234567890', 'Verified'),
    createData('Game-002', 'Player-2', 'Player 2', '+86 9876543210', 'Not Verified'),
    createData('Game-003', 'Player-3', 'Player 3', '+1 5551234567', 'Verified'),
    // Add more rows here...
];

const initialUpperList = [
    createData('Game-004', 'Player-4', 'Player 4', '+91 9876543210', 'Not Verified'),
    createData('Game-005', 'Player-5', 'Player 5', '+86 1234567890', 'Verified'),
    // Add more players here...
];

export default function AdminPanelTable() {
    const [page, setPage] = React.useState(0);
    const [upperList, setUpperList] = React.useState(initialUpperList); // Initialize the upperList state with data
    const [rows, setRows] = React.useState(initialRows);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const navigate = useNavigate();

    const handleEditPermission = (playerId) => {
        // Find the player in the current upperList array
        const playerIndex = upperList.findIndex((row) => row.id === playerId);

        if (playerIndex !== -1) {
            // Remove the player from the upperList array
            const updatedUpperList = [...upperList];
            const removedPlayer = updatedUpperList.splice(playerIndex, 1)[0];

            // Add the removed player to the rows array
            setRows([...rows, removedPlayer]);

            // Update the state with the modified arrays
            setUpperList(updatedUpperList);
        }
    };

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

    return (
        <>
            <div className="admin-manager">
                <div style={{ marginTop: "5%", textAlign: 'left', fontSize: '34px', color: "#29aad0", padding: '16px' }}>
                    All Admin List
                </div>
                <Paper sx={{ background: "transparent", border: "1px solid blue", width: '100%', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                        {columns.map((column) => (
                            <div
                                key={column.id}
                                style={{
                                    textAlign: "center",
                                    background: "transparent",
                                    color: "blue",
                                    minWidth: column.minWidth,
                                    fontWeight: 'bold',
                                    padding: '8px',
                                    borderBottom: '1px solid blue',
                                    borderRadius: "5px",
                                    boxShadow: '10px 1px  16px -10px blue',
                                    flex: 1,
                                }}
                            >
                                {column.label}
                            </div>
                            
                        ))}
                    </div>
                    {rows.map((row, index) => (
                        <div key={row.id} style={{ color: "#9695a0", display: 'flex', textAlign: "center", alignItems: 'center', padding: '8px' }}>
                            <div style={{ minWidth: columns[0].minWidth, padding: '8px', flex: 1 }}>
                                {index + 1}
                            </div>
                            <div style={{ color: "#9695a0", textAlign: "center", minWidth: columns[0].minWidth, padding: '8px', flex: 1 }}>{row.id}</div>
                            <div style={{ color: "#9695a0", textAlign: "center", minWidth: columns[1].minWidth, padding: '8px', flex: 1 }}>{row.name}</div>
                            <div
                                style={{

                                    textAlign: "center",
                                    minWidth: columns[3].minWidth,
                                    padding: '8px',
                                    flex: 1,
                                    color: columns[3].id === 'mobile' ? 'b#9695a0' : 'inherit',
                                }}
                            >
                                {row.mobile}
                            </div>
                            <div style={{ textAlign: "center", border: "1px sold black", borderRadius: "5px", textAlign: "center", border: "1px solid lime  ", color: "lime", minWidth: columns[4].minWidth, padding: '8px', flex: 1 }}>{row.kyc}</div>
                            <div style={{ textAlign: "center", minWidth: columns[5].minWidth, padding: '8px', flex: 1 }}>
                                <Button sx={{ color: "blue" }} variant="outlined" onClick={()=>navigate('/EditPermissison')}>
                                    Edit Permission
                                </Button>
                            </div>
                        </div>
                    ))}
                </Paper>
                

                <Paper sx={{ background: 'transparent', border: '1px solid blue', width: '100%', overflow: 'hidden' }}>
                    {/* Rendering code for the second table (upperList) */}
                    <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                        {columns.map((column) => (
                            <div
                                key={column.id}
                                style={{
                                    textAlign: 'center',
                                    background: 'transparent',
                                    color: 'blue',
                                    minWidth: column.minWidth,
                                    fontWeight: 'bold',
                                    padding: '8px',
                                    borderBottom: '1px solid blue',
                                    borderRadius: '5px',
                                    boxShadow: '10px 1px 16px -10px blue',
                                    flex: 1,
                                }}
                            >
                                {column.label}
                            </div>
                        ))}
                    </div>
                    {upperList.map((row, index) => (
                        <div key={row.id} style={{ color: 'blue', display: 'flex', textAlign: 'center', alignItems: 'center', padding: '8px' }}>
                            <div style={{ minWidth: columns[0].minWidth, padding: '8px', flex: 1 }}>
                                {index + 1}
                            </div>
                            <div style={{ color: 'blue', textAlign: 'center', minWidth: columns[0].minWidth, padding: '8px', flex: 1 }}>
                                {row.id}
                            </div>
                            <div style={{ color: 'blue', textAlign: 'center', minWidth: columns[1].minWidth, padding: '8px', flex: 1 }}>
                                {row.name}
                            </div>
                            <div style={{ textAlign: 'center', minWidth: columns[3].minWidth, padding: '8px', flex: 1, color: columns[3].id === 'mobile' ? 'blue' : 'inherit' }}>
                                {row.mobile}
                            </div>
                            <div style={{ textAlign: 'center', minWidth: columns[4].minWidth, padding: '8px', flex: 1 }}>
                                {row.kyc}
                            </div>
                            <div style={{ textAlign: 'center', minWidth: columns[5].minWidth, padding: '8px', flex: 1 }}>
                                <Button sx={{ boxStyle, color: 'purple', border: "1px solid purple" }} variant="outlined" onClick={() => handleEditPermission(row.id)}>
                                    Revoke Permission
                                </Button>
                            </div>
                        </div>
                    ))}
                </Paper>
            </div>
        </>
    );
}





// import * as React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import "./AdminManager.css"
// import { TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
// import { Table } from 'react-bootstrap';

// const boxStyle = {
//     width: '200px',
//     height: '200px',
//     backgroundColor: '#f0f0f0',
//     borderRadius: '10px',
//     boxShadow: '0 0 10px 5px transparent',
//     transition: 'box-shadow 0.3s ease',
//     ':hover': {
//         boxShadow: '0 0 10px 5px purple',
//     },
// };

// const columns = [
//     { id: 'numbers', label: '#', minWidth: 50 },
//     { id: 'id', label: 'ID', minWidth: 100 },
//     { id: 'name', label: 'Name', minWidth: 170 },
//     { id: 'mobile', label: 'Mobile', minWidth: 100 },
//     { id: 'kyc', label: 'KYC', minWidth: 100 },
//     { id: 'edit', label: 'Edit Permission', minWidth: 150 },
// ];

// function createData(numbers, id, name, mobile, kyc) {
//     return { id, numbers, name, mobile, kyc };
// }


// const initialRows = [
//     createData('Game-001', 'Player-1', 'Player 1', '+91 1234567890', 'Verified'),
//     createData('Game-002', 'Player-2', 'Player 2', '+86 9876543210', 'Not Verified'),
//     createData('Game-003', 'Player-3', 'Player 3', '+1 5551234567', 'Verified'),
//     // Add more rows here...
// ];

// const initialUpperList = [
//     createData('Game-004', 'Player-4', 'Player 4', '+91 9876543210', 'Not Verified'),
//     createData('Game-005', 'Player-5', 'Player 5', '+86 1234567890', 'Verified'),
// ];

// export default function AdminPanelTable() {
//     const [page, setPage] = React.useState(0);
//     const [upperList, setUpperList] = React.useState([initialUpperList]);
//     const [rows, setRows] = React.useState(initialRows);
//     const [rowsPerPage, setRowsPerPage] = React.useState(10);
   
//     const navigate = useNavigate();

//     const handleEditPermission = (playerId) => {
//         // Redirect to another page for editing player permission
//         navigate(`/edit-permission/${playerId}`);

//         const playerIndex = rows.findIndex((row) => row.id === playerId);

//         if (playerIndex !== -1) {
//             // Remove the player from the rows array
//             const updatedRows = [...rows];
//             const removedPlayer = updatedRows.splice(playerIndex, 1)[0];

//             // Add the removed player to the upperList
//             setUpperList([...upperList, removedPlayer]);

//             // Update the state with the modified arrays
//             setRows(updatedRows);
//         }
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };
//     const handleAddAgent = (row) => {


//         // Add the agent to the upper list
//         setUpperList([...upperList, row]);


//     };


//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value);
//         setPage(0);
//     };



//     return (
//         <> <div className="admin-manager">


//             <div style={{ marginTop: "5%", textAlign: 'left', fontSize: '34px', color: "#29aad0", padding: '16px' }}>
//                 All Admin List
//             </div>
//             <Paper sx={{ background: "transparent", border: "1px solid blue", width: '100%', overflow: 'hidden' }}>

                // <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                //     {columns.map((column) => (
                //         <div
                //             key={column.id}
                //             style={{
                //                 textAlign: "center",
                //                 background: "transparent",
                //                 color: "blue",
                //                 minWidth: column.minWidth,
                //                 fontWeight: 'bold',
                //                 padding: '8px',
                //                 borderBottom: '1px solid blue',
                //                 borderRadius: "5px",
                //                 boxShadow: '10px 1px  16px -10px blue',
                //                 flex: 1,
                //             }}
                //         >
                //             {column.label}
                //         </div>
                //     ))}
                // </div>
            //     {rows.map((row, index) => (
            //         <div key={row.id} style={{ color: "#9695a0", display: 'flex', textAlign: "center", alignItems: 'center', padding: '8px' }}>
            //             <div style={{ minWidth: columns[0].minWidth, padding: '8px', flex: 1 }}>
            //                 {index + 1}
            //             </div>
            //             <div style={{ color: "#9695a0", textAlign: "center", minWidth: columns[0].minWidth, padding: '8px', flex: 1 }}>{row.id}</div>
            //             <div style={{ color: "#9695a0", textAlign: "center", minWidth: columns[1].minWidth, padding: '8px', flex: 1 }}>{row.name}</div>
            //             <div
            //                 style={{

            //                     textAlign: "center",
            //                     minWidth: columns[3].minWidth,
            //                     padding: '8px',
            //                     flex: 1,
            //                     color: columns[3].id === 'mobile' ? 'b#9695a0' : 'inherit',
            //                 }}
            //             >
            //                 {row.mobile}
            //             </div>
            //             <div style={{ textAlign: "center", border: "1px sold black", borderRadius: "5px", textAlign: "center", border: "1px solid lime  ", color: "lime", minWidth: columns[4].minWidth, padding: '8px', flex: 1 }}>{row.kyc}</div>
            //             <div style={{ textAlign: "center", minWidth: columns[5].minWidth, padding: '8px', flex: 1 }}>
            //                 <Button sx={{ color: "blue" }} variant="outlined" onClick={() => handleEditPermission(row.id)}>
            //                     Edit Permission
            //                 </Button>
            //             </div>
            //         </div>
            //     ))}
            // </Paper>
// // ... Other code ...

//             <Paper sx={{ background: 'transparent', border: '1px solid blue', width: '100%', overflow: 'hidden' }}>
//                 {/* ... Same as before ... */}
//                 {upperList.map((row, index) => (
//                     <div key={row.id} style={{ color: 'blue', display: 'flex', textAlign: 'center', alignItems: 'center', padding: '8px' }}>
//                         {/* ... Same as before ... */}
//                         <div style={{ textAlign: 'center', minWidth: columns[4].minWidth, padding: '8px', flex: 1 }}>
//                             {row.kyc}
//                         </div>
//                         <div style={{ textAlign: 'center', minWidth: columns[5].minWidth, padding: '8px', flex: 1 }}>
//                             <Button sx={{ boxStyle, color: 'purple', border: "1px solid purple" }} variant="outlined" onClick={() => handleEditPermission(row.id)}>
//                                 Revoke Permission
//                             </Button>
//                         </div>
//                     </div>
//                 ))}
//             </Paper>


//             {/* 
//                 <Paper sx={{ background: 'transparent', border: '1px solid blue', width: '100%', overflow: 'hidden' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
//                         {columns.map((column) => (
//                             <div
//                                 key={column.id}
//                                 style={{
//                                     textAlign: 'center',
//                                     background: 'transparent',
//                                     color: 'blue',
//                                     minWidth: column.minWidth,
//                                     fontWeight: 'bold',
//                                     padding: '8px',
//                                     borderBottom: '1px solid blue',
//                                     borderRadius: '5px',
//                                     boxShadow: '10px 1px  16px -10px blue',
//                                     flex: 1,
//                                 }}
//                             >
//                                 {column.label}
//                             </div>
//                         ))}
//                     </div>
//                     {rows.map((row, index) => (
//                         <div key={row.id} style={{ color: 'blue', display: 'flex', textAlign: 'center', alignItems: 'center', padding: '8px' }}>
//                             <div style={{ minWidth: columns[0].minWidth, padding: '8px', flex: 1 }}>
//                                 {index + 1}
//                             </div>
//                             <div style={{ color: 'blue', textAlign: 'center', minWidth: columns[0].minWidth, padding: '8px', flex: 1 }}>{row.id}</div>
//                             <div style={{ color: 'blue', textAlign: 'center', minWidth: columns[1].minWidth, padding: '8px', flex: 1 }}>{row.name}</div>
//                             <div style={{ textAlign: 'center', minWidth: columns[3].minWidth, padding: '8px', flex: 1, color: columns[3].id === 'mobile' ? 'blue' : 'inherit' }}>
//                                 {row.mobile}
//                             </div>
//                             <div style={{ textAlign: 'center', minWidth: columns[4].minWidth, padding: '8px', flex: 1 }}>
                            
//                                 {row.permission}
//                             </div>
//                             <div style={{ textAlign: 'center', minWidth: columns[5].minWidth, padding: '8px', flex: 1 }}>
//                                 <Button sx={{ boxStyle, color: 'purple', border:"1px solid purple"  }} variant="outlined" onClick={() => handleEditPermission(row.id)}>
//                                 Grant Permission
//                                 </Button>
//                             </div>
//                         </div>
//                     ))}
//                 </Paper> */}


//         </div>

//         </>
//     );
// }
