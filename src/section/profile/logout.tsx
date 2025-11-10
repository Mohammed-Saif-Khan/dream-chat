"use client";
import { Card } from "@/components/ui/card";
import LogoutDialog from "@/modules/logout-dialog/logout";
import { useLogoutStore } from "@/store/logout";
import { LogOut } from "lucide-react";
import React from "react";

export default function Logout() {
  const { logout, setLogout } = useLogoutStore();

  return (
    <div className="py-6">
      <div>
        <p className="text-lg font-semibold text-foreground mb-2">Logout</p>
        <Card
          onClick={() => setLogout(true)}
          className="bg-background rounded-none p-5 shadow-none gap-0 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Logout
              </p>
              <p className="text-base text-muted-foreground capitalize">
                Sign out from this Device
              </p>
            </div>
            <div>
              <LogOut size={18} className="text-muted-foreground" />
            </div>
          </div>
        </Card>
      </div>
      <LogoutDialog open={logout} onClose={setLogout} />
    </div>
  );
}
