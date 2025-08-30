"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  experienceLevels,
  categories,
  specialities,
  scopeSizes,
  scopeDurations,
} from "@/data/JobData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUp, Sparkles } from "lucide-react";
import { createJobAction } from "@/actions/client.actions";
import { fetchAndSetUser } from "@/lib/fetchUser";

// ------------------ Zod Schema ------------------
const jobSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z
    .string()
    .min(100, "Description must be at least 100 characters"),
  category: z.string().nonempty("Category is required"),
  speciality: z.string().nonempty("Speciality is required"),
  skills: z.string().min(2, "Enter at least one skill"),
  budget: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Budget must be a positive number",
  }),
  scopeSize: z.string().nonempty("Scope Size is required"),
  duration: z.string().nonempty("Duration is required"),
  experienceRequired: z.string().nonempty("Experience level is required"),
  connectsRequired: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 5 && Number(val) <= 40,
      {
        message: "Connects must be between 5 and 40",
      }
    ),
  attachment: z
    .union([z.instanceof(File), z.null()])
    .optional()
    .nullable(),
});

type JobSchemaType = z.infer<typeof jobSchema>;

// ------------------ Tailwind Styles ------------------
const fieldStyle = "space-y-2 flex flex-col"; // spacing + column layout for Label + input + error

const inputStyle =
  "w-full rounded-sm border border-gray-300 px-3 py-2 text-sm focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none transition-colors transition";

const LabelStyle = "text-sm font-medium text-gray-700";

const errorStyle = "text-red-500 text-sm";

