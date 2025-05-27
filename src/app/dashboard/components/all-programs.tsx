import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import {
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Camera,
  Building,
  Video,
  Mic,
} from "lucide-react";

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

export default function AllPrograms() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-bold text-blue-900">All Program</p>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Search"
              className="w-40 h-9 text-sm bg-blue-600 text-white placeholder:text-blue-200 border-blue-600 focus:ring-blue-500"
            />
          </div>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16"></TableHead>
              <TableHead className="font-semibold text-gray-900">
                Program
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Sub Type
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Start Date
              </TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <TableRow key={program.id} className="hover:bg-gray-50">
                  <TableCell className="py-4">
                    <div
                      className={`w-10 h-10 ${program.color} rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="font-medium text-gray-900">
                      {program.name}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {program.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-gray-500 text-sm">
                      {program.subType}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-gray-500 text-sm">
                      {program.startDate || "-"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="w-4 h-4 mr-2" />
                          <span>Modify Program</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          <span>Delete Program</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
