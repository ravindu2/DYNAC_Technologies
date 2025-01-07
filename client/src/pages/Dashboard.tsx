import { useState, useEffect } from 'react';
import img1 from '../assets/minator-logo.png';
import TrainerModal from '../components/TrainerModal';
import MemberModel from '../components/MemberModel';
import axios from 'axios';

const Dashboard = () => {
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [stats, setStats] = useState({ members: 0, trainers: 0 });

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  useEffect(() => {
    // Fetch stats from the backend
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="w-full p-4 ml-16 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#191B37]">Dashboard</h1>
            <p className="text-gray-500">{currentDate}</p>
          </div>
          <div className="w-full text-left sm:w-auto sm:text-right">
            <p className="text-sm text-gray-500">Last Month</p>
            <p className="text-xl font-bold text-green-600 sm:text-2xl">218,740.00 LKR</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-lg text-gray-500">TOTAL MEMBERS</p>
            <p className="text-xl font-bold sm:text-2xl">{stats.members}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-lg text-gray-500">TOTAL TRAINERS</p>
            <p className="text-xl font-bold sm:text-2xl">{stats.trainers}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-lg text-gray-500">ACTIVE CLASSES</p>
            <p className="text-xl font-bold sm:text-2xl">021</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Logo Card */}
          <div className="lg:flex-1">
            <div className="bg-[#191B37] p-4 rounded-xl flex flex-col items-center justify-center aspect-[16/9]">
              <div className="w-24 max-w-xs sm:w-28">
                <img src={img1} alt="Minator Logo" className="w-full mb-2" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col justify-center w-full gap-6 px-4 sm:w-3/4 md:w-1/2 lg:w-1/2 sm:px-0">
            <button className="w-full bg-white text-[#191B37] px-4 py-3 rounded-xl border border-black hover:shadow-md transition-shadow text-sm font-medium">
              ADD PLANS
            </button>
            <button className="w-full bg-white text-[#191B37] px-4 py-3 rounded-xl border border-black hover:shadow-md transition-shadow text-sm font-medium">
              ADD CLASSES
            </button>
            <button
              onClick={() => setIsTrainerModalOpen(true)}
              className="w-full bg-white text-[#191B37] px-4 py-3 rounded-xl border border-black hover:shadow-md transition-shadow text-sm font-medium"
            >
              ADD TRAINERS
            </button>
            <button
              onClick={() => setIsMemberModalOpen(true)}
              className="w-full bg-white text-[#191B37] px-4 py-3 rounded-xl border border-black hover:shadow-md transition-shadow text-sm font-medium"
            >
              ADD MEMBERS
            </button>
          </div>
        </div>

        {/* Trainer Modal */}
        <TrainerModal
          isOpen={isTrainerModalOpen}
          onClose={() => setIsTrainerModalOpen(false)}
        />

        {/* Member Modal */}
        <MemberModel
          isOpen={isMemberModalOpen}
          onClose={() => setIsMemberModalOpen(false)}
        />
      </main>
    </div>
  );
};

export default Dashboard;
