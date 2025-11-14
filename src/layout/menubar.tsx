"use client";
import LOGO from "@/assets/auth/logo.png";
import AvatarDP from "@/components/avatar";
import ModeToogleButton from "@/components/button/mode-toogle";
import { Toggle } from "@/components/ui/toggle";
import { useNavigate } from "@/hooks/use-navigate";
import { cn } from "@/lib/utils";
import { ProfileType } from "@/types/profile";
import { menubarHideURL, navbar } from "@/utils/constant";
import { getFallbackName } from "@/utils/getFallbackName";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menubar({
  profile,
}: {
  profile: ProfileType | undefined;
}) {
  const { push } = useNavigate();
  const pathname = usePathname();
  const menubarShow = menubarHideURL.includes(pathname);
  const fallbackName = getFallbackName(profile?.firstName, profile?.lastName);

  return (
    !menubarShow && (
      <div className="xl:p-2 p-4 xl:pb-10 border-t xl:border-none bg-background lg:flex items-center flex-col justify-between border-r">
        <div>
          <Image
            src={LOGO}
            width={55}
            height={30}
            alt="logo"
            onClick={() => push("/chat")}
            className="cursor-pointer xl:block hidden"
          />

          <div className="xl:mt-4 flex xl:flex-col items-center justify-between xl:gap-6">
            {navbar?.map((item, index) => {
              const Icon = item?.icon;
              return (
                <Link
                  key={index}
                  href={item?.link}
                  className={cn(
                    index === 5 || index === 2 ? "hidden xl:block" : "block"
                  )}
                >
                  <p className="flex items-center flex-col gap-6">
                    <Toggle
                      className={cn(
                        "[&_svg]:!size-6 cursor-pointer text-muted-foreground hover:text-foreground",
                        item?.link === pathname &&
                          "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
                      )}
                    >
                      <Icon size={26} className="cursor-pointer" />
                    </Toggle>
                  </p>
                </Link>
              );
            })}
            <div onClick={() => push("/profile")} className="xl:hidden">
              <AvatarDP
                src={profile?.avatar}
                alt="person_1"
                avatarSize="xl:size-10 size-8"
                fallback={fallbackName}
              />
            </div>
          </div>
        </div>
        <div className="xl:flex hidden flex-col items-center gap-6">
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
