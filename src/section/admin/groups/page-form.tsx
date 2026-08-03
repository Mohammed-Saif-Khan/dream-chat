"use client";

import AvatarDP from "@/components/avatar";
import SubmitButton from "@/components/button/submit-button";
import SelectCombox from "@/components/forms/combobox";
import TextBox from "@/components/forms/text-box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "@/hooks/use-navigate";
import { fetchInstance } from "@/utils/fetch-instance";
import revalidate from "@/utils/revalidate";
import { UsersIcon } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { actionUrl, listUrl, pathRevalidate } from "./constant";
import GroupAvatarPicker from "./group-avatar-picker";

export type GroupMemberOption = {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
};

type GroupFormValues = {
  name: string;
  receiverIds: string[];
  groupAdmin: string;
};

type GroupsPageFormProps = {
  id: string;
  users: GroupMemberOption[];
  defaultValues?: Partial<GroupFormValues>;
  defaultAvatar?: string | null;
};

export default function GroupsPageForm({
  id,
  users,
  defaultValues,
  defaultAvatar,
}: GroupsPageFormProps) {
  const { back } = useNavigate();
  const isEdit = Boolean(id && id !== "new");

  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(
    defaultAvatar || null,
  );

  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<GroupFormValues>({
    defaultValues: {
      name: "",
      receiverIds: [],
      groupAdmin: "",
      ...defaultValues,
    },
  });

  const selectedIds = watch("receiverIds") || [];
  const groupAdminOptions = users
    .filter((user) => selectedIds.includes(user._id))
    .map((user) => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user._id,
    }));

  const onSubmit = async (data: GroupFormValues) => {
    const name = data?.name?.trim();
    const receiverIds = data?.receiverIds || [];

    if (!name) {
      toast.error("Group name is required");
      return;
    }

    if (receiverIds.length < 2) {
      toast.error("Select at least 2 members to create a group");
      return;
    }

    if (!data.groupAdmin || !receiverIds.includes(data.groupAdmin)) {
      toast.error("Choose a group admin from the selected members");
      return;
    }

    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `${listUrl}/${id}` : actionUrl;
      const response = await fetchInstance(url, {
        method,
        body: JSON.stringify({
          name,
          receiverIds,
          groupAdmin: data.groupAdmin,
        }),
      });
      const result = await response?.json();

      if (!result?.success) {
        toast.error(result?.message || "Something went wrong");
        return;
      }

      const groupId = isEdit ? id : result?.data?._id;

      if (avatarFile && groupId) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        const avatarResponse = await fetchInstance(
          `${actionUrl}/${groupId}/avatar`,
          {
            method: "PATCH",
            body: formData,
          },
        );
        const avatarResult = await avatarResponse.json();
        if (!avatarResult?.success) {
          toast.error(
            avatarResult?.message || "Group saved but avatar upload failed",
          );
        }
      }

      toast.success(result?.message || "Saved successfully");
      await revalidate(pathRevalidate, "page");
      back();
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Group" : "Add Group"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <Label className="mb-2 block">Group Photo</Label>
            <GroupAvatarPicker
              preview={avatarPreview}
              fallback="G"
              avatarSize="size-16"
              onChange={(file, preview) => {
                setAvatarFile(file);
                setAvatarPreview(preview);
              }}
            />
          </div>

          <TextBox
            name="name"
            label="Group Name"
            register={register}
            setValue={setValue}
            placeholder="Enter Group Name"
            startAddon={<UsersIcon />}
            className={{ fieldSet: "mb-0" }}
          />

          <div>
            <Label className="mb-2 block">Select Members</Label>
            <ScrollArea className="h-72 rounded-md border p-2">
              {users.map((user) => (
                <Controller
                  key={user._id}
                  control={control}
                  name="receiverIds"
                  render={({ field }) => (
                    <Label className="hover:bg-accent/50 flex items-center justify-between gap-3 rounded-md p-3 has-aria-checked:border-blue-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950 my-1">
                      <div className="flex items-center gap-2 font-normal">
                        <AvatarDP
                          src={user.avatar}
                          alt={`${user.firstName} ${user.lastName}`}
                          fallback={`${user.firstName} ${user.lastName}`}
                          avatarSize="size-8"
                        />
                        <p className="text-sm font-medium">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                      <Checkbox
                        checked={field.value?.includes(user._id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setValue("receiverIds", [
                              ...(field.value || []),
                              user._id,
                            ]);
                          } else {
                            setValue(
                              "receiverIds",
                              (field.value || []).filter(
                                (uid: string) => uid !== user._id,
                              ),
                            );
                            if (watch("groupAdmin") === user._id) {
                              setValue("groupAdmin", "");
                            }
                          }
                        }}
                        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                      />
                    </Label>
                  )}
                />
              ))}
            </ScrollArea>
          </div>

          <SelectCombox
            control={control}
            name="groupAdmin"
            label="Group Admin"
            placeholder={
              selectedIds.length ? "Select group admin" : "Select members first"
            }
            options={groupAdminOptions}
            disabled={!selectedIds.length}
            description="Only members selected above can be made the group admin"
            required
          />

          <SubmitButton
            size="lg"
            isSubmitting={isSubmitting}
            className="w-full rounded my-3"
          >
            {isEdit ? "Update Group" : "Create Group"}
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
