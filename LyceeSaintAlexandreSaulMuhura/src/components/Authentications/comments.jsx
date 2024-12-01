import React, { useState, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import './index.css';

// Register AG Grid Modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Comments = () => {
    const [commentsData, setCommentsData] = useState([]);

    // State to track selected rows
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        const sampleCommentsData = [
            {
                id: 1,
                staffName: "Kigali Paul",
                phoneNumber: "+250 788 123 456",
                emailAddress: "johndoe@example.com",
                position: "Teacher",
                status: "Pending",
            },
            {
                id: 2,
                staffName: "Jane Smith",
                phoneNumber: "+250 788 654 321",
                emailAddress: "janesmith@example.com",
                position: "Head Master",
                status: "Pending",
            },
            {
                id: 3,
                staffName: "Kamana Isae",
                phoneNumber: "+250 788 654 321",
                emailAddress: "kemmy@example.com",
                position: "Teacher",
                status: "Pending",
            },
        ];
        setCommentsData(sampleCommentsData);
    }, []);

    // Handle status change
    const handleStatusChange = useCallback((id, currentStatus) => {
        const newStatus = currentStatus === "Pending" ? "Publish" :
            currentStatus === "Publish" ? "Cancel" :
                "Pending"; // Cycle through Pending -> Publish -> Cancel

        const updatedCommentsData = commentsData.map(comment =>
            comment.id === id ? { ...comment, status: newStatus } : comment
        );

        setCommentsData(updatedCommentsData);

        // Display notification
        toast.success(`Status changed to "${newStatus}"`, {
            position: "top-right",
            autoClose: 2000,
        });
    }, [commentsData]);

    // Define columnDefs with useMemo
    // Define columnDefs with useMemo
    const columnDefs = useMemo(() => [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            headerName: "",
            width: 20,
            maxWidth: 40,
            minWidth: 40,
            headerClass: 'text-center',
        },
        { headerName: "Date & Time", field: "staffName", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Full Name", field: "phoneNumber", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Title", field: "emailAddress", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Comment", field: "position", sortable: true, filter: true, floatingFilter: true },
        {
            headerName: "Status",
            field: "status",
            cellRenderer: (params) => {
                const status = params.data.status;
                let statusColor = "bg-blue-600"; // Default color for Pending

                if (status === "Cancel") statusColor = "bg-red-600";
                if (status === "Publish") statusColor = "bg-green-600";

                return (
                    <button
                        className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-white rounded ${statusColor}`}
                        onClick={() => handleStatusChange(params.data.id, status)}
                    >
                        {status}
                    </button>
                );
            },
        },
    ], [handleStatusChange]);

    // Define defaultColDef separately with useMemo
    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
    }), []);

    // AG Grid Pagination settings
    const paginationPageSize = 10;

    return (
        <div>
            {/* Bulk Delete Button */}
            {selectedRows.length > 0 && (
                <div className="mb-4 flex justify-end">
                    <button
                        className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center space-x-2"
                    >
                        Delete {selectedRows.length} Selected
                    </button>
                </div>
            )}

            {/* Comments Management Title */}
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-black">Comments Management</h2>

            {/* Data Table */}
            <div className="ag-theme-quartz mt-6" style={{ height: 400 }}>
                <AgGridReact
                    rowData={commentsData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={paginationPageSize}
                    domLayout="autoHeight"
                    rowSelection="multiple"
                    onSelectionChanged={(params) => {
                        const selectedNodes = params.api.getSelectedNodes();
                        const selectedData = selectedNodes.map((node) => node.data);
                        setSelectedRows(selectedData);
                    }}
                />
            </div>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default Comments;
