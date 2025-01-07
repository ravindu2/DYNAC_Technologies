import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainerRow from '../components/TrainerRow';
import { Search } from 'lucide-react';

interface Trainer {
  _id: number;
  name: string;
  expertise: string;
  email: string;
}

const TrainerList: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]); 
  const [search, setSearch] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false); 


  
  const fetchTrainers = async (): Promise<void> => {
    setLoading(true); 
    try {
      const response = await axios.get('http://localhost:5000/trainers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      setTrainers(response.data); 
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false); 
    }
  };

  // Update a trainer
  const updateTrainer = async (_id: number, updatedData: Partial<Trainer>): Promise<void> => {
    try {
      await axios.put(`/api/trainers/${_id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTrainers(); // Reload trainers after update
    } catch (error) {
      console.error('Error updating trainer:', error);
    }
  };

  // Delete a trainer
  const deleteTrainer = async (_id: number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/trainers/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTrainers((prev) => prev.filter((trainer) => trainer._id !== _id)); // Update the trainers list after deletion
    } catch (error) {
      console.error('Error deleting trainer:', error);
    }
  };


  const filteredTrainers = trainers;
  

 
  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <div className="p-6 w-full max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#191B37]">Trainers</h1>
        <div className="font-semibold text-green-500">
          Total Trainers: {filteredTrainers.length}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#B7BBFF]"
        />
        <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
      </div>

      {/* Trainer List */}
      {loading ? (
        <p>Loading trainers...</p>
      ) : (
        <div className="space-y-3">
          {filteredTrainers.map((trainer) => (
            <TrainerRow
              key={trainer._id}
              member={trainer}
              onDelete={() => deleteTrainer(trainer._id)}
              onUpdate={(updatedData) => updateTrainer(trainer._id, updatedData)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainerList;
