import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";

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
    

    useEffect(() => {
        const sampleStaffData = [
            {
                id: 1,
                staffName: "John Doe",
                phoneNumber: "+250 788 123 456",
                emailAddress: "johndoe@example.com",
                position: "Teacher",
                teacherOption: "ICT",
                dateSaved: "2024-11-27 10:00 AM",
            },
            {
                id: 2,
                staffName: "Jane Smith",
                phoneNumber: "+250 788 654 321",
                emailAddress: "janesmith@example.com",
                position: "Head Master",
                teacherOption: null,
                dateSaved: "2024-11-26 09:30 AM",
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
        headerCheckboxSelection: true, // Checkbox in the header
        checkboxSelection: true,       // Checkbox for each row
        headerName: "",                // No header title for the checkbox column
        width: 50,                     // Set the column width
    },
    { headerName: "Name", field: "staffName", sortable: true, filter: true },
    { headerName: "Phone", field: "phoneNumber", sortable: true, filter: true },
    { headerName: "Email", field: "emailAddress", sortable: true, filter: true },
    { headerName: "Position", field: "position", sortable: true, filter: true },
    {
        headerName: "Teacher Option",
        field: "teacherOption",
        sortable: true,
        filter: true,
    },
    { headerName: "Date Saved", field: "dateSaved", sortable: true, filter: true },
], []);

// Define defaultColDef separately with useMemo
const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
}), []);


    return (
        <div>
            {/* Staff Form */}
            <div className="bg-white rounded-lg shadow p-3 md:p-6">
                <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Staff dManagement</h2>
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
                            onChange={(e) => setPosition(e.target.value)} // Correct handler
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
                        Clear
                    </button>
                    <button
                        className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-blue-600 bg-[#95d2ff] hover:bg-[#7bb8e6] rounded-lg"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="ag-theme-quartz mt-6" style={{ height: 400 }}>
                <AgGridReact
                    rowData={staffData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    domLayout="autoHeight"
                />
            </div>
        </div>
    );
};

export default StaffManagement;
