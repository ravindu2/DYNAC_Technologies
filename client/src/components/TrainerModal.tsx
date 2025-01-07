import React from 'react';
import axios from 'axios';

interface TrainerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  experience: string;
}

interface TrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrainerModal: React.FC<TrainerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = React.useState<TrainerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    experience: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare form data
    const trainerData = {
      name: `${formData.firstName} ${formData.lastName}`,
      expertise: formData.specialization,
      email: formData.email,
      phone: formData.phone
    };

    try {
      // Send POST request to the backend API
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5000/trainers', trainerData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },});
      console.log('Trainer added:', response.data);
      onClose();
    } catch (error) {
      console.error('Error adding trainer:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg">
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold text-[#191B37] mb-6">Add New Trainer</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#191B37]"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#191B37]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#191B37]"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#191B37]"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Specialization
            </label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#191B37]"
              required
            >
              <option value="">Select Specialization</option>
              <option value="weight-training">Weight Training</option>
              <option value="cardio">Cardio</option>
              <option value="yoga">Yoga</option>
              <option value="crossfit">CrossFit</option>
              <option value="nutrition">Nutrition</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Experience (years)
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              max="50"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#191B37]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#191B37] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity mt-6"
          >
            Add Trainer
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrainerModal;
