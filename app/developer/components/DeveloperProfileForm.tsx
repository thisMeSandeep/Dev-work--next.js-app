// "use client";

// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { experienceLevels , categories , specialities} from "@/data/JobData";
// import { ExperienceLevel , Category , Speciality } from "@/generated/prisma";
// import { Label } from "@/components/ui/label";
// import { ImageUp, Plus, Sparkle, X } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// // import { Category, ExperienceLevel, Speciality } from "@/generated/prisma";
// import { FreelancerProfile } from "@/types/type";
// import { countries } from "@/data/countries";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { formatString } from "@/lib/formatString";
// import { updateDeveloperProfileAction } from "@/actions/developer.action";
// import { fetchAndSetUser } from "@/lib/fetchUser";
// import toast from "react-hot-toast";
// import {
//   developerProfileSchema,
//   DeveloperProfileType,
// } from "@/lib/schemas/developerProfile.schema";

// interface Props {
//   profile: FreelancerProfile;
//   country: string;
//   onSuccess?: () => void;
// }

// const DeveloperProfileForm = ({ profile, onSuccess, country }: Props) => {
//   const [skill, setSkill] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // Reusable input styles
//   const inputStyles =
//     "w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none";
//   const selectStyles =
//     "w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none";

//   const defaultValues = {
//     available: profile.available ?? true,
//     country: country ?? "",
//     mobile: profile.mobile ?? null,
//     bio: profile.bio ?? null,
//     skills: profile.skills ?? [],
//     category: profile.category ?? undefined,
//     speciality: profile.speciality ?? undefined,
//     experienceLevel: profile.experienceLevel ?? undefined,
//     perHourRate: profile.perHourRate ?? null,
//     languages: profile.languages ?? null,
//     portfolioLink: profile.portfolioLink ?? null,
//     otherLink: profile.otherLink ?? null,
//     file: null,
//   } satisfies Partial<DeveloperProfileType>;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm({
//     resolver: zodResolver(developerProfileSchema),
//     defaultValues,
//     mode: "onChange",
//   });

//   // add skill to skillList
//   const addSkill = () => {
//     const trimmed = skill.trim();
//     if (!trimmed) return;
//     const currentSkills = watch("skills") || [];
//     if (currentSkills.includes(trimmed)) {
//       setSkill("");
//       return;
//     }
//     setValue("skills", [...currentSkills, trimmed], {
//       shouldDirty: true,
//       shouldValidate: true,
//     });
//     setSkill("");
//   };

//   // remove skill
//   const removeSkill = (name: string) => {
//     const currentSkills = watch("skills") || [];
//     const filtered = currentSkills.filter((s: string) => s !== name);
//     setValue("skills", filtered, { shouldDirty: true, shouldValidate: true });
//   };

//   const watchedValues = watch();

//   const handleFormSubmit = async (data: DeveloperProfileType) => {
//     console.log("Form submitted:", data);
//     setIsLoading(true);
//     const response = await updateDeveloperProfileAction(data);
//     if (response.success) {
//       toast.success(response.message);
//       await fetchAndSetUser();
//     } else {
//       toast.error(response.message);
//     }
//     setIsLoading(false);
//     onSuccess?.();
//   };

//   return (
//     <div className="w-full p-6 rounded-md border-none shadow-none">
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-xl md:text-2xl font-semibold text-green-700">
//           Edit Developer Profile
//         </h2>
//       </div>

//       <form
//         onSubmit={handleSubmit(handleFormSubmit)}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
//       >
//         {/* Available */}
//         <div className="flex flex-col w-full space-y-2">
//           <Label className="flex items-center gap-2 text-green-700">
//             Available
//           </Label>
//           <Checkbox
//             id="available"
//             checked={watch("available")}
//             onCheckedChange={(checked) =>
//               setValue("available", checked as boolean)
//             }
//             className="size-5 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 border border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none"
//           />
//           {errors.available && (
//             <span className="text-red-500 text-xs">
//               {errors.available.message}
//             </span>
//           )}
//         </div>

//         {/* country */}
//         <div className="flex flex-col w-full space-y-2">
//           <Label className="flex items-center gap-2 text-green-700">
//             Country
//           </Label>
//           <Select
//             onValueChange={(value) => setValue("country", value as string)}
//             defaultValue={watch("country")}
//           >
//             <SelectTrigger className={selectStyles}>
//               <SelectValue placeholder="Select country" />
//             </SelectTrigger>
//             <SelectContent>
//               {countries.map((item) => (
//                 <SelectItem key={item.code} value={item.name}>
//                   {item.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {errors.country && (
//             <span className="text-red-500 text-xs">
//               {errors.country.message}
//             </span>
//           )}
//         </div>

