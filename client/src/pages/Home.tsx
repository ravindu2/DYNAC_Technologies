// src/pages/Home.tsx
import react, { useState } from 'react';
import img1 from '../assets/minator-logo.png';
import AuthModal from '../components/AuthModal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'signin' | 'signup'>('signin');

  const openModal = (type: 'signin' | 'signup') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#191B37] flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <img 
            src={img1}
            alt="Minator Logo" 
            className="mx-auto w-42 h-42"
          />
        </div>

        <div className="flex flex-col justify-center space-y-6 sm:space-y-0 sm:space-x-8 sm:flex-row">
          <button 
            onClick={() => openModal('signin')}
            className="bg-[#B7BBFF] text-[#191B37] px-12 py-2 rounded-md font-semibold hover:opacity-90 transition-all duration-200"
          >
            Sign In
          </button>
          <button 
            onClick={() => openModal('signup')}
            className="bg-[#B7BBFF] text-[#191B37] px-12 py-2 rounded-md font-semibold hover:opacity-90 transition-all duration-200"
          >
            Sign Up
          </button>
        </div>

        <AuthModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type={modalType}
        />
      </div>
    </div>
  );
};

export default Home;