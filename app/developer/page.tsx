import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AllJobsTab from "./components/AllJobsTab";
import PersonalizedJobsTab from "./components/PersonalizedJobsTab";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function JobsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-10 py-5">

      {/* complete you profile */}
      <div className="flex  justify-end group">
        <Link
          href="/developer/profile"
          className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium transition-colors"
        >
          Complete your profile
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 duration-300" />
        </Link>
      </div>

      <Tabs defaultValue="all" className="w-full mt-5">
        <TabsList className="bg-transparent flex gap-6 justify-start ">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 py-1 text-gray-600 data-[state=active]:text-green-600 data-[state=active]:underline data-[state=active]:underline-offset-4 cursor-pointer"
          >
            All Jobs
          </TabsTrigger>
          <TabsTrigger
            value="personalized"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 py-1 text-gray-600 data-[state=active]:text-green-600 data-[state=active]:underline data-[state=active]:underline-offset-4 cursor-pointer"
          >
            Jobs for You
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AllJobsTab />
        </TabsContent>
        <TabsContent value="personalized">
          <PersonalizedJobsTab />
        </TabsContent>
      </Tabs>

    </main>


  );
}
