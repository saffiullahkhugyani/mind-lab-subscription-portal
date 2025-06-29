"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProgramSubscriptionModel, Users } from "@/types/custom-types";
import { Programs } from "@/types/types";
import CustomLoader from "@/components/CustomLoader";
import { SearchableDropdown } from "@/components/searchable-dropdown";
import { useToast } from "@/hooks/use-toast";
import { MultiSelect } from "@/components/multi-select";

interface SendSpecialDealProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  users?: Users[] | null;
  programs?: Programs[] | null;
  programSubscription?: ProgramSubscriptionModel[] | null;
}

export default function SendSpecialDealBulk({
  setIsOpen,
  users,
  programs,
  programSubscription,
}: SendSpecialDealProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Programs | null>(null);
  const [sendingEmail, setSendingEmail] = useState(false);

  const { toast } = useToast();

  const { normal, special } = useMemo(() => {
    if (!selectedProgram || !programSubscription)
      return { normal: null, special: null };

    const normal = programSubscription.find(
      (item) =>
        item.programId === selectedProgram.programId &&
        item.subscriptionType === "normal"
    );

    const special = programSubscription.find(
      (item) =>
        item.programId === selectedProgram.programId &&
        item.subscriptionType === "special deal"
    );

    return { normal, special };
  }, [selectedProgram, programSubscription]);

  const calculateDiscount = (normal: number, special: number) => {
    return normal && special
      ? `${Math.round(((normal - special) / normal) * 100)}%`
      : "0%";
  };

  const handleSubmit = async () => {
    if (
      !selectedUsers.length ||
      !selectedProgram ||
      !normal ||
      !special ||
      !users
    ) {
      toast({
        title: "Error",
        description: "Please select a user and a program with valid prices.",
        variant: "destructive",
      });
      return;
    }

    setSendingEmail(true);

    const emailPromises = selectedUsers.map(async (userId) => {
      const selectedUser = users?.find((user) => user.id === userId);
      if (!selectedUser) return;

      const payload = {
        userId: selectedUser.id,
        userName: selectedUser.name,
        userEmail: selectedUser.email,
        programId: selectedProgram.programId,
        programName: selectedProgram.programEnglishName,
        specialDealUrl: `https://yourapp.com/special-deal?user=${selectedUser.id}`,
        prices: {
          normal: {
            oneMonth: normal.planOneMonth!,
            threeMonth: normal.planThreeMonth!,
            twelveMonth: normal.planTwelveMonth!,
          },
          special: {
            oneMonth: special.planOneMonth!,
            threeMonth: special.planThreeMonth!,
            twelveMonth: special.planTwelveMonth!,
          },
          discounts: {
            oneMonth: calculateDiscount(
              normal.planOneMonth!,
              special.planOneMonth!
            ),
            threeMonth: calculateDiscount(
              normal.planThreeMonth!,
              special.planThreeMonth!
            ),
            twelveMonth: calculateDiscount(
              normal.planTwelveMonth!,
              special.planTwelveMonth!
            ),
          },
        },
      };

      try {
        const res = await fetch("/api/special-deal/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await res.json();

        if (!res.ok) throw new Error("Email failed: ", result);

        return result;
      } catch (error) {
        console.error("Failed to send email:", error);
      }
    });

    const response = await Promise.all(emailPromises);

    toast({
      title: "Success",
      description: "Email send to selected users",
      variant: "success",
    });
    setSendingEmail(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const userOptions = users?.map((item) => ({
    label: `${item.name} (${item.email})`,
    value: item.id,
  }));

  return (
    <div className="flex flex-row gap-6">
      {/* Left Side - Selection */}
      <div className="flex-1 flex flex-col gap-4 mt-8 p-5">
        {/* User Select */}
        <div>
          <Label htmlFor="user">Choose User</Label>
          <MultiSelect
            options={userOptions!}
            onValueChange={setSelectedUsers}
            defaultValue={selectedUsers}
            placeholder="Select frameworks"
            variant="inverted"
            animation={2}
            maxCount={3}
            modalPopover={true}
          />
        </div>

        {/* Program Select */}
        <div className="w-[300px]">
          <Label htmlFor="program">Choose Program</Label>
          <Select
            onValueChange={(val) => {
              const prog = programs?.find((p) => p.programId === Number(val));
              setSelectedProgram(prog ?? null);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {programs?.map((program) => (
                  <SelectItem
                    key={program.programId}
                    value={program.programId!.toString()}
                  >
                    {program.programEnglishName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <Button type="button" onClick={handleSubmit} disabled={sendingEmail}>
            {sendingEmail ? (
              <CustomLoader className="h-6 w-6 border-white" />
            ) : (
              "Send Email"
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="bg-accent"
            onClick={() => setIsOpen(false)}
            disabled={sendingEmail}
          >
            Cancel
          </Button>
        </div>
      </div>

      {/* Right Side - Price Info */}
      {selectedProgram && (normal || special) && (
        <div className="flex-1 w-ful p-4 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">
                {selectedProgram.programEnglishName}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Active
              </span>
            </div>
          </div>

          {/* Current Price */}
          {normal && (
            <div>
              <h3 className="font-semibold text-md mb-2">Current Price</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>1 month</Label>
                  <Input value={`$${normal.planOneMonth}`} disabled />
                </div>
                <div>
                  <Label>3 month</Label>
                  <Input value={`$${normal.planThreeMonth}`} disabled />
                </div>
                <div>
                  <Label>12 month</Label>
                  <Input value={`$${normal.planTwelveMonth}`} disabled />
                </div>
              </div>
            </div>
          )}

          {/* Special Deal Price */}
          {special && (
            <div>
              <h3 className="font-semibold text-md mb-2">Special Deal Price</h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>1 month</Label>
                  <Input value={`$${special.planOneMonth}`} disabled />
                </div>
                <div>
                  <Label>3 month</Label>
                  <Input value={`$${special.planThreeMonth}`} disabled />
                </div>
                <div>
                  <Label>12 month</Label>
                  <Input value={`$${special.planTwelveMonth}`} disabled />
                </div>
              </div>
            </div>
          )}

          {/* Discount Percentage */}
          {normal && special && (
            <div>
              <h3 className="font-semibold text-md mb-2">
                Discount Percentage
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>1 month</Label>
                  <Input
                    value={calculateDiscount(
                      normal.planOneMonth!,
                      special.planOneMonth!
                    )}
                    className="text-green-600"
                    disabled
                  />
                </div>
                <div>
                  <Label>3 month</Label>
                  <Input
                    value={calculateDiscount(
                      normal.planThreeMonth!,
                      special.planThreeMonth!
                    )}
                    className="text-green-600"
                    disabled
                  />
                </div>
                <div>
                  <Label>12 month</Label>
                  <Input
                    value={calculateDiscount(
                      normal.planTwelveMonth!,
                      special.planTwelveMonth!
                    )}
                    className="text-green-600"
                    disabled
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
