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
        reset();
        await fetchAndSetUser();
        toast.success(response.message);
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
    <form className="relative inline-block" onSubmit={handleSubmit(onSubmit)}>
      <div>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="profile-image"
            width={120}
            height={120}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center rounded-full border text-xl sm:text-2xl md:text-3xl text-green-500">
            {textPlaceholder}
          </div>
        )}
      </div>

      {/* Availability Indicator */}
      <span className="absolute top-1 left-2 sm:top-1  md:top-1.5  bg-white rounded-full p-[2px]">
        <span
          className={`block rounded-full w-3 h-3 sm:w-3.5 sm:h-3.5 ${isAvailable ? "bg-green-500" : "bg-red-500"
            }`}
        />
      </span>

      {/* Pencil Icon Trigger */}
      <Label
        htmlFor="image-profile"
        className="absolute bottom-0 right-0 cursor-pointer"
      >
        <div className="border-2 border-green-700 bg-white flex items-center justify-center rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">
          {isLoading ? (
            <Loader className="animate-spin text-green-700 w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Pencil className="text-green-700 w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </div>
      </Label>

      {/* File Input */}
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
