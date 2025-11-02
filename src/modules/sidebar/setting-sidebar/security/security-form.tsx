import SubmitButton from "@/components/button/submit-button";
import PasswordBox from "@/components/forms/password-box";
import { Save } from "lucide-react";
import React from "react";

export default function SecurityFormt() {
  return (
    <form>
      <PasswordBox name="oldPassword" placeholder="Old Password" />
      <PasswordBox name="newPassword" placeholder="New Password" />
      <PasswordBox name="confirmPassword" placeholder="Confirm Password" />
      <SubmitButton startIcon={<Save />} className="rounded w-full mt-3">
        Save Changes
      </SubmitButton>
    </form>
  );
}
