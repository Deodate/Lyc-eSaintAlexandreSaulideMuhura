import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
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

// Custom toast styles
const toastStyles = {
    success: {
        background: "#d9f6e8", // Green color for success
        color: "#238c09",
    },
    error: {
        background: "#e1c3c0", // Red color for error
        color: "#ec190f",
    },
    warning: {
        background: "#bfcafb", // Orange color for warning
        color: "#0633fc",
    },
};

const UserList = () => {
    const [commentsData, setCommentsData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const gridRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/auth/users");
                const data = await response.json();
                console.log(data); // Log the response data
                const formattedData = data.map((user) => ({
                    id: user.id,
                    fullName: user.fullName,
                    gender: user.gender, 
                    phone: user.phone, 
                    position: user.position, 
                    nationality: user.nationality, 
                    email: user.email, 
                    status: user.status, 
                    dateTime: new Date(user.createdAt).toLocaleString(), 
                }));
                setCommentsData(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data from the server.");
            }
        };

        fetchData();
    }, []);

    // Handle status change
    const handleStatusChange = useCallback(
        (id, currentStatus) => {
            const newStatus =
                currentStatus === "Inactive"
                    ? "Active"
                    : currentStatus === "Inactive"
                    ? "Active"
                    : "Inactive";

            const updatedCommentsData = commentsData.map((comment) =>
                comment.id === id ? { ...comment, status: newStatus } : comment
            );

            setCommentsData(updatedCommentsData);

            // Find the updated row and refresh it
            if (gridRef.current) {
                const rowNode = gridRef.current.api.getRowNode(id.toString());
                if (rowNode) {
                    rowNode.setData({ ...rowNode.data, status: newStatus });
                }
            }

            // Display notification
            toast(
                `This comment is ${newStatus}`,
                {
                    position: "top-right",
                    autoClose: 2000,
                    style:
                        newStatus === "Inactive"
                            ? toastStyles.success
                            : newStatus === "Active"
                            ? toastStyles.error
                            : toastStyles.warning,
                    className: 'custom-toast-notification',
                }
            );
        },
        [commentsData]
    );

    // Handle bulk delete
    const handleBulkDelete = () => {
        const selectedIds = selectedRows.map((row) => row.id);
        const filteredCommentsData = commentsData.filter(
            (comment) => !selectedIds.includes(comment.id)
        );
        setCommentsData(filteredCommentsData);
        setSelectedRows([]);

        toast.success(
            `${selectedRows.length} row(s) deleted successfully!`,
            {
                position: "top-right",
                autoClose: 2000,
                style: toastStyles.success,
            }
        );
    };

    // Define columnDefs with useMemo
    const columnDefs = useMemo(
        () => [
            {
                headerCheckboxSelection: true,
                checkboxSelection: true,
                headerName: "",
                width: 20,
                maxWidth: 40,
                minWidth: 40,
                headerClass: "text-center",
            },
            {
                headerName: "Full Name",
                field: "fullName", 
                sortable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: "Gender",
                field: "gender", 
                sortable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: "Postition",
                field: "position",
                sortable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: "Phone",
                field: "phone", 
                sortable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: "Email",
                field: "email", 
                sortable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: "Nationality",
                field: "nationality", 
                sortable: true,
                filter: true,
                floatingFilter: true,
            },
            {
                headerName: "Status",
                field: "status", 
                cellRenderer: (params) => {
                    const status = params.data.status || "Inactive"; 
                    let statusColor = "bg-blue-600"; 
                
                    if (status === "Active") statusColor = "bg-green-600"; 
                    if (status === "Inactive") statusColor = "bg-blue-600"; 
                
                    return (
                        <button
                            className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-white rounded ${statusColor}`}
                            onClick={() =>
                                handleStatusChange(params.data.id, status)
                            }
                        >
                            {status}
                        </button>
                    );
                },
            },            
        ],
        [handleStatusChange]
    );

    // Default column definitions
    const defaultColDef = useMemo(
        () => ({
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
        }),
        []
    );

    // Pagination settings
    const paginationPageSize = 8;

    return (
        <div>
            {/* Bulk Delete Button */}
            {selectedRows.length > 0 && (
                <div className="mb-4 flex justify-end">
                    <button
                        className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center space-x-2"
                        onClick={handleBulkDelete}
                    >
                        Delete {selectedRows.length} Selected
                    </button>
                </div>
            )}

            {/* Comments Management Title */}
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-black">
                Users' Account Managements
            </h2>

            {/* Data Table */}
            <div
                className="ag-theme-quartz mt-6"
                style={{ height: 400 }}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={commentsData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={paginationPageSize}
                    domLayout="autoHeight"
                    rowSelection="multiple"
                    onSelectionChanged={(params) => {
                        const selectedNodes = params.api.getSelectedNodes();
                        const selectedData = selectedNodes.map(
                            (node) => node.data
                        );
                        setSelectedRows(selectedData);
                    }}
                />
            </div>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default UserList;