//         {/* Mobile */}
//         <div className="flex flex-col w-full space-y-2">
//           <Label className="flex items-center gap-2 text-green-700">
//             Mobile
//           </Label>
//           <Input
//             {...register("mobile")}
//             placeholder="+91 9876543210"
//             className={inputStyles}
//           />
//           {errors.mobile && (
//             <span className="text-red-500 text-xs">
//               {errors.mobile.message}
//             </span>
//           )}
//         </div>

//         {/* Bio */}
//         <div className="flex flex-col w-full space-y-2 md:col-span-2">
//           <Label className="flex items-center gap-2 text-green-700">Bio</Label>
//           <div className="relative">
//             <Textarea
//               {...register("bio")}
//               rows={3}
//               placeholder="eg. I'm a skilled full stack developer..."
//               className={`${inputStyles} resize-none`}
//             />
//             <div className="absolute right-4 bottom-0">
//               <Tooltip>
//                 <TooltipTrigger type="button" className="cursor-pointer">
//                   <Sparkle className="size-5 text-emerald-700" />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Enhance with AI</p>
//                 </TooltipContent>
//               </Tooltip>
//             </div>
//           </div>
//           {errors.bio && (
//             <span className="text-red-500 text-xs">{errors.bio.message}</span>
//           )}
//         </div>

//         {/* Skills */}
//         <div className="flex flex-col w-full space-y-2 md:col-span-2">
//           <Label className="flex items-center gap-2 text-green-700">
//             Skills
//           </Label>
//           <div className="relative">
//             <Input
//               onChange={(e) => setSkill(e.target.value)}
//               value={skill}
//               placeholder="eg. HTML"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   e.preventDefault();
//                   addSkill();
//                 }
//               }}
//               className={inputStyles}
//             />
//             <button
//               type="button"
//               aria-label="Add skill"
//               onClick={() => addSkill()}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-green-700 hover:text-green-500"
//             >
//               <Plus className="h-4 w-4" />
//             </button>
//           </div>
//           {errors.skills && (
//             <span className="text-red-500 text-xs">
//               {errors.skills.message}
//             </span>
//           )}
//           <div className="flex flex-wrap gap-2">
//             {Array.isArray(watchedValues.skills) &&
//               watchedValues.skills.length > 0 &&
//               watchedValues.skills.map((item: string) => (
//                 <span
//                   key={item}
//                   className="flex items-center gap-2 rounded-lg bg-green-700 text-white px-2 py-1 text-sm"
//                 >
//                   {item}
//                   <button
//                     type="button"
//                     aria-label={`Remove ${item}`}
//                     onClick={() => removeSkill(item)}
//                   >
//                     <X className="size-3 cursor-pointer" />
//                   </button>
//                 </span>
//               ))}
//           </div>
//         </div>

//         {/* Category */}
//         <div className="flex flex-col w-full space-y-2">
//           <Label className="flex items-center gap-2 text-green-700">
//             Category
//           </Label>
//           <Select
//             onValueChange={(value) => setValue("category", value as Category)}
//             defaultValue={watch("category")}
//           >
//             <SelectTrigger className={selectStyles}>
//               <SelectValue placeholder="Select category" />
//             </SelectTrigger>
//             <SelectContent>
//               {categories.map((item) => (
//                 <SelectItem key={item.label} value={item.value}>
//                   {item.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {errors.category && (
//             <span className="text-red-500 text-xs">
//               {errors.category.message}
//             </span>
//           )}
//         </div>

//         {/* Speciality */}
//         <div className="flex flex-col w-full space-y-2">
//           <Label className="flex items-center gap-2 text-green-700">
//             Speciality
//           </Label>
//           <Select
//             onValueChange={(value) =>
//               setValue("speciality", value as Speciality)
//             }
//             defaultValue={watch("speciality")}
//           >
//             <SelectTrigger className={selectStyles}>
//               <SelectValue placeholder="Select speciality" />
//             </SelectTrigger>
//             <SelectContent>
//               {specialities.map((item) => (
//                 <SelectItem key={item.label} value={item.value}>
//                   {item.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {errors.speciality && (
//             <span className="text-red-500 text-xs">
//               {errors.speciality.message}
//             </span>
//           )}
//         </div>

