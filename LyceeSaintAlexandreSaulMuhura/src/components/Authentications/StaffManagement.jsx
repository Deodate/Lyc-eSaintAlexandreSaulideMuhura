import React, { useState } from 'react';

const StaffManagement = () => {
  const [staffName, setStaffName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [position, setPosition] = useState('SELECT');
  const [teacherOption, setTeacherOption] = useState('');

  const handlePositionChange = (e) => {
    const selectedPosition = e.target.value;
    setPosition(selectedPosition);
    if (selectedPosition !== 'Teacher') {
      setTeacherOption('');
    }
  };

  const handleSave = () => {
    const staffData = {
      staffName,
      photo,
      phoneNumber,
      emailAddress,
      position,
      teacherOption: position === 'Teacher' ? teacherOption : null,
    };
    console.log('Staff Data:', staffData);
    alert('Staff data saved successfully!');
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
    <div className="bg-white rounded-lg shadow p-3 md:p-6">
      <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Staff Management</h2>
      {/* Rest of the component remains unchanged */}
    </div>
  );
};

export default StaffManagement;
