import { useState, useEffect } from 'react';
import axios from 'axios';
import MemberRow from '../components/MemberRow';
import { Search } from 'lucide-react';

interface Member {
  _id: number;
  name: string;
  address: string;
  email: string;
}

const MemberList = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch trainers from API
  const fetchTrainers = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/clients', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update trainer details
  const updateTrainer = async (_id: number, updatedData: Partial<Member>): Promise<void> => {
    try {
      await axios.put(`http://localhost:5000/clients/${_id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTrainers(); // Refresh trainers after update
    } catch (error) {
      console.error('Error updating trainer:', error);
    }
  };

  // Delete trainer
  const deleteTrainer = async (_id: number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/clients/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMembers((prev) => prev.filter((member) => member._id !== _id));
    } catch (error) {
      console.error('Error deleting trainer:', error);
    }
  };

  // Fetch trainers on component mount
  useEffect(() => {
    fetchTrainers();
  }, []);

  // Filter trainers based on search term
  const filteredTrainers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="p-6 w-full max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-[#191B37]">Members</h1>
          <div className="font-semibold text-green-500">
            Total Members: {filteredTrainers.length}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full mb-6 sm:w-3/4 md:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#B7BBFF] text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
        </div>

        {/* Members List */}
        {loading ? (
          <p>Loading trainers...</p>
        ) : (
          <div className="space-y-3">
            {filteredTrainers.map((member) => (
              <MemberRow
                key={member._id}
                member={member}
                onDelete={() => deleteTrainer(member._id)}
                onUpdate={(updatedData) => updateTrainer(member._id, updatedData)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberList;
