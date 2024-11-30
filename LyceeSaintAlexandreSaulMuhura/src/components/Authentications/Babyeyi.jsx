import React from 'react';

const BabyeyiLetter = ({ isNavExpanded, activeMenu }) => {
  return (
    <div
      className={`mt-14 md:mt-16 transition-all duration-300 relative z-10 ${
        isNavExpanded ? 'ml-48 md:ml-64' : 'ml-16 md:ml-20'
      } p-3 md:p-6`}
    >
      {activeMenu === 'babyeyi' && (
        <div className="bg-white rounded-lg shadow p-3 md:p-6">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Update/ Current Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-10 justify-items-center">
            <div className="space-y-1 md:space-y-2">
              <label className="block text-xs md:text-sm text-black font-bold">Vision and Values</label>
              <input
                type="text"
                className="w-[37vw] h-[20vw] p-1.5 md:p-2 border border-blue-500 rounded-lg text-sm focus:border-blue-500"
                placeholder="Vision and Values"
              />
            </div>
            <div className="space-y-1 md:space-y-2 ml-[30px]">
              <label className="block text-xs md:text-sm text-black font-bold">History & Location</label>
              <input
                type="text"
                className="w-[37vw] h-[20vw] p-1.5 md:p-2 border border-blue-500 rounded-lg text-sm focus:border-blue-500"
                placeholder="History & Location"
              />
            </div>
          </div>
          <div className="flex justify-end mt-3 md:mt-4 space-x-2 md:space-x-4">
            <button className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-red-600 bg-[#feb3b0] hover:bg-[#ff8f8c] rounded-lg">
              Clear Filter
            </button>
            <button className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-blue-600 bg-[#95d2ff] hover:bg-[#7bb8e6] rounded-lg">
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BabyeyiLetter;
