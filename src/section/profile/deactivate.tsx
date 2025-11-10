import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import React from "react";

export default function Deactivate() {
  return (
    <div className="py-6">
      <div>
        <p className="text-lg font-semibold text-foreground mb-2">
          Profile Info
        </p>
        <Card className="bg-background rounded-none p-5 shadow-none gap-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Deactivate Account
              </p>
              <p className="text-base text-muted-foreground capitalize">
                Deactivate your Account
              </p>
            </div>
            <div>
              <Switch id="airplane-mode" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
