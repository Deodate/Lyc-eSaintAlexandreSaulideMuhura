import React, { useState, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { FaTrash } from 'react-icons/fa';
import { Trash2 } from 'lucide-react';
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import './index.css';

// Register AG Grid Modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const StudentList = () => {
    const [staffName, setStaffName] = useState("");
    const [photo, setPhoto] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [position, setPosition] = useState("SELECT");
    const [teacherOption, setTeacherOption] = useState("");
    const [staffData, setStaffData] = useState([]);

    // State to track selected rows
    const [selectedRows, setSelectedRows] = useState([]);

    const handleUpdate = (data) => {
        setStaffName(data.staffName);
        setPhoneNumber(data.phoneNumber);
        setEmailAddress(data.emailAddress);
        setPosition(data.position);
        setTeacherOption(data.teacherOption || "");
        alert(`You are updating the record of ${data.staffName}`);
    };

    // Bulk delete function for selected rows
    const handleBulkDelete = useCallback(() => {
        if (selectedRows.length === 0) {
            alert("No rows selected for deletion");
            return;
        }

        const updatedStaffData = staffData.filter(
            (staff) => !selectedRows.some((selectedStaff) => selectedStaff.id === staff.id)
        );

        setStaffData(updatedStaffData);
        setSelectedRows([]); // Clear selection after delete
        alert(`Deleted ${selectedRows.length} staff record(s) successfully!`);
    }, [staffData, selectedRows]);

    const handleDelete = useCallback((id) => {
        const updatedStaffData = staffData.filter((staff) => staff.id !== id);
        setStaffData(updatedStaffData);
        alert("Staff data deleted successfully!");
    }, [staffData]);

    useEffect(() => {
        const sampleStaffData = [
            {
                id: 1,
                staffName: "Kigali Paul",
                phoneNumber: "+250 788 123 456",
                emailAddress: "johndoe@example.com",
                position: "Teacher",
                teacherOption: "ICT",
            },
            {
                id: 2,
                staffName: "Jane Smith",
                phoneNumber: "+250 788 654 321",
                emailAddress: "janesmith@example.com",
                position: "Head Master",
                teacherOption: null,
            },
            {
                id: 3,
                staffName: "Kamana Isae",
                phoneNumber: "+250 788 654 321",
                emailAddress: "kemmy@example.com",
                position: "Teacher",
                teacherOption: null,
            },
            {
                id: 4,
                staffName: "Jane Smith",
                phoneNumber: "+250 788 654 321",
                emailAddress: "janesmith@example.com",
                position: "Head Master",
                teacherOption: null,
            },
        ];
        setStaffData(sampleStaffData);
    }, []);

    const handleSave = () => {
        const newStaff = {
            id: staffData.length + 1,
            staffName,
            phoneNumber,
            emailAddress,
            position,
            teacherOption: position === "Teacher" ? teacherOption : null,
            dateSaved: new Date().toLocaleString(),
        };
        setStaffData([...staffData, newStaff]);
        alert("Staff data saved successfully!");
        handleClear();
    };

    const handleClear = () => {
        setStaffName("");
        setPhoto(null);
        setPhoneNumber("");
        setEmailAddress("");
        setPosition("SELECT");
        setTeacherOption("");
    };

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

        { headerName: "Full Name", field: "staffName", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Gender", field: "phoneNumber", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Option", field: "emailAddress", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Date of Birth", field: "position", sortable: true, filter: true, floatingFilter: true },
        {
            headerName: "Academic Year",
            field: "teacherOption",
            sortable: true,
            filter: true,
            floatingFilter: true,
            headerClass: 'text-center justify-center',
        },
        {
            headerName: "Action",
            field: "action",
            cellRenderer: (params) => {
                return (
                    <div className="flex space-x-2 justify-center items-center">
                        <span
                            className="cursor-pointer text-blue-600"
                            onClick={() => handleUpdate(params.data)}
                        >
                            Update
                        </span>
                        <span
                            className="cursor-pointer text-red-600 mr-2"
                            onClick={() => handleDelete(params.data.id)}
                        >
                            <FaTrash />
                        </span>
                    </div>
                );
            },
        },

    ], [handleDelete]);

    // Define defaultColDef separately with useMemo
    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
    }), []);

    // AG Grid Pagination settings
    const paginationPageSize = 3;

    return (
        <div>
            {/* Bulk Delete Button */}
            {selectedRows.length > 0 && (
                <div className="mb-4 flex justify-end">
                    <button
                        className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center space-x-2"
                        onClick={handleBulkDelete}
                    >
                        <Trash2 size={16} />
                        <span>Delete {selectedRows.length} Selected</span>
                    </button>
                </div>
            )}

            {/* Staff Form */}
            <div className="bg-white rounded-lg shadow p-3 md:p-6">
                <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-black">All Students Management</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    <div className="space-y-1 md:space-y-2">
                        <label className="block text-xs md:text-sm text-black font-bold">Full Name</label>
                        <input
                            type="text"
                            className="w-full p-1.5 md:p-2 border border-blue-500 rounded-lg text-sm text-black"
                            placeholder="Enter Full Name"
                            value={staffName}
                            onChange={(e) => setStaffName(e.target.value)}
                        />
                    </div>

                
                    <div className="space-y-1 md:space-y-2">
                        <label className="block text-xs md:text-sm text-black font-bold">Position</label>
                        <select
                            className="w-full p-1.5 md:p-2 border border-blue-500 rounded-lg text-sm text-black"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        >
                            <option value="SELECT">SELECT</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Head Master">Head Master</option>
                            <option value="Matron">Matron</option>
                            <option value="Patron">Patron</option>
                        </select>
                    </div>

                    {position === 'Teacher' && (
                        <div className="space-y-1 md:space-y-2">
                            <label className="block text-xs md:text-sm text-black font-bold">Teacher Option</label>
                            <select
                                className="w-full p-1.5 md:p-2 border border-blue-500 rounded-lg text-sm text-black"
                                value={teacherOption}
                                onChange={(e) => setTeacherOption(e.target.value)}
                            >
                                <option value="">Select Option</option>
                                <option value="Account">Account</option>
                                <option value="ICT">ICT</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-3 md:mt-4 space-x-2 md:space-x-4">
                    <button
                        className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-red-600 bg-[#feb3b0] hover:bg-[#ff8f8c] rounded-lg"
                        onClick={handleClear}
                    >
                        Clear Filter
                    </button>
                    <button
                        className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-blue-600 bg-[#f0f5ff] hover:bg-[#7bb8e6] rounded-lg font-bold"
                        onClick={handleSave}
                    >
                        Submit
                    </button>

                </div>
            </div>

            {/* Data Table */}
            <div className="ag-theme-quartz mt-6" style={{ height: 400 }}>
                <AgGridReact
                    rowData={staffData}
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
        </div>
    );
};

export default StudentList;