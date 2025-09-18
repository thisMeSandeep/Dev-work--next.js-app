import { Category, Speciality } from "@prisma/client";
import { getSuggestedDevProfileAction } from "@/actions/client.actions";
import SuggestedDevs from "../../components/SuggestedDevs";

type Props = { category: Category; speciality: Speciality };

const SuggestedDevsSection = async ({ category, speciality }: Props) => {
  const res = await getSuggestedDevProfileAction({ category, speciality });
  const profiles = res.success ? res.profiles ?? [] : [];

  if (profiles.length === 0) {
    return (
      <section className="p-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Suggested Developers</h2>
        <p className="text-sm text-gray-500">No suggested profiles found.</p>
      </section>
    );
  }

  return <SuggestedDevs profiles={profiles as any} />;
};

export default SuggestedDevsSection;


