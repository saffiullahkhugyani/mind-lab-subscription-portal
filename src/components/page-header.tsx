import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
    pageTitle: string;
    onClick?: () => void;
}

export default function PageHeader({onClick, pageTitle}: PageHeaderProps) {
    return <header className="flex items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="cursor-pointer">
            <ChevronLeft />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">
            {pageTitle}
          </h1>
        </div>
      </header>
}