import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Upload, FileText } from "lucide-react";

interface PriceConfirmationDialogProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  programName: string;
  status: string;
  normalPrices: {
    plan1Month: number;
    plan3Month: number;
    plan12Month: number;
  };
  discountPercentages: {
    plan1Month: number;
    plan3Month: number;
    plan12Month: number;
  };
  newPrices: {
    plan1Month: number;
    plan3Month: number;
    plan12Month: number;
  };
  subscriptionType?: "normal" | "promotion" | "special price";
  onApprove: () => void;
}

export const PriceConfirmation = ({
  setIsOpen,
  programName,
  status,
  normalPrices,
  discountPercentages,
  newPrices,
  onApprove,
}: PriceConfirmationDialogProps) => {
  const handleApprove = () => {
    onApprove(); // Process the original function
    setIsOpen(false); // Close the dialog
  };

  return (
    <div className="max-w-md p-4 space-y-4">
      {/* Program Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-medium text-lg">{programName}</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {status}
          </span>
        </div>
      </div>
      {/* Plan Price Sections */}
      <div className="space-y-6">
        {/* Current Price Section */}
        <div>
          <h3 className="font-semibold text-md mb-2">Current Price</h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label>1 month</Label>
              <Input
                value={`$${normalPrices.plan1Month.toFixed(2)}`}
                disabled
              />
            </div>
            <div>
              <Label>3 month</Label>
              <Input value={`$${normalPrices.plan3Month}`} disabled />
            </div>
            <div>
              <Label>12 month</Label>
              <Input value={`$${normalPrices.plan12Month}`} disabled />
            </div>
          </div>
        </div>

        {/* New Price Section */}
        <div>
          <h3 className="font-semibold text-md mb-2">New Price</h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label>1 month</Label>
              <Input value={`$${newPrices.plan1Month}`} disabled />
            </div>
            <div>
              <Label>3 month</Label>
              <Input value={`$${newPrices.plan3Month}`} disabled />
            </div>
            <div>
              <Label>12 month</Label>
              <Input value={`$${newPrices.plan12Month}`} disabled />
            </div>
          </div>
        </div>

        {/* Discount Percentage Section */}
        <div>
          <h3 className="font-semibold text-md mb-2">Discount Percentage</h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label>1 month</Label>
              <Input
                value={`${discountPercentages.plan1Month}%`}
                className={
                  discountPercentages.plan1Month > 0 ? "text-green-600" : ""
                }
                disabled
              />
            </div>
            <div>
              <Label>3 month</Label>
              <Input
                value={`${discountPercentages.plan3Month}%`}
                className={
                  discountPercentages.plan3Month > 0 ? "text-green-600" : ""
                }
                disabled
              />
            </div>
            <div>
              <Label>12 month</Label>
              <Input
                value={`${discountPercentages.plan12Month}%`}
                className={
                  discountPercentages.plan12Month > 0 ? "text-green-600" : ""
                }
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex justify-center gap-6 border-t pt-4">
        <button
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
          onClick={() => setIsOpen(false)}
        >
          Decline
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={handleApprove}
        >
          Approve
        </button>
      </div>
    </div>
  );
};
