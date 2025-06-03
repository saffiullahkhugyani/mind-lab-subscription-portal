import { Edit, Plus } from "lucide-react";

export default function SubscriptionAction() {
  return (
    <div className="flex flex-col m-8 items-center">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">
        Subscription Action
      </h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col text-center items-center">
          <a href="/status">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2 hover:bg-gray-200 cursor-pointer">
              <Plus className="w-6 h-6 text-gray-600" />
            </div>
          </a>
          <div className="text-sm">
            <div className="font-medium">Add Subscription</div>
            <div className="text-gray-600">to a Program</div>
          </div>
        </div>
        <div className="flex flex-col text-center items-center">
          <a href="/status">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2 hover:bg-gray-200 cursor-pointer">
              <Edit className="w-6 h-6 text-gray-600" />
            </div>
          </a>
          <div className="text-sm">
            <div className="font-medium">Modify Subscription</div>
            <div className="text-gray-600">of a Program</div>
          </div>
        </div>
      </div>
    </div>
  );
}
