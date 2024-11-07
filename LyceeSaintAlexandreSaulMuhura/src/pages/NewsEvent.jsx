import React from "react";

export const Blog = () => {
  return (
    <>
      <section className="latest-news">
        <div className="news-cards flex flex-row justify-center space-x-5">
          <div className="w-[250px] h-[100px]">
            <h2 className="text-3xl font-semibold text-black">Latests News</h2>
            <p className="text-sm ml-4 bg-transparent">
              Stay informed about the latest happenings at UAB. From groundbreaking
              research discoveries to exciting campus events, we capture it all.
            </p>
            <button className="more-news mt-4 bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-md">
              More News →
            </button>
           
          </div>
          <div className="news-card rounded-lg shadow-lg bg-white w-[250px] h-[100px]">
            <div className="relative overflow-hidden h-full w-full">
              <img
                src="/path/to/image2.jpg"
                alt="News 2"
                className="rounded-t-lg object-cover w-full h-full transition ease-in-out delay-150 cursor-pointer hover:scale-125 duration-300"
              />
            </div>
            <div className="news-details p-4">
              <span className="text-sm text-gray-600">Health & Medicine</span>
              <span className="news-date text-sm text-gray-600 ml-1">
                Nov 05, 2024
              </span>
             
            </div>
          </div>
          <div className="news-card rounded-lg shadow-lg bg-white w-[250px] h-[180px]">
            <div className="relative overflow-hidden h-full w-full">
              <img
                src="/path/to/image3.jpg"
                alt="News 3"
                className="rounded-t-lg object-cover w-full h-full transition ease-in-out delay-150 cursor-pointer hover:scale-125 duration-300"
              />
            </div>
            <div className="news-details p-4">
              <span className="text-sm text-gray-600">News You Can Use</span>
              <span className="news-date text-sm text-gray-600 ml-1">
                {/* Nov 05, */}
              </span>
             
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
