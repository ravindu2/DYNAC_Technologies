import { Edit, Eye, Trash2 } from 'lucide-react';


interface Member {
  _id: number;
  name: string;
  address: string;
  email: string;
}

interface MemberRowProps {
  member: Member;
  onDelete: (_id: number) => void;
  onUpdate: (updatedData: Partial<Member>) => void; // Add onUpdate prop
}

const MemberRow = ({ member, onDelete, onUpdate }: MemberRowProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 bg-white rounded-lg shadow-sm">
      {/* Member Info */}
      <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="text-sm font-medium text-[#191B37]">{member.name}</div>
        <div className="text-sm text-gray-500">{member.address}</div>
        <div className="text-sm text-gray-500">{member.email}</div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onUpdate({ name: 'Updated Name' })} // Example of calling onUpdate
          className="flex items-center gap-1 p-1.5 rounded-lg text-green-500 hover:bg-green-50 transition-colors"
          title="Edit"
        >
          <Edit size={16} />
          <span className="hidden text-sm font-medium sm:inline">Edit</span>
        </button>
        <button
          onClick={() => alert('View clicked')}
          className="flex items-center gap-1 p-1.5 rounded-lg text-purple-500 hover:bg-purple-50 transition-colors"
          title="View"
        >
          <Eye size={16} />
          <span className="hidden text-sm font-medium sm:inline">View</span>
        </button>
        <button
          onClick={() => onDelete(member._id)}
          className="flex items-center gap-1 p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
          <span className="hidden text-sm font-medium sm:inline">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default MemberRow;
