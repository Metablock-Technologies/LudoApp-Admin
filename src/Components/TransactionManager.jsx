import React, { useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./TransactionManager.css";
import jsPDF from "jspdf";

// import "jspdf-autotable";
// import "./TransactionManager.css";
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  TablePagination,

  MenuItem,
  Select,

  FormControl,
} from "@mui/material";

function TransactionManager() {
  const [updatedPenalty, setUpdatedPenalty] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleAcceptRequest = (id, requestType) => {
    // Implement logic to accept coins or withdraw request here
    // You can update the item's properties or perform other actions
    console.log(`Accepted ${requestType} request for ID ${id}`);
  };

  const [data, setData] = useState([
    {
      number: 1,
      id: "user001",
      name: "John Doe",
      mobile: "123-456-7890",
      balance: 1000,
      penalty: 0,
    },
    {
      number: 2,
      id: "user002",
      name: "Alice Johnson",
      mobile: "987-654-3210",
      balance: 2000,
      penalty: 0,
    },
    {
      number: 3,
      id: "user003",
      name: "Bob Smith",
      mobile: "555-555-5555",
      balance: 1500,
      penalty: 0,
    },
    {
      number: 4,
      id: "user004",
      name: "Emma Lee",
      mobile: "111-222-3333",
      balance: 3000,
      penalty: 0,
    },
    {
      number: 5,
      id: "user005",
      name: "Michael Brown",
      mobile: "777-888-9999",
      balance: 2500,
      penalty: 0,
    },
    {
      number: 6,
      id: "user006",
      name: "Sophia Johnson",
      mobile: "555-555-5555",
      balance: 2000,
      penalty: 0,
    },
    {
      number: 7,
      id: "user007",
      name: "William Johnson",
      mobile: "666-666-6666",
      balance: 1800,
      penalty: 0,
    },
    {
      number: 8,
      id: "user008",
      name: "Olivia Wilson",
      mobile: "777-777-7777",
      balance: 2300,
      penalty: 0,
    },
    {
      number: 9,
      id: "user009",
      name: "James Smith",
      mobile: "999-999-9999",
      balance: 3500,
      penalty: 0,
    },
    {
      number: 10,
      id: "user010",
      name: "Isabella Lee",
      mobile: "111-111-1111",
      balance: 2800,
      penalty: 0,
    },
    {
      number: 11,
      id: "user011",
      name: "Sophia White",
      mobile: "222-222-2222",
      balance: 4200,
      penalty: 0,
    },
    {
      number: 12,
      id: "user012",
      name: "Liam Brown",
      mobile: "333-333-3333",
      balance: 3100,
      penalty: 0,
    },
    {
      number: 13,
      id: "user013",
      name: "Evelyn Johnson",
      mobile: "444-444-4444",
      balance: 1900,
      penalty: 0,
    },
    {
      number: 14,
      id: "user014",
      name: "Oliver Wilson",
      mobile: "555-555-5555",
      balance: 2600,
      penalty: 0,
    },
    {
      number: 15,
      id: "user015",
      name: "Amelia Lee",
      mobile: "666-666-6666",
      balance: 1700,
      penalty: 0,
    },
    {
      number: 16,
      id: "user016",
      name: "Michael White",
      mobile: "777-777-7777",
      balance: 3300,
      penalty: 0,
    },
    {
      number: 17,
      id: "user017",
      name: "William Smith",
      mobile: "888-888-8888",
      balance: 2900,
      penalty: 0,
    },
    {
      number: 18,
      id: "user018",
      name: "Ava Johnson",
      mobile: "999-999-9999",
      balance: 1500,
      penalty: 0,
    },
    {
      number: 19,
      id: "user019",
      name: "Emma Brown",
      mobile: "111-111-1111",
      balance: 3800,
      penalty: 0,
    },
  ]);

  const [updatedPenaltyId, setUpdatedPenaltyId] = useState();
  const [page, setPage] = useState(0);
  const [selectedField, setSelectedField] = useState("id"); // Default selected field for filtering
  const [searchText, setSearchText] = useState("");

  const handleUpdateAmount = (id, amount) => {
    const updatedData = data.map((item) =>
      item.id === id
        ? { ...item, balance: item.balance + amount, penalty: updatedPenalty }
        : item
    );
    setData(updatedData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);
  };

  const handleSearch = () => {
    const filteredData = data.filter((item) =>
      String(item[selectedField])
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setData(filteredData);
  };
  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    const columns = ["number", "ID", "name", "mobile", "balance", "penalty"];
    const rows = data
      .slice([0, 5])
      .map((game) => [
        game.number,
        game.id,
        game.name,
        game.mobile,
        game.balance,
        game.penalty,
      ]);

    pdf.autoTable({
      head: [columns],
      body: rows,
    });

    pdf.save("game_table.pdf");
  };

  // const handleDownloadExcel = () => {
  //     const formattedData = data.map(item => ({
  //         Number: item.number,
  //         ID: item.id,
  //         Name: item.name,
  //         Mobile: item.mobile,
  //         Balance: item.balance,
  //         Penalty: item.penalty,
  //     }));

  //     const worksheet = writeFileXLSX.utils.json_to_sheet(formattedData);
  //     const workbook = writeFileXLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, 'TransactionData');
  //     XLSX.writeFile(workbook, 'transaction_data.xlsx');
  // };


  return (
    <>
      <div className="table-container">
        <div className="header-search">
          <div className="heading">
            <Typography
              sx={{ color: "#29aad0", fontSize: "30px", paddingBottom: "20px" }}
              variant="h4"
            >
              Transaction Manager
            </Typography>
          </div>

          <div className="search-container">
            <div className="select-1">
              <FormControl sx={{ minWidth: 120, marginRight: "16px" }}>
                <Select
                  sx={{ border: "1px solid Blue", color: "white" }}
                  value={selectedField}
                  onChange={handleFieldChange}
                  className="gahlot"
                >
                  <MenuItem className="menu-item" value="id">
                    ID
                  </MenuItem>
                  <MenuItem className="menu-item" value="name">
                    Name
                  </MenuItem>
                  <MenuItem className="menu-item" value="mobile">
                    Mobile
                  </MenuItem>
                  <MenuItem className="menu-item" value="balance">
                    Balance
                  </MenuItem>
                  <MenuItem className="menu-item" value="penalty">
                    Penalty
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <TextField
              className="search-here"
              sx={{ flex: 1, marginRight: "20px", color: "white" }}
              label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="search-button">
          <Button
            sx={{
              width: "400px",
              color: "black",
              background: "white ",
              border: "1px solid blue",
            }}
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        <div className="print-2">
          <PictureAsPdfIcon className="pdf" onClick={handleDownloadPDF} />

          <button onClick={() => window.print()} className="btn-secondary">
            Print
          </button>
        </div>
        <TableContainer
          className="table-container-1"
          sx={{ background: "transparent", border: "1px solid blue", width: "100%" }}
          component={Paper}
        >
          <Table sx={{width:'100%' }} className="table-animation">
            <TableHead className="table">
              <TableRow>
                <TableCell className="row">Number</TableCell>
                <TableCell className="row">ID</TableCell>
                <TableCell className="row">Name</TableCell>
                <TableCell className="row">Mobile</TableCell>
                <TableCell className="row">Balance</TableCell>
                <TableCell className="row">Penalty</TableCell>
                <TableCell className="row">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.number}
                    onMouseEnter={() => {
                      setSelectedItem(item);
                      setShowOptions(true);
                    }}
                    onMouseLeave={() => {
                      setSelectedItem(null);
                      setShowOptions(false);
                    }}>

                    <TableCell className="row-data">{item.number}</TableCell>
                    <TableCell className="row-data">{item.id}</TableCell>
                    <TableCell className="row-data">{item.name}</TableCell>
                    <TableCell className="row-data">{item.mobile}</TableCell>
                    <TableCell className="row-data">{item.balance}</TableCell>
                    <TableCell sx={{ textAlign: "center", color: "red" }}>
                      {item.id === updatedPenaltyId ? (
                        <TextField
                          sx={{ borderBottom: "none" }}
                          className="penalty-input"
                          type="number"
                          value={updatedPenalty}
                          onChange={(e) =>
                            setUpdatedPenalty(Number(e.target.value))
                          }
                        />
                      ) : (
                        item.penalty
                      )}
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", borderBottom: "transparent" }}
                    >
                      {item.id === updatedPenaltyId ? (
                        <div className="button-update">
                          <Button
                            className="Update-button"
                            sx={{
                              textAlign: "center",
                              background: "transparent",
                              color: "lime",
                              border: "1px solid lime",
                            }}
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              handleUpdateAmount(item.id, 0); // The second argument (0) is the updated amount, you can change it as per your requirement
                              setUpdatedPenaltyId(null);
                            }}
                          >
                            Update
                          </Button>
                        </div>
                      ) : (
                        <div className="penalty-button">
                          <Button
                            variant="outlined"
                            onClick={() => setUpdatedPenaltyId(item.id)}
                          >
                            Edit Penalty
                          </Button>
                        </div>
                      )}
                      <TableCell className="row-data">
                        {showOptions && selectedItem === item ? (
                          <div className="options-container">
                            <div className="option" onClick={() => handleAcceptRequest(item.id, "coins")}>
                              <CheckCircleOutlineIcon /> Accept Coins Request
                            </div>
                            <div className="option" onClick={() => handleAcceptRequest(item.id, "withdraw")}>
                              <CheckCircleOutlineIcon /> Accept Withdraw Request
                            </div>
                          </div>
                        ) : (
                          <VisibilityIcon className="eye-icon" />
                        )}
                      </TableCell>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ color: "white", marginTop: "20px" }}
          rowsPerPageOptions={[5, 10, 25, 50]} // Options for rows per page dropdown
          component="div"
          count={data.length} // Total number of rows in the data array
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {/* <ExcelFile element={<button className="btn btn-secondary">Download Table as Excel</button>}>
                <ExcelSheet data={data} name="TransactionData">
                    <ExcelColumn label="Number" value="number" />
                    <ExcelColumn label="ID" value="id" />
                    <ExcelColumn label="Name" value="name" />
                    <ExcelColumn label="Mobile" value="mobile" />
                    <ExcelColumn label="Balance" value="balance" />
                    <ExcelColumn label="Penalty" value="penalty" />
                </ExcelSheet>
            </ExcelFile> */}
    </>
  );
}

export default TransactionManager;
