import React from 'react'

const page = () => {
  return (
     <>

     <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                  Welcome Admin,
                </h1>
      
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          


          {/* Members Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
           
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">20</p>
                <div className="flex items-center mt-2">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <i className="fas fa-arrow-up mr-1" />
                    8%
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-users text-green-600 text-xl" />
              </div>
            </div>
          </div>
          {/* Plans Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Plans
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">4</p>
                
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-shopping-cart text-orange-600 text-xl" />
              </div>
            </div>
          </div>
         
        </div>
       
        
       
      
    </>
  )
}

export default page