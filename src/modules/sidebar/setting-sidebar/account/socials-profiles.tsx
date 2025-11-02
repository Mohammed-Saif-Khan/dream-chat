import SubmitButton from "@/components/button/submit-button";
import TextBox from "@/components/forms/text-box";
import { Icon } from "@iconify/react";
import { Save } from "lucide-react";
import React from "react";

export default function SocialsProfiles() {
  return (
    <form>
      <TextBox
        name="facebook"
        placeholder="Facebook"
        endAddon={<Icon icon="ic:baseline-facebook" width="24" height="24" />}
      />
      <TextBox
        name="google"
        placeholder="Google"
        endAddon={<Icon icon="mdi:google" width="24" height="24" />}
      />
      <TextBox
        name="x"
        placeholder="X"
        endAddon={<Icon icon="ri:twitter-x-fill" width="24" height="24" />}
      />
      <TextBox
        name="linkedin"
        placeholder="Linkedin"
        endAddon={<Icon icon="mdi:linkedin" width="24" height="24" />}
      />
      <TextBox
        name="youtube"
        placeholder="YouTube"
        endAddon={<Icon icon="mingcute:youtube-fill" width="24" height="24" />}
      />
      <TextBox
        name="others"
        placeholder="Other"
        endAddon={<Icon icon="mdi:internet" width="24" height="24" />}
      />

      <SubmitButton startIcon={<Save />} className="rounded w-full">
        Save Changes
      </SubmitButton>
    </form>
  );
}
