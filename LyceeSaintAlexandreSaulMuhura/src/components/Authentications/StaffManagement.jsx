import React, { useState, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Trash2 } from 'lucide-react';
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import './index.css';

// Register AG Grid Modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const StaffManagement = () => {
    const [staffName, setStaffName] = useState("");
    const [photo, setPhoto] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [position, setPosition] = useState("SELECT");
    const [teacherOption, setTeacherOption] = useState("");
    const [staffData, setStaffData] = useState([]);

    // State to track selected rows
    const [selectedRows, setSelectedRows] = useState([]);

    // Update staff form with existing data
    const handleUpdate = (data) => {
        setStaffName(data.staffName);
        setPhoneNumber(data.phoneNumber);
        setEmailAddress(data.emailAddress);
        setPosition(data.position);
        setTeacherOption(data.teacherOption || "");
        alert(`You are updating the record of ${data.staffName}`);
    };

    // Bulk delete for selected rows
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

    // Delete a specific staff record
    const handleDelete = useCallback((id) => {
        const updatedStaffData = staffData.filter((staff) => staff.id !== id);
        setStaffData(updatedStaffData);
        alert("Staff data deleted successfully!");
    }, [staffData]);

    useEffect(() => {
        const sampleStaffData = [
            { id: 1, staffName: "Kigali Paul", phoneNumber: "+250 788 123 456", emailAddress: "johndoe@example.com", position: "Teacher", teacherOption: "ICT" },
            { id: 2, staffName: "Jane Smith", phoneNumber: "+250 788 654 321", emailAddress: "janesmith@example.com", position: "Head Master", teacherOption: null },
            { id: 3, staffName: "Kamana Isae", phoneNumber: "+250 788 654 321", emailAddress: "kemmy@example.com", position: "Teacher", teacherOption: null },
            { id: 4, staffName: "Jane Smith", phoneNumber: "+250 788 654 321", emailAddress: "janesmith@example.com", position: "Head Master", teacherOption: null },
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

    // AG Grid Column Definitions with useMemo
    const columnDefs = useMemo(() => [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            headerName: "",
            width: 20,
            maxWidth: 40,
            minWidth: 40,
        },
        { headerName: "Name", field: "staffName", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Phone", field: "phoneNumber", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Email", field: "emailAddress", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Position", field: "position", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Teacher Option", field: "teacherOption", sortable: true, filter: true, floatingFilter: true },
        {
            headerName: "Action",
            field: "action",
            cellRendererFramework: (params) => (
                <div className="flex space-x-2 justify-center items-center">
                    <FaBear
                        className="hover:scale-110 cursor-pointer"
                        size={20}
                        color="#2563eb"
                        onClick={() => handleUpdate(params.data)}
                    />
                    <Trash2
                        className="hover:scale-110 cursor-pointer"
                        size={20}
                        color="#dc2626"
                        onClick={() => handleDelete(params.data.id)}
                    />
                </div>
            ),
        },
    ], [handleDelete]);

    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
    }), []);

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
                <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Staff Management</h2>
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
                        <label className="block text-xs md:text-sm text-black font-bold">Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full p-1.5 md:p-2 border border-blue-500 rounded-lg text-sm text-black"
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />
                    </div>

                    <div className="space-y-1 md:space-y-2">
                        <label className="block text-xs md:text-sm text-black font-bold">Phone Number</label>
                        <input
                            type="tel"
                            className="w-full p-1.5 md:p-2 border border-blue-500 rounded-lg text-sm text-black"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1 md:space-y-2">
                        <label className="block text-xs md:text-sm text-black font-bold">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-1.5 md:p-2 border border-blue-500 rounded-lg text-sm text-black"
                            placeholder="Enter Email Address"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1 md:space-y-2">
                        <label className="block text-xs md:text-sm text-black font-bold">Position</label>
                        <select
                            className="w-full p-1.5 md:p-2 border border-blue-500 rounded-lg text-sm text-black"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        >
                            <option value="SELECT">Select Position</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Head Master">Head Master</option>
                        </select>
                    </div>

                    {position === "Teacher" && (
                        <div className="space-y-1 md:space-y-2">
                            <label className="block text-xs md:text-sm text-black font-bold">Teacher Option</label>
                            <input
                                type="text"
                                className="w-full p-1.5 md:p-2 border border-blue-500 rounded-lg text-sm text-black"
                                placeholder="Enter Teacher Option"
                                value={teacherOption}
                                onChange={(e) => setTeacherOption(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="space-y-1 md:space-y-2 flex flex-col items-start md:items-center justify-between md:flex-row space-x-2 mt-4">
                        <button
                            className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm font-semibold py-2 px-4 rounded-lg"
                            onClick={handleSave}
                        >
                            Save
                        </button>

                        <button
                            className="w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white text-xs md:text-sm font-semibold py-2 px-4 rounded-lg mt-2 md:mt-0"
                            onClick={handleClear}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            {/* AG Grid Table */}
            <div className="ag-theme-quartz mt-6 rounded-lg shadow">
                <AgGridReact
                    rowData={staffData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={paginationPageSize}
                    domLayout="autoHeight"
                    rowSelection="multiple"
                    onSelectionChanged={(e) => setSelectedRows(e.api.getSelectedRows())}
                />
            </div>
        </div>
    );
};

export default StaffManagement;
