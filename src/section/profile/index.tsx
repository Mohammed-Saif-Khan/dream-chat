import AvatarDP from "@/components/avatar";
import { Separator } from "@/components/ui/separator";
import { ProfileType } from "@/types/profile";
import { getFallbackName } from "@/utils/getFallbackName";
import ProfielInfo from "./profile-info";
import SocialMedia from "./social-media";
import Logout from "./logout";
import Deactivate from "./deactivate";

export default function ProfileSidebar({
  profile,
}: {
  profile?: ProfileType | undefined;
}) {
  return (
    <div>
      <h1 className="text-xl font-bold text-foreground mb-3">Profile</h1>
      <div className="flex flex-col items-center justify-center gap-6 pb-4">
        <AvatarDP
          src={profile?.avatar}
          alt="person_1"
          avatarSize="size-26"
          fallback={getFallbackName(profile?.firstName, profile?.lastName)}
        />
        <div>
          <p className="text-base font-semibold text-foreground text-center mb-1">
            {profile?.firstName} {profile?.lastName}
          </p>
          <p className="text-sm text-muted-foreground text-center">
            {profile?.about}
          </p>
        </div>
      </div>
      <Separator />
      <ProfielInfo profile={profile} />
      <SocialMedia profile={profile} />
      <Deactivate />
      <Logout />
    </div>
  );
}