//         {/* Experience Level */}
//         <div className="flex flex-col w-full space-y-2">
//           <Label className="flex items-center gap-2 text-green-700">
//             Experience Level
//           </Label>
//           <Select
//             onValueChange={(value) =>
//               setValue("experienceLevel", value as ExperienceLevel)
//             }
//             defaultValue={watch("experienceLevel")}
//           >
//             <SelectTrigger className={selectStyles}>
//               <SelectValue placeholder="Choose experience level" />
//             </SelectTrigger>
//             <SelectContent>
//               {experienceLevels.map((item) => (
//                 <SelectItem value={item.value} key={item.label}>
//                   {item.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {errors.experienceLevel && (
//             <span className="text-red-500 text-xs">
//               {errors.experienceLevel.message}
//             </span>
//           )}
//         </div>

//         {/* Hourly Rate */}
//         <div className="flex flex-col w-full space-y-2">
//           <Label className="flex items-center gap-2 text-green-700">
//             Hourly Rate (USD)
//           </Label>
//           <Input
//             type="number"
//             {...register("perHourRate", {})}
//             placeholder="eg. 25"
//             className={inputStyles}
//           />
//           {errors.perHourRate && (
//             <span className="text-red-500 text-xs">
//               {errors.perHourRate.message}
//             </span>
//           )}
//         </div>

//         {/* Languages */}
//         <div className="flex flex-col w-full space-y-2">
//           <Label className="flex items-center gap-2 text-green-700">
//             Languages
//           </Label>
//           <Input
//             {...register("languages")}
//             placeholder="eg. English, Hindi, Spanish"
//             className={inputStyles}
//           />
//           {errors.languages && (
//             <span className="text-red-500 text-xs">
//               {errors.languages.message}
//             </span>
//           )}
//         </div>

//         {/* Portfolio Link */}
//         <div className="flex flex-col w-full space-y-2">
//           <Label className="flex items-center gap-2 text-green-700">
//             Portfolio Link
//           </Label>
//           <Input
//             {...register("portfolioLink")}
//             placeholder="https://myportfolio.com"
//             className={inputStyles}
//           />
//           {errors.portfolioLink && (
//             <span className="text-red-500 text-xs">
//               {errors.portfolioLink.message}
//             </span>
//           )}
//         </div>

//         {/* Other Link */}
//         <div className="flex flex-col w-full space-y-2">
//           <Label className="flex items-center gap-2 text-green-700">
//             Other Link
//           </Label>
//           <Input
//             {...register("otherLink")}
//             placeholder="https://linkedin.com/in/username"
//             className={inputStyles}
//           />
//           {errors.otherLink && (
//             <span className="text-red-500 text-xs">
//               {errors.otherLink.message}
//             </span>
//           )}
//         </div>

//         {/* File Upload */}
//         <div className={inputStyles}>
//           <Label
//             className="flex items-center gap-2 text-green-700"
//             htmlFor="attachment"
//           >
//             <div className="border-2 border-dashed border-green-500 w-full flex items-center justify-center flex-col gap-3 p-6 rounded-md cursor-pointer hover:bg-green-50 transition">
//               <ImageUp className="size-12 text-green-500" />
//               <p className="text-sm text-gray-700">Upload Resume/CV</p>
//             </div>
//           </Label>

//           <Input
//             type="file"
//             id="attachment"
//             accept="application/pdf"
//             hidden
//             {...register("file")}
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               setValue("file", file, { shouldValidate: true });
//             }}
//           />

//           {/* File name display */}
//           {watch("file") && (
//             <p className="mt-2 text-sm text-gray-600">
//               Selected:{" "}
//               <span className="font-medium">{watch("file")?.name}</span>
//             </p>
//           )}

//           {/* Error message */}
//           {errors.file?.message && (
//             <p className="mt-1 text-sm text-red-500">
//               {String(errors.file.message)}
//             </p>
//           )}
//         </div>

//         {/* Save Button */}
//         <div className="col-span-1 md:col-span-2 flex justify-end">
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//           >
//             {isLoading ? "Saving..." : "Save Changes"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DeveloperProfileForm;


const DeveloperProfileForm = () => {
  return (
    <div>DeveloperProfileForm</div>
  )
}

export default DeveloperProfileForm