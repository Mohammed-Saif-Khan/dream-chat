"use client";

import LOGO from "@/assets/auth/logo.png";
import AvatarDP from "@/components/avatar";
import ModeToogleButton from "@/components/button/mode-toogle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "@/hooks/use-navigate";
import { cn } from "@/lib/utils";
import LogoutDialog from "@/modules/logout-dialog/logout";
import { navItems } from "@/routes/admin-rotue";
import { ProfileType } from "@/types/profile";
import { getFallbackName } from "@/utils/getFallbackName";
import {
  ChevronsUpDown,
  LogOut,
  MessageCircle,
  Moon,
  Shield,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function AppSidebar({
  profile,
}: {
  profile: ProfileType | null;
}) {
  const pathname = usePathname();
  const { push } = useNavigate();
  const [logout, setLogout] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const fallbackName = getFallbackName(profile?.firstName, profile?.lastName);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-default" asChild>
              <div>
                <div className="text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Image
                    src={LOGO}
                    width={35}
                    height={30}
                    alt="logo"
                    onClick={() => push("/chat")}
                    className="cursor-pointer md:block hidden"
                  />

                  <Shield className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin Panel</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Sky Bhart
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname?.startsWith(item.link);
                return (
                  <SidebarMenuItem key={item.link}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.label}
                      onClick={() => push(item.link)}
                      className={cn(
                        "cursor-pointer ",
                        "data-[active=true]:bg-primary data-[active=true]:text-white data-[active=true]:hover:bg-primary data-[active=true]:hover:text-white",
                      )}
                    >
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-pointer"
              onClick={() => push("/chat")}
              tooltip="Back to Chat"
            >
              <MessageCircle />
              <span>Back to Chat</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="cursor-pointer">
                  <AvatarDP
                    src={profile?.avatar}
                    alt={fallbackName}
                    fallback={fallbackName}
                    avatarSize="size-8"
                  />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {profile?.firstName} {profile?.lastName}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {profile?.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
                side="top"
                align="end"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-0.5">
                    <span className="truncate font-medium">
                      {profile?.firstName} {profile?.lastName}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {profile?.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="justify-between"
                >
                  Theme
                  {theme === "light" ? (
                    <Sun
                      size={26}
                      className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground hover:text-foreground"
                    />
                  ) : (
                    <Moon
                      size={26}
                      className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground hover:text-foreground"
                    />
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setLogout(true)}
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <LogoutDialog open={logout} onClose={setLogout} />
    </Sidebar>
  );
}
