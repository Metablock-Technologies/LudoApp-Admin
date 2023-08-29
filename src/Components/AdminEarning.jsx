import React, { useState } from 'react';
import "./styles/AdminEarning.css"
import axios from 'axios';
import { baseURL } from '../token';

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [totalEarning, setTotalEarning] = React.useState('5,00,000');
    const [searchAmount, setSearchAmount] = React.useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [initialRows, setInitialRows] = useState([]);


    const columns = [
        { id: 'number', label: 'Number', minWidth: 100 },
        { id: 'id', label: 'ID', minWidth: 170 },
        {
            id: 'amount',
            label: 'Amount',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
    ];


    //search amount method 
    // const initialRows = [
    //     { number: 1, id: 'user001', amount: 1000 },
    //     { number: 2, id: 'user002', amount: 2000 },
    //     { number: 3, id: 'user003', amount: 3000 },
    //     { number: 4, id: 'user004', amount: 4000 },
    //     { number: 5, id: 'user005', amount: 5000 },
    //     { number: 6, id: 'user006', amount: 6000 },
    //     { number: 7, id: 'user007', amount: 7000 },
    //     { number: 8, id: 'user008', amount: 8000 },
    //     { number: 9, id: 'user009', amount: 9000 },
    //     { number: 10, id: 'user010', amount: 10000 },
    //     { number: 11, id: 'user011', amount: 11000 },
    //     { number: 12, id: 'user012', amount: 12000 },
    //     { number: 13, id: 'user013', amount: 13000 },
    //     { number: 14, id: 'user014', amount: 14000 },
    //     { number: 15, id: 'user015', amount: 15000 },
    //     { number: 16, id: 'user016', amount: 16000 },
    //     { number: 17, id: 'user017', amount: 17000 },
    //     { number: 18, id: 'user018', amount: 18000 },
    //     { number: 19, id: 'user019', amount: 19000 },
    //     { number: 20, id: 'user020', amount: 20000 },
    //     { number: 21, id: 'user021', amount: 21000 },
    //     { number: 22, id: 'user022', amount: 22000 },
    //     { number: 23, id: 'user023', amount: 23000 },
    //     { number: 24, id: 'user024', amount: 24000 },
    //     { number: 25, id: 'user025', amount: 25000 },
    // ];

    const gamejudgement = async () => {
        try {

            const accessToken = localStorage.getItem('access_token');
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

            console.log(headers);
            const response = await axios.get(baseURL + '/admin/challengeresults', {
                headers: headers,
            });

            console.log(response.data.data);
            setInitialRows(response.data.data);
        }
        catch (err) {
            console.log(err);
        }
    };



    const filteredData = initialRows.filter(data => {
        if (!searchAmount) {
            return true;
        }
        return data.amount.toString().includes(searchAmount);
    });


    // Calculate start and end indices for the current page
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRows = filteredData.slice(startIndex, endIndex);


    const renderedTableRows = currentRows.map((data, index) => (

        <tr role="row" key={index}>
            <td>{data.number}</td>
            <td>{data.id}</td>
            <td>{data.amount}</td>
        </tr>
    ));


    // Handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    const handleSearchAmountChange = (e) => {
        setSearchAmount(e.target.value);
        setPage(0); // Reset page when search query changes
    };


    return (
        <> <div className="designing-mai    n-div">
            <section style={{ paddingTop: '50px' }} className="content">

                <div className="container-fluid" style={{ marginTop: '-35px' }}>
                    <div className="row">
                        {/* Primary table start */}
                        <div className="col-12 mt-5">
                            <div className="card">
                                <div className="card-body">
                                    <div className="single-table">
                                        <div className="table-responsive">
                                            {/* fund history */}
                                            <div id="table_id_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                                <div id="table_id_filter" className="dataTables_filter">
                                                    <label>Search:<input
                                                        style={{ marginLeft: '0.1rem' }}
                                                        type="text"
                                                        className="form-control"
                                                        value={searchAmount}
                                                        onChange={handleSearchAmountChange}
                                                        placeholder="Search by Amount"
                                                        aria-describedby="inputGroupPrepend"
                                                        name="amount"
                                                    />
                                                    </label>
                                                </div>
                                                <table className="table text-center dataTable no-footer dtr-inline" id="table_id" role="grid" aria-describedby="table_id_info">
                                                    <thead className="text-capitalize">

                                                        {/* <th className="sorting_asc" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 101 }} aria-sort="ascending" aria-label="SR. NO.: activate to sort column descending">SR. NO.</th> */}
                                                        <tr role="row">
                                                            <th className="sorting_asc" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 101 }} aria-sort="ascending" aria-label="SR. NO.: activate to sort column descending">Number</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 76 }} aria-label="From: activate to sort column ascending">ID </th>
                                                            <th className="sorting" tabIndex={0} aria-controls="table_id" rowSpan={1} colSpan={1} style={{ width: 105 }} aria-label="To User: activate to sort column ascending">Amount</th>
                                                        </tr>

                                                    </thead>
                                                    <tbody>
                                                        {renderedTableRows}
                                                    </tbody>
                                                </table>
                                                <div className="dataTables_info" id="table_id_info" role="status" aria-live="polite">
                                                    Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
                                                </div>

                                                <div className="dataTables_paginate paging_simple_numbers" id="table_id_paginate">
                                                    <ul className="pagination">
                                                        <li className={`paginate_button page-item ${page === 0 ? 'disabled' : ''}`} id="table_id_previous">
                                                            <a href="#" onClick={() => handlePageChange(page - 1)} tabIndex={0} className="page-link">
                                                                Previous
                                                            </a>
                                                        </li>
                                                        {Array.from({ length: page }, (_, index) => (
                                                            <li key={index} className={`paginate_button page-item ${page === index ? 'active' : ''}`}>
                                                                <a href="#" onClick={() => handlePageChange(index)} tabIndex={0} className="page-link">
                                                                    {index + 1}
                                                                </a>
                                                            </li>
                                                        ))}
                                                        <li className={`paginate_button page-item ${page === page - 1 ? 'disabled' : ''}`} id="table_id_next">
                                                            <a href="#" onClick={() => handlePageChange(page + 1)} tabIndex={0} className="page-link">
                                                                Next
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <br /><br />


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Primary table end */}
                    </div>
                </div>
            </section>
        </div>


        </>


    );
}