export default function CreateJobForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<JobSchemaType>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      speciality: "",
      skills: "",
      budget: "",
      scopeSize: "",
      duration: "",
      experienceRequired: "",
      connectsRequired: "5",
      attachment: null,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: JobSchemaType) => {
    const formattedData = {
      ...data,
      skills: data.skills.split(",").map((s) => s.trim()),
      budget: Number(data.budget),
      connectsRequired: Number(data.connectsRequired),
      attachment: data.attachment || null,
    };

    console.log("Job Submitted:", formattedData);

    const response = await createJobAction(formattedData);
    if (response.success) {
      alert(response.message);
      await fetchAndSetUser();
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="w-full  bg-whitespace-y-8">
      {/* Form filling options */}
      <div className="space-y-3">
        <p className="text-gray-600 text-sm text-center">
          Fill in the details below to post your job.
        </p>
        <span className="text-gray-600 text-sm text-center block">Or</span>
        {/* AI input field */}
        <div className="p-5 bg-gray-50 border border-green-400/50 rounded-sm space-y-3 ">
          <Textarea
            placeholder="e.g. I need a Next.js developer to build a portfolio website with animations..."
            className="w-full min-h-[120px] text-gray-600 resize-none rounded-sm border border-gray-300 px-3 py-2 text-sm focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none transition"
          />
          <Button
            type="button"
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white font-medium px-4 py-2 rounded-sm  transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Generate with AI
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6 mt-8"
      >
        {/* Title */}
        <div className={fieldStyle}>
          <Label className={LabelStyle}>Title</Label>
          <Input
            placeholder="Enter job title"
            className={inputStyle}
            {...register("title")}
          />
          {errors.title && <p className={errorStyle}>{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className={fieldStyle}>
          <Label className={LabelStyle}>Description</Label>
          <Textarea
            placeholder="Enter job description"
            className={inputStyle + " min-h-[120px] resize-none"}
            {...register("description")}
          />
          {errors.description && (
            <p className={errorStyle}>{errors.description.message}</p>
          )}
        </div>

        {/* Category & Speciality */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Category */}
          <div className={`${fieldStyle} w-full`}>
            <Label className={LabelStyle}>Category</Label>
            <Select onValueChange={(val) => setValue("category", val)}>
              <SelectTrigger className={`${inputStyle} w-full`}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="z-[10000]">
                {categories.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className={errorStyle}>{errors.category.message}</p>
            )}
          </div>

          {/* Speciality */}
          <div className={`${fieldStyle} w-full`}>
            <Label className={LabelStyle}>Speciality</Label>
            <Select onValueChange={(val) => setValue("speciality", val)}>
              <SelectTrigger className={`${inputStyle} w-full`}>
                <SelectValue placeholder="Select speciality" />
              </SelectTrigger>
              <SelectContent className="z-[10000]">
                {specialities.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.speciality && (
              <p className={errorStyle}>{errors.speciality.message}</p>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className={fieldStyle}>
          <Label className={LabelStyle}>Skills Required</Label>
          <Input
            placeholder="e.g. React, Node.js, Tailwind"
            className={inputStyle}
            {...register("skills")}
          />
          {errors.skills && (
            <p className={errorStyle}>{errors.skills.message}</p>
          )}
        </div>

        {/* Budget */}
        <div className={fieldStyle}>
          <Label className={LabelStyle}>Budget ($)</Label>
          <Input
            type="text"
            placeholder="Enter budget"
            className={inputStyle}
            {...register("budget")}
          />
          {errors.budget && (
            <p className={errorStyle}>{errors.budget.message}</p>
          )}
        </div>

        {/* scope size and duration */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Scope Size */}
          <div className={`${fieldStyle} w-full`}>
            <Label className={LabelStyle}>Scope Size</Label>
            <Select onValueChange={(val) => setValue("scopeSize", val)}>
              <SelectTrigger className={`${inputStyle} w-full`}>
                <SelectValue placeholder="Select scope size" />
              </SelectTrigger>
              <SelectContent className="z-[10000]">
                {scopeSizes.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.scopeSize && (
              <p className={errorStyle}>{errors.scopeSize.message}</p>
            )}
          </div>

          {/* Duration */}
          <div className={`${fieldStyle} w-full`}>
            <Label className={LabelStyle}>Duration</Label>
            <Select onValueChange={(val) => setValue("duration", val)}>
              <SelectTrigger className={`${inputStyle} w-full`}>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="z-[10000]">
                {scopeDurations.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.duration && (
              <p className={errorStyle}>{errors.duration.message}</p>
            )}
          </div>
        </div>

        {/* Experience Level & Connects Required */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Experience */}
          <div className={`${fieldStyle} w-full`}>
            <Label className={LabelStyle}>Experience Level</Label>
            <Select
              onValueChange={(val) => setValue("experienceRequired", val)}
            >
              <SelectTrigger className={`${inputStyle} w-full`}>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent className="z-[10000]">
                {experienceLevels.map((e) => (
                  <SelectItem key={e.value} value={e.value}>
                    {e.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.experienceRequired && (
              <p className={errorStyle}>{errors.experienceRequired.message}</p>
            )}
          </div>

          {/* Connects Required */}
          <div className={`${fieldStyle} w-full`}>
            <Label className={LabelStyle}>Connects Required</Label>
            <Input
              type="text"
              placeholder="Enter connects required"
              className={`${inputStyle} w-full`}
              {...register("connectsRequired")}
            />
            {errors.connectsRequired && (
              <p className={errorStyle}>{errors.connectsRequired.message}</p>
            )}
          </div>
        </div>

        {/* Attachment */}
        <div className={fieldStyle}>
          <Label className={LabelStyle} htmlFor="attachment">
            <div className="border-2 border-dashed border-green-500 w-full flex items-center justify-center flex-col gap-3 p-6 rounded-md cursor-pointer hover:bg-green-50 transition">
              <ImageUp className="size-12 text-green-500" />
              <p className="text-sm text-gray-700">Upload attachment</p>
            </div>
          </Label>

          <Input
            type="file"
            id="attachment"
            hidden
            {...register("attachment")}
            onChange={(e) => {
              const file = e.target.files?.[0]; // pick only the first file
              setValue("attachment", file, { shouldValidate: true });
            }}
          />

          {/* File name display */}
          {watch("attachment") && (
            <p className="mt-2 text-sm text-gray-600">
              Selected:{" "}
              <span className="font-medium">{watch("attachment")?.name}</span>
            </p>
          )}

          {/* Error message */}
          {errors.attachment?.message && (
            <p className="mt-1 text-sm text-red-500">
              {String(errors.attachment.message)}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full rounded-md py-3 text-base font-medium bg-green-500 hover:bg-green-600 transition text-white cursor-pointer"
        >
          Post Job
        </Button>
      </form>
    </div>
  );
}
