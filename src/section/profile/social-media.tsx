import { Card } from "@/components/ui/card";
import { ProfileType } from "@/types/profile";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

export default function SocialMedia({
  profile,
}: {
  profile?: ProfileType | undefined;
}) {
  return (
    <div className="py-6">
      <div>
        <p className="text-lg font-semibold text-foreground mb-2">
          Social Media
        </p>
        <Card className="bg-background rounded-none p-5 shadow-none gap-0">
          <Link href={profile?.facebook || "#"} target="_blank">
            <div className="flex items-center justify-between pb-4 mb-4 border-b">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">
                  Facebook
                </p>
              </div>
              <div>
                <Icon
                  icon="ic:baseline-facebook"
                  width="14"
                  height="14"
                  className="text-muted-foreground"
                />
              </div>
            </div>
          </Link>
          <Link href={profile?.instagram || "#"} target="_blank">
            <div className="flex items-center justify-between pb-4 mb-4 border-b">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1 ">
                  Instagram
                </p>
              </div>
              <div>
                <Icon
                  icon="lineicons:instagram"
                  width="14"
                  height="14"
                  className="text-muted-foreground"
                />
              </div>
            </div>
          </Link>
          <Link href={profile?.x || "#"} target="_blank">
            <div className="flex items-center justify-between pb-4 mb-4 border-b">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">
                  X
                </p>
              </div>
              <div>
                <Icon
                  icon="ri:twitter-x-fill"
                  width="14"
                  height="14"
                  className="text-muted-foreground"
                />
              </div>
            </div>
          </Link>
          <Link href={profile?.linkedin || "#"} target="_blank">
            <div className="flex items-center justify-between pb-4 mb-4 border-b">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">
                  Linkedin
                </p>
              </div>
              <div>
                <Icon
                  icon="mdi:linkedin"
                  width="14"
                  height="14"
                  className="text-muted-foreground"
                />
              </div>
            </div>
          </Link>
          <Link href={profile?.youtube || "#"} target="_blank">
            <div className="flex items-center justify-between pb-4 mb-4 border-b">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">
                  YouTube
                </p>
              </div>
              <div>
                <Icon
                  icon="mingcute:youtube-fill"
                  width="14"
                  height="14"
                  className="text-muted-foreground"
                />
              </div>
            </div>
          </Link>
          <Link href={profile?.other || "#"} target="_blank">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">
                  Other
                </p>
              </div>
              <div>
                <Icon
                  icon="mdi:internet"
                  width="14"
                  height="14"
                  className="text-muted-foreground"
                />
              </div>
            </div>
          </Link>
        </Card>
      </div>
    </div>
  );
}
