import React from 'react';

const Logo = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-6 h-6"
    fill="currentColor"
  >
    <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5ZM12 4.15L5.04 8L12 11.85L18.96 8L12 4.15Z"/>
  </svg>
);

const PlansClasses = () => {
  const plans = [
    { type: 'Member', price: '2000 LKR' },
    { type: 'Plus', price: '2000 LKR' },
    { type: 'Gold', price: '2000 LKR' }
  ];

  const classes = [
    { name: 'Beginner BOX FIT', day: 'Saturday', time: '2:00 PM - 5:00 PM' },
    { name: 'Beginner BOX FIT', day: 'Saturday', time: '2:00 PM - 5:00 PM' },
    { name: 'Beginner BOX FIT', day: 'Saturday', time: '2:00 PM - 5:00 PM' },
    { name: 'Beginner BOX FIT', day: 'Saturday', time: '2:00 PM - 5:00 PM' },
    { name: 'Beginner BOX FIT', day: 'Saturday', time: '2:00 PM - 5:00 PM' },
    { name: 'Beginner BOX FIT', day: 'Saturday', time: '2:00 PM - 5:00 PM' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 mx-auto max-w-7xl sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-8 sm:flex-row sm:items-center">
          <h1 className="text-xl font-semibold sm:text-2xl">Plans & Classes</h1>
          <span className="text-sm text-gray-500">Jan 03, 2023</span>
        </div>

        {/* Plans Section */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-medium">Plans</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className="p-4 text-white transition-shadow duration-300 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm opacity-80">{plan.type}</div>
                    <div className="mt-1 text-xl font-bold">{plan.price}</div>
                  </div>
                  <Logo />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Classes Section */}
        <section>
          <h2 className="mb-4 text-lg font-medium">Classes</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((classItem, index) => (
              <div 
                key={index} 
                className="p-4 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md"
              >
                <div className="text-base font-medium">{classItem.name}</div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {classItem.day}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {classItem.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlansClasses;