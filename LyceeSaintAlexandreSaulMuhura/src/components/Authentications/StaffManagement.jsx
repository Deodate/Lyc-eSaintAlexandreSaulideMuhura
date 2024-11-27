import React, { useState, useEffect } from 'react';

const StaffManagement = () => {
  const [staffName, setStaffName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [position, setPosition] = useState('SELECT');
  const [teacherOption, setTeacherOption] = useState('');
  const [staffData, setStaffData] = useState([]);

  // Add sample data to the staffData state when the component mounts
  useEffect(() => {
    const sampleStaffData = [
      {
        id: 1,
        staffName: 'John Doe',
        photo: null,
        phoneNumber: '+250 788 123 456',
        emailAddress: 'johndoe@example.com',
        position: 'Teacher',
        teacherOption: 'ICT',
        dateSaved: '2024-11-27 10:00 AM',
      },
      {
        id: 2,
        staffName: 'Jane Smith',
        photo: null,
        phoneNumber: '+250 788 654 321',
        emailAddress: 'janesmith@example.com',
        position: 'Head Master',
        teacherOption: null,
        dateSaved: '2024-11-26 09:30 AM',
      },
      {
        id: 3,
        staffName: 'Alice Johnson',
        photo: null,
        phoneNumber: '+250 788 987 654',
        emailAddress: 'alicej@example.com',
        position: 'Matron',
        teacherOption: null,
        dateSaved: '2024-11-25 11:15 AM',
      },
    ];
    setStaffData(sampleStaffData);
  }, []);

  const handlePositionChange = (e) => {
    const selectedPosition = e.target.value;
    setPosition(selectedPosition);
    if (selectedPosition !== 'Teacher') {
      setTeacherOption('');
    }
  };

  const handleSave = () => {
    const staffItem = {
      id: staffData.length + 1,  // Generate unique ID based on current staff data length
      staffName,
      photo,
      phoneNumber,
      emailAddress,
      position,
      teacherOption: position === 'Teacher' ? teacherOption : null,
      dateSaved: new Date().toLocaleString(),
    };

    // Add the new staff data to the existing data array
    setStaffData([...staffData, staffItem]);
    alert('Staff data saved successfully!');
    handleClear();  // Clear the form after saving
  };

  const handleClear = () => {
    setStaffName('');
    setPhoto(null);
    setPhoneNumber('');
    setEmailAddress('');
    setPosition('SELECT');
    setTeacherOption('');
  };

  return (
    <div>
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
              onChange={handlePositionChange}
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
      {staffData.length > 0 && (
        <div className="bg-white rounded-lg shadow mt-6">
          <div className="p-3 md:p-4 flex justify-between items-center">
            <h2 className="text-base md:text-lg font-semibold">Staff Data</h2>
            <button className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-orange-400 text-white rounded-lg hover:bg-orange-500">
              Generate Report
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 md:p-4 text-left">#</th>
                  <th className="p-2 md:p-4 text-left">Full Names</th>
                  <th className="p-2 md:p-4 text-left">Phone Number</th>
                  <th className="p-2 md:p-4 text-left">Email Address</th>
                  <th className="p-2 md:p-4 text-left">Position</th>
                  <th className="p-2 md:p-4 text-left">Option</th>
                  <th className="p-2 md:p-4 text-left">Date Saved</th>
                  <th className="p-2 md:p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {staffData.map((staff, index) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="p-2 md:p-4">{index + 1}</td>
                    <td className="p-2 md:p-4">{staff.staffName}</td>
                    <td className="p-2 md:p-4">{staff.phoneNumber}</td>
                    <td className="p-2 md:p-4">{staff.emailAddress}</td>
                    <td className="p-2 md:p-4">{staff.position}</td>
                    <td className="p-2 md:p-4">{staff.teacherOption || 'N/A'}</td>
                    <td className="p-2 md:p-4">{staff.dateSaved}</td>
                    <td className="p-2 md:p-4">
                      <button
                        className="text-xs md:text-sm text-red-600 hover:text-red-800"
                        onClick={() => {
                          const updatedStaffData = staffData.filter(item => item.id !== staff.id);
                          setStaffData(updatedStaffData);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
