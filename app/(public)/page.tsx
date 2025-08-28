import { auth } from "@/auth";
import CreateJobForm from "@/components/ui/CreateJobForm";

const Home = async () => {
  const session = await auth();

  console.log("session data:", session);
  return (
    <div>
      <CreateJobForm />
    </div>
  );
};

export default Home;
