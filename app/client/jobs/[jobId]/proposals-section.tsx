import { getJobProposalsAction } from "@/actions/client.actions";
import ProposalsTable from "../../components/Proposalstable";

type Props = { jobId: string };

const ProposalsSection = async ({ jobId }: Props) => {
  const res = await getJobProposalsAction(jobId);
  const proposals = res.success ? res.proposals ?? [] : [];

  if (proposals.length === 0) {
    return (
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-3">Proposals received for this job</h1>
        <p className="text-sm text-gray-500">No proposals yet.</p>
      </div>
    );
  }

  return <ProposalsTable proposals={proposals} />;
};

export default ProposalsSection;


