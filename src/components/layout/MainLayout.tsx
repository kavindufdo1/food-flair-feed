
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

interface MainLayoutProps {
  children: ReactNode;
  showSidebars?: boolean;
}

const MainLayout = ({ children, showSidebars = true }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="food-container py-4">
        <div className="flex flex-col md:flex-row gap-4">
          {showSidebars && (
            <aside className="hidden md:block w-64 sticky top-20 self-start">
              <Sidebar />
            </aside>
          )}
          
          <main className="flex-grow">
            {children}
          </main>
          
          {showSidebars && (
            <aside className="hidden lg:block w-72 sticky top-20 self-start">
              <RightSidebar />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
