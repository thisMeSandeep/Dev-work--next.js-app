"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, ExperienceLevel, Speciality } from "@/generated/prisma";

// Zod schema
const developerProfileSchema = z.object({
  available: z.boolean(),
  mobile: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .optional()
    .nullable(),
  bio: z
    .string()
    .max(500, "Bio must be at most 500 characters")
    .optional()
    .nullable(),
  skills: z.array(z.string().min(1, "Skill cannot be empty")),
  category: z.enum(Object.values(Category)).optional(),
  speciality: z.enum(Object.values(Speciality)).optional(),
  experienceLevel: z.enum(Object.values(ExperienceLevel)).optional(),
  perHourRate: z.number().positive("Rate must be positive").optional(),
  languages: z.string().optional().nullable(),
  portfolioLink: z.url("Must be a valid URL").optional().nullable(),
  otherLink: z.url("Must be a valid URL").optional().nullable(),
  file: z.instanceof(File).optional().nullable(),
});

type DeveloperProfileType = z.infer<typeof developerProfileSchema>;

type ProfileProp = Omit<DeveloperProfileType, "file"> & { file: string };

interface Props {
  profile: ProfileProp;
  onSuccess?: () => void; // Callback to notify parent of successful submission
}

const DeveloperProfileForm = ({ profile, onSuccess }: Props) => {
  const [skill, setSkill] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Reusable input styles
  const inputStyles =
    "w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none";
  const selectStyles =
    "w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none";

  const defaultValues: DeveloperProfileType = {
    available: profile.available ?? true,
    mobile: profile.mobile,
    bio: profile.bio,
    skills: profile.skills ?? [],
    category: profile.category,
    speciality: profile.speciality,
    experienceLevel: profile.experienceLevel,
    perHourRate: profile.perHourRate,
    languages: profile.languages,
    portfolioLink: profile.portfolioLink,
    otherLink: profile.otherLink,
    file: null,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DeveloperProfileType>({
    resolver: zodResolver(developerProfileSchema),
    defaultValues,
    mode: "onChange",
  });

  // add skill to skillList
  const addSkill = () => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    const currentSkills = watch("skills") || [];
    if (currentSkills.includes(trimmed)) {
      setSkill("");
      return;
    }
    setValue("skills", [...currentSkills, trimmed], {
      shouldDirty: true,
      shouldValidate: true,
    });
    setSkill("");
  };

  // remove skill
  const removeSkill = (name: string) => {
    const currentSkills = watch("skills") || [];
    const filtered = currentSkills.filter((s: string) => s !== name);
    setValue("skills", filtered, { shouldDirty: true, shouldValidate: true });
  };

  const watchedValues = watch();

  const handleFormSubmit = async (data: DeveloperProfileType) => {
   setIsLoading(true);
    try {
      // TODO: Implement your form submission logic here
      console.log("Form submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Notify parent component of successful submission
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6 rounded-md border-none shadow-none">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-green-700">
          Edit Developer Profile
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
      >
        {/* Available */}
        <div className="flex flex-col w-full space-y-2">
          <Label className="flex items-center gap-2 text-green-700">
            Available
          </Label>
          <Checkbox
            id="available"
            {...register("available")}
            className="size-5 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 border border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none"
          />
          {errors.available && (
            <span className="text-red-500 text-xs">
              {errors.available.message}
            </span>
          )}
        </div>

        {/* Mobile */}
        <div className="flex flex-col w-full space-y-2">
          <Label className="flex items-center gap-2 text-green-700">
            Mobile
          </Label>
          <Input
            {...register("mobile")}
            placeholder="+91 9876543210"
            className={inputStyles}
          />
          {errors.mobile && (
            <span className="text-red-500 text-xs">
              {errors.mobile.message}
            </span>
          )}
        </div>

        {/* Bio */}
        <div className="flex flex-col w-full space-y-2 md:col-span-2">
          <Label className="flex items-center gap-2 text-green-700">Bio</Label>
          <textarea
            {...register("bio")}
            rows={3}
            placeholder="eg. I'm a skilled full stack developer..."
            className={`${inputStyles} resize-none`}
          />
          {errors.bio && (
            <span className="text-red-500 text-xs">{errors.bio.message}</span>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-col w-full space-y-2 md:col-span-2">
          <Label className="flex items-center gap-2 text-green-700">
            Skills
          </Label>
          <div className="relative">
            <Input
              onChange={(e) => setSkill(e.target.value)}
              value={skill}
              placeholder="eg. HTML, CSS, JavaScript"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              className={inputStyles}
            />
            <button
              type="button"
              aria-label="Add skill"
              onClick={() => addSkill()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-green-700 hover:text-green-500"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {errors.skills && (
            <span className="text-red-500 text-xs">
              {errors.skills.message}
            </span>
          )}
          <div className="flex flex-wrap gap-2">
            {Array.isArray(watchedValues.skills) &&
              watchedValues.skills.length > 0 &&
              watchedValues.skills.map((item: string) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-lg bg-green-700 text-white px-2 py-1 text-sm"
                >
                  {item}
                  <button
                    type="button"
                    aria-label={`Remove ${item}`}
                    onClick={() => removeSkill(item)}
                  >
                    <X className="size-3 cursor-pointer" />
                  </button>
                </span>
              ))}
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col w-full space-y-2">
          <Label className="flex items-center gap-2 text-green-700">
            Category
          </Label>
          <Select
            onValueChange={(value) => setValue("category", value as Category)}
            defaultValue={watch("category")}
          >
            <SelectTrigger className={selectStyles}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Category).map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <span className="text-red-500 text-xs">
              {errors.category.message}
            </span>
          )}
        </div>

        {/* Speciality */}
        <div className="flex flex-col w-full space-y-2">
          <Label className="flex items-center gap-2 text-green-700">
            Speciality
          </Label>
          <Select
            onValueChange={(value) =>
              setValue("speciality", value as Speciality)
            }
            defaultValue={watch("speciality")}
          >
            <SelectTrigger className={selectStyles}>
              <SelectValue placeholder="Select speciality" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Speciality).map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.speciality && (
            <span className="text-red-500 text-xs">
              {errors.speciality.message}
            </span>
          )}
        </div>

        {/* Experience Level */}
        <div className="flex flex-col w-full space-y-2">
          <Label className="flex items-center gap-2 text-green-700">
            Experience Level
          </Label>
          <Select
            onValueChange={(value) =>
              setValue("experienceLevel", value as ExperienceLevel)
            }
            defaultValue={watch("experienceLevel")}
          >
            <SelectTrigger className={selectStyles}>
              <SelectValue placeholder="Choose experience level" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ExperienceLevel).map((item) => (
                <SelectItem value={item} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.experienceLevel && (
            <span className="text-red-500 text-xs">
              {errors.experienceLevel.message}
            </span>
          )}
        </div>

        {/* Hourly Rate */}
        <div className="flex flex-col w-full space-y-2">
          <Label className="flex items-center gap-2 text-green-700">
            Hourly Rate (USD)
          </Label>
          <Input
            type="number"
            {...register("perHourRate", {
              valueAsNumber: true,
            })}
            placeholder="eg. 25"
            className={inputStyles}
          />
          {errors.perHourRate && (
            <span className="text-red-500 text-xs">
              {errors.perHourRate.message}
            </span>
          )}
        </div>

        {/* Languages */}
        <div className="flex flex-col w-full space-y-2">
          <Label className="flex items-center gap-2 text-green-700">
            Languages
          </Label>
          <Input
            {...register("languages")}
            placeholder="eg. English, Hindi, Spanish"
            className={inputStyles}
          />
          {errors.languages && (
            <span className="text-red-500 text-xs">
              {errors.languages.message}
            </span>
          )}
        </div>

        {/* Portfolio Link */}
        <div className="flex flex-col w-full space-y-2">
          <Label className="flex items-center gap-2 text-green-700">
            Portfolio Link
          </Label>
          <Input
            {...register("portfolioLink")}
            placeholder="https://myportfolio.com"
            className={inputStyles}
          />
          {errors.portfolioLink && (
            <span className="text-red-500 text-xs">
              {errors.portfolioLink.message}
            </span>
          )}
        </div>

        {/* Other Link */}
        <div className="flex flex-col w-full space-y-2">
          <Label className="flex items-center gap-2 text-green-700">
            Other Link
          </Label>
          <Input
            {...register("otherLink")}
            placeholder="https://linkedin.com/in/username"
            className={inputStyles}
          />
          {errors.otherLink && (
            <span className="text-red-500 text-xs">
              {errors.otherLink.message}
            </span>
          )}
        </div>

        {/* File Upload */}
        <div className="flex flex-col w-full space-y-2 md:col-span-2">
          <Label className="flex items-center gap-2 text-green-700">
            Resume/CV (PDF only)
          </Label>
          <Input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setValue("file", e.target.files?.[0] ?? null, {
                shouldDirty: true,
              })
            }
            className={inputStyles}
          />
          {errors.file && (
            <span className="text-red-500 text-xs">{errors.file.message}</span>
          )}
        </div>

        {/* Save Button */}
        <div className="col-span-1 md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeveloperProfileForm;
