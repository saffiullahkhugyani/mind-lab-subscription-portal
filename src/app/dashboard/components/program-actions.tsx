import { Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ProgramActions() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">
        Program Actions
      </h2>
      <div className="flex gap-6">
        <div className="text-center">
          <a href="/add-program">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2 hover:bg-gray-200 cursor-pointer">
              <Plus className="w-6 h-6 text-gray-600" />
            </div>
          </a>
          <div className="text-sm">
            <div className="font-medium">ADD</div>
            <div className="text-gray-600">Program</div>
          </div>
        </div>
        <div className="text-center">
          <a href="/modify-program">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2 hover:bg-gray-200 cursor-pointer">
              <Edit className="w-6 h-6 text-gray-600" />
            </div>
          </a>
          <div className="text-sm">
            <div className="font-medium">Modify</div>
            <div className="text-gray-600">Program</div>
          </div>
        </div>
        <div className="text-center">
          <a href="/delete-program">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2 hover:bg-gray-200 cursor-pointer">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
          </a>
          <div className="text-sm">
            <div className="font-medium">Delete</div>
            <div className="text-gray-600">Program</div>
          </div>
        </div>
      </div>
    </div>
  );
}
