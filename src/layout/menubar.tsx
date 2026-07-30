"use client";
import LOGO from "@/assets/auth/logo.png";
import AvatarDP from "@/components/avatar";
import ModeToogleButton from "@/components/button/mode-toogle";
import { Toggle } from "@/components/ui/toggle";
import { useNavigate } from "@/hooks/use-navigate";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/store/profile";
import { ProfileType } from "@/types/profile";
import { menubarHideURL, navbar } from "@/utils/constant";
import { getFallbackName } from "@/utils/getFallbackName";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";

export default function Menubar() {
  const { profile, getProfile } = useProfileStore();
  const { push } = useNavigate();
  const pathname = usePathname();
  const menubarShow = menubarHideURL.includes(pathname);
  const fallbackName = getFallbackName(profile?.firstName, profile?.lastName);

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
    !menubarShow && (
      <div className="lg:p-2 p-4 md:pb-10 border-t md:border-none bg-background md:flex items-center flex-col justify-between border-r w-full">
        <div>
          <Image
            src={LOGO}
            width={35}
            height={30}
            alt="logo"
            onClick={() => push("/chat")}
            className="cursor-pointer md:block hidden"
          />

          <div className="md:mt-4 flex md:flex-col items-center justify-between md:gap-6">
            {navbar?.map((item, index) => {
              const Icon = item?.icon;
              return (
                <Link
                  key={index}
                  href={item?.link}
                  className={cn(
                    index === 5 || index === 2 ? "hidden md:block" : "block",
                    "aria-[current=page]:text-accent aria-[current=page]:bg-accent",
                  )}
                >
                  <p className="flex items-center flex-col gap-6">
                    <Toggle
                      pressed={item?.link === pathname}
                      className={cn(
                        "[&_svg]:!size-6 cursor-pointer text-muted-foreground hover:text-foreground",
                        "group-aria-[current=page]:bg-accent group-aria-[current=page]:text-accent-foreground",
                      )}
                    >
                      <Icon size={26} className="cursor-pointer" />
                    </Toggle>
                  </p>
                </Link>
              );
            })}
            <div onClick={() => push("/profile")} className="md:hidden">
              <AvatarDP
                src={profile?.avatar}
                alt="person_1"
                avatarSize="md:size-10 size-8"
                fallback={fallbackName}
              />
            </div>
          </div>
        </div>
        <div className="md:flex hidden flex-col items-center gap-6">
          <ModeToogleButton />
          <div onClick={() => push("/profile")}>
            <AvatarDP
              src={profile?.avatar}
              alt="person_1"
              avatarSize="size-10"
              fallback={fallbackName}
            />
          </div>
        </div>
      </div>
    )
  );
}
