import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl">
          <Suspense 
            fallback={
              <div className="flex items-center justify-center min-h-[40vh]">
                <Loader2 className="w-8 h-8 animate-spin text-burgundy" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
