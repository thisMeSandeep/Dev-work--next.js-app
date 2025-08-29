"use client";
import Drawer from "@/components/reusable/Drawer";
import { Button } from "@/components/ui/button";
import CreateJobForm from "@/components/ui/CreateJobForm";
import { useState } from "react";

const Home = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>

      <Drawer
        headerTitle="Create Job"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <CreateJobForm />
      </Drawer>
    </>
  );
};

export default Home;
