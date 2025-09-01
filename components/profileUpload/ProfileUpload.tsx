"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Label } from "../ui/label";
import { Loader, Pencil } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { updateUserProfileImageAction } from "@/actions/user.action";
import { fetchAndSetUser } from "@/lib/fetchUser";
import toast from "react-hot-toast";

type FileInputProps = {
  textPlaceholder: string;
  imageUrl: string | null;
  isAvailable?: boolean;
};

type FormValues = {
  profileImage: FileList;
};

const ProfileUpload = ({
  textPlaceholder,
  imageUrl,
  isAvailable = true,
}: FileInputProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const file = data.profileImage?.[0];
    if (!file) return;

    // Enforce 2 MB max file size
    const MAX_SIZE_BYTES = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      toast.error("File size must be less than 2MB");
      reset();
      return;
    }

    try {
      setIsLoading(true);
      const response = await updateUserProfileImageAction(file);

      if (response.success) {
        toast.success(response.message);
        reset();
        await fetchAndSetUser();
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="relative" onSubmit={handleSubmit(onSubmit)}>
      <div>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="profile-image"
            width={100}
            height={100}
            className="w-16 h-16 sm:w-[100px] sm:h-[100px] rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center rounded-full border text-2xl text-green-500">
            {textPlaceholder}
          </div>
        )}
      </div>

      {/* Availability Indicator */}
      <span className="size-4 rounded-full p-[2px] bg-white absolute top-0 left-3">
        <span
          className={`w-full h-full block rounded-full ${
            isAvailable ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </span>

      {/* Pencil Icon Trigger */}
      <Label
        htmlFor="image-profile"
        className="absolute bottom-0 right-0 cursor-pointer"
      >
        <div className="border-2 border-green-700 bg-white p-[6px] flex items-center justify-center rounded-full w-8 h-8">
          {isLoading ? (
            <Loader className="size-4 text-green-700 animate-spin" />
          ) : (
            <Pencil className="size-4 text-green-700" />
          )}
        </div>
      </Label>

      {/* File Input using RHF Controller */}
      <Controller
        name="profileImage"
        control={control}
        render={({ field }) => (
          <input
            type="file"
            id="image-profile"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              field.onChange(e.target.files);
              handleSubmit(onSubmit)();
            }}
          />
        )}
      />
    </form>
  );
};

export default ProfileUpload;
