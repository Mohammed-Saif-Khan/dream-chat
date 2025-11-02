import SubmitButton from "@/components/button/submit-button";
import TextArea from "@/components/forms/text-area";
import TextBox from "@/components/forms/text-box";
import { CalendarDays, Map, Mars, Plus, Save, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SelectBox from "@/components/forms/select-box";
import DatePickerBox from "@/components/forms/date-picker-box";
import { useForm } from "react-hook-form";

export default function PersonalInfo() {
  const { control } = useForm();

  return (
    <form>
      <div className="flex items-center justify-center mb-4">
        <div className="relative border-3 border-dashed border-primary rounded-full p-1">
          <Avatar className="size-18">
            <AvatarImage src="/noimage.avif" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span
            className={cn(
              "bg-white absolute end-0 bottom-0 flex items-center justify-center size-5 rounded-full border-2 border-white"
            )}
          >
            <Button
              size="icon-sm"
              className="bg-primary rounded-full size-3 flex items-center justify-center p-1 [&_svg]:!size-3"
            >
              <Plus className="text-white font-bold" />
            </Button>
          </span>
        </div>
      </div>
      <TextBox name="firstName" placeholder="First Name" endAddon={<User />} />
      <TextBox name="lastName" placeholder="Last Name" endAddon={<User />} />
      <SelectBox
        name="gender"
        placeholder="Gender"
        selectLabel="Select Gender"
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "femail" },
        ]}
      />
      <DatePickerBox control={control} name="dob" placeholder="Date of Birth" />
      <TextBox name="country" placeholder="Country" endAddon={<Map />} />
      <TextArea name="about" placeholder="About" rows={32} />
      <SubmitButton startIcon={<Save />} className="mt-3 w-full rounded">
        Save Changes
      </SubmitButton>
    </form>
  );
}
