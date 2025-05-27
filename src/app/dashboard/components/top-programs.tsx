"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clubs, Programs, TopPrograms } from "@/types/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Plus,
  Edit,
  Trash2,
  Star,
  MoreHorizontal,
  Filter,
  Camera,
  Video,
  Mic,
  Building,
} from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface TopProgramProps {
  getTopPrograms?: TopPrograms[] | null;
  allPrograms: Programs[] | null;
  clubs: Clubs[] | null;
}

const programs = [
  {
    id: 1,
    name: "Program 1",
    color: "bg-purple-500",
    icon: Camera,
    status: "active",
    subType: "standard",
    startDate: "",
  },
  {
    id: 2,
    name: "Program 2",
    color: "bg-teal-500",
    icon: Building,
    status: "active",
    subType: "standard",
    startDate: "",
  },
  {
    id: 3,
    name: "Program 3",
    color: "bg-pink-500",
    icon: Video,
    status: "active",
    subType: "standard",
    startDate: "01/may/2025",
  },
  {
    id: 4,
    name: "Program 4",
    color: "bg-blue-600",
    icon: Mic,
    status: "active",
    subType: "standard",
    startDate: "01/may/2025",
  },
];

export default function TopProgramsComponent({
  clubs,
  allPrograms,
  getTopPrograms,
}: TopProgramProps) {
  const [topPrograms, setTopPrograms] = useState(getTopPrograms!);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [availablePrograms, setAvailablePrograms] = useState<
    typeof allPrograms
  >([]);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleClubChange = (clubId: string) => {
    setSelectedClub(clubId);
    setSelectedProgram("");
    const clubPrograms = allPrograms!.filter(
      (program) => program.clubId!.toString() === clubId
    );
    setAvailablePrograms(clubPrograms);
  };

  const handleAddToTopPrograms = async () => {
    if (!selectedProgram) return;

    const programToAdd = allPrograms!.find(
      (p) => p.programId!.toString() === selectedProgram
    );

    if (!programToAdd) return;

    const isAlreadyInTop = topPrograms.some(
      (p) => p.programId === programToAdd.programId
    );

    if (isAlreadyInTop) {
      // Optionally: show a toast, alert, or message to user
      toast({
        title: "Program already exists",
        description: "This program is already in the Top Programs list.",
        variant: "destructive",
      });
      // alert("Program already exists in Top Programs.");
      setIsDialogOpen(false);
      setSelectedClub("");
      setSelectedProgram("");
      setAvailablePrograms([]);
      return;
    }

    setIsLoading(true);

    const response = await fetch("/api/top-programs/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clubId: selectedClub,
        programId: selectedProgram,
      }),
    });

    setIsLoading(false);

    if (response.ok) {
      startTransition(() => {
        router.refresh(); // Refreshes server components
      });

      setTopPrograms((prev) => [...prev, programToAdd]);

      toast({
        title: "Program Added",
        description: `${programToAdd.programEnglishName} has been added to Top Programs.`,
        variant: "success",
      });

      setIsDialogOpen(false);
      setSelectedClub("");
      setSelectedProgram("");
      setAvailablePrograms([]);
    }
  };

  const handleRemoveFromTopPrograms = () => {
    if (!selectedProgram) return;

    const programId = Number.parseInt(selectedProgram);
    const isInTopPrograms = topPrograms.some((p) => p.programId === programId);

    if (isInTopPrograms) {
      setTopPrograms((prev) => prev.filter((p) => p.programId !== programId));
    }

    setIsDialogOpen(false);
    setSelectedClub("");
    setSelectedProgram("");
    setAvailablePrograms([]);
  };
  return (
    <div>
      {/* Top Programs Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          Top Programs
        </h2>
        <div className="flex gap-4">
          {getTopPrograms?.length === 0 ? (
            <div className="flex items-center justify-center w-full h-32 bg-gray-100 text-gray-500 rounded-lg">
              Please select a program to add top programs
            </div>
          ) : (
            getTopPrograms!.map((program, index) => {
              const IconComponent = Building;
              return (
                <Card
                  key={program.id}
                  className={`${programs.at(index)?.color} text-white w-40 h-32 border-0`}
                >
                  <CardContent className="p-4 flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start">
                      <IconComponent className="w-6 h-6" />
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">{program.programName}</h3>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Card className="w-40 h-32 border-2 border-dashed border-gray-300 bg-white cursor-pointer hover:bg-gray-50">
                <CardContent className="p-4 flex flex-col items-center justify-center h-full text-gray-500">
                  <Plus className="w-8 h-8 mb-2" />
                  <span className="text-sm text-center font-medium">
                    Add/Remove Top Programs
                  </span>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-blue-900 font-semibold">
                  ADD To Top Programs
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="club" className="text-sm font-medium">
                    Club Name
                  </Label>
                  <Select value={selectedClub} onValueChange={handleClubChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a club" />
                    </SelectTrigger>
                    <SelectContent>
                      {clubs!.map((club) => (
                        <SelectItem
                          key={club.clubId}
                          value={club.clubId!.toString()}
                        >
                          {club.clubName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program" className="text-sm font-medium">
                    Program Name
                  </Label>
                  <Select
                    value={selectedProgram}
                    onValueChange={setSelectedProgram}
                    disabled={!selectedClub}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a program" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePrograms!.map((program) => (
                        <SelectItem
                          key={program.programId}
                          value={program.programId!.toString()}
                        >
                          {program.programEnglishName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <Button
                    onClick={handleAddToTopPrograms}
                    disabled={!selectedProgram || isLoading || isPending}
                    className="bg-blue-900 hover:bg-blue-800 text-white"
                  >
                    {isLoading || isPending
                      ? "Adding..."
                      : "Add to Top Programs"}
                  </Button>
                  <Button
                    onClick={handleRemoveFromTopPrograms}
                    disabled={!selectedProgram}
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Remove from Top Program
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
