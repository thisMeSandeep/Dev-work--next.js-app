"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { countries } from "@/data/countries";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  Pencil,
  Save,
  Globe,
  Building2,
  Phone,
  Flag,
  Link2,
  X,
} from "lucide-react";
import { setClientProfileAction } from "@/actions/client.actions";
import { fetchAndSetUser } from "@/lib/fetchUser";
import toast from "react-hot-toast";

// Validation schema
const formSchema = z.object({
  country: z.string().min(1, "Country is required"),
  mobile: z.string().min(8, "Mobile number is too short"),
  company: z.string().min(2, "Company name is required"),
  websiteLink: z.url("Invalid URL").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  initialData: Partial<FormData>;
}

const CreateClientProfileForm = ({ initialData }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: initialData?.country || "",
      mobile: initialData?.mobile || "",
      company: initialData?.company || "",
      websiteLink: initialData?.websiteLink || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const response = await setClientProfileAction(data);
    if (response.success) {
      toast.success(response.message);
      await fetchAndSetUser();
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
    setIsEditing(false);
  };

  return (
    <Card className="w-full p-6 rounded-md border-none shadow-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-green-700">
          Client Profile
        </h2>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="outline"
          size="sm"
          className="border-green-500 text-green-600 hover:bg-green-50 cursor-pointer"
        >
          {isEditing ? (
            <X className="w-4 h-4 mr-1" />
          ) : (
            <Pencil className="w-4 h-4 mr-1" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {/* Info Mode */}
      {!isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="flex flex-col">
            <span className="flex items-center gap-2 font-medium text-green-700">
              <Flag className="w-4 h-4" /> Country
            </span>
            <span>{initialData?.country || "Not set"}</span>
          </div>

          <div className="flex flex-col">
            <span className="flex items-center gap-2 font-medium text-green-700">
              <Phone className="w-4 h-4" /> Mobile
            </span>
            <span>{initialData?.mobile || "Not set"}</span>
          </div>

          <div className="flex flex-col">
            <span className="flex items-center gap-2 font-medium text-green-700">
              <Building2 className="w-4 h-4" /> Company
            </span>
            <span>{initialData?.company || "Not set"}</span>
          </div>

          <div className="flex flex-col">
            <span className="flex items-center gap-2 font-medium text-green-700">
              <Globe className="w-4 h-4" /> Website
            </span>
            {initialData?.websiteLink ? (
              <a
                href={initialData.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 underline"
              >
                {initialData.websiteLink}
              </a>
            ) : (
              "Not set"
            )}
          </div>
        </div>
      ) : (
        // Form Mode
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          {/* Country */}
          <div className="flex flex-col w-full space-y-2">
            <Label className="flex items-center gap-2 text-green-700">
              <Flag className="w-4 h-4" /> Country
            </Label>
            <Select
              onValueChange={(val) => setValue("country", val)}
              defaultValue={getValues("country")}
            >
              <SelectTrigger className="w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c.code} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <span className="text-red-500 text-xs">
                {errors.country.message}
              </span>
            )}
          </div>

          {/* Mobile */}
          <div className="flex flex-col w-full space-y-2">
            <Label className="flex items-center gap-2 text-green-700">
              <Phone className="w-4 h-4" /> Mobile
            </Label>
            <Input
              {...register("mobile")}
              placeholder="+91 9876543210"
              className="w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none"
            />
            {errors.mobile && (
              <span className="text-red-500 text-xs">
                {errors.mobile.message}
              </span>
            )}
          </div>

          {/* Company */}
          <div className="flex flex-col w-full space-y-2">
            <Label className="flex items-center gap-2 text-green-700">
              <Building2 className="w-4 h-4" /> Company
            </Label>
            <Input
              {...register("company")}
              placeholder="Company name"
              className="w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none"
            />
            {errors.company && (
              <span className="text-red-500 text-xs">
                {errors.company.message}
              </span>
            )}
          </div>

          {/* Website Link */}
          <div className="flex flex-col w-full space-y-2">
            <Label className="flex items-center gap-2 text-green-700">
              <Link2 className="w-4 h-4" /> Website (optional)
            </Label>
            <Input
              {...register("websiteLink")}
              placeholder="https://mycompany.com"
              className="w-full border-green-300 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:outline-none"
            />
            {errors.websiteLink && (
              <span className="text-red-500 text-xs">
                {errors.websiteLink.message}
              </span>
            )}
          </div>

          {/* Save Button */}
          <div className="col-span-1 md:col-span-2 flex justify-end">
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default CreateClientProfileForm;
