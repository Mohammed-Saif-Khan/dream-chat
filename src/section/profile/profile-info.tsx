import { Card } from "@/components/ui/card";
import { ProfileType } from "@/types/profile";
import { formatReadableDate } from "@/utils/formatDate";
import {
  CalendarDays,
  CircleUserRound,
  Info,
  Mail,
  MapPinned,
  Mars,
  Phone,
} from "lucide-react";

export default function ProfielInfo({
  profile,
}: {
  profile: ProfileType | undefined;
}) {
  return (
    <div className="py-6">
      <div>
        <p className="text-lg font-semibold text-foreground mb-2">
          Profile Info
        </p>
        <Card className="bg-background rounded-none p-5 shadow-none gap-0">
          <div className="flex items-center justify-between pb-4 mb-4 border-b">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Name</p>
              <p className="text-base text-muted-foreground capitalize">
                {profile?.firstName} {profile?.lastName}
              </p>
            </div>
            <div>
              <CircleUserRound size={14} className="text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between pb-4 mb-4 border-b">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Phone
              </p>
              <p className="text-base text-muted-foreground capitalize">
                {profile?.phone}
              </p>
            </div>
            <div>
              <Phone size={14} className="text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between pb-4 mb-4 border-b">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Gender
              </p>
              <p className="text-base text-muted-foreground capitalize">
                {profile?.gender}
              </p>
            </div>
            <div>
              <Mars size={14} className="text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between pb-4 mb-4 border-b">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Email Address
              </p>
              <p className="text-base text-muted-foreground">
                {profile?.email}
              </p>
            </div>
            <div>
              <Mail size={14} className="text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between pb-4 mb-4 border-b">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Bio</p>
              <p className="text-base text-muted-foreground">
                {profile?.about}
              </p>
            </div>
            <div>
              <Info size={14} className="text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between pb-4 mb-4 border-b">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Location
              </p>
              <p className="text-base text-muted-foreground">
                {profile?.country}
              </p>
            </div>
            <div>
              <MapPinned size={14} className="text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Join Date
              </p>
              <p className="text-base text-muted-foreground">
                {formatReadableDate(profile?.createdAt)}
              </p>
            </div>
            <div>
              <CalendarDays size={14} className="text-muted-foreground" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
