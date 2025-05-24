import { formatDistanceToNow } from "date-fns";

type SubmissionTypes = {
  _id: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  user: {
    name: string;
  };
};

type SubmissionProps = {
  submissions?: SubmissionTypes[] | [];
  title?: string;
  onClickSubmission?: (submission: SubmissionTypes) => void;
};

export default function Submission({
  submissions,
  title = "Submissions",
  onClickSubmission,
}: SubmissionProps) {
  return (
    <section className="p-10 max-w-7xl mx-auto flex flex-col gap-5">
      <h2 className="text-3xl">{title}</h2>
      <ul className="space-y-4">
        {(submissions || []).length > 0 ? (
          submissions?.map((submission) => (
            <li
              key={submission._id}
              onClick={() => onClickSubmission?.(submission)}
              className="flex flex-col gap-3 rounded-md max-w-5xl py-2 px-4 shadow-md transition-all duration-200 hover:shadow-lg hover:bg-gray-50 hover:rounded-lg cursor-pointer"
            >
              <p className="text-lg">{submission.title}</p>
              <p className="flex justify-between text-sm text-gray-600">
                <span>From: {submission.user.name}</span>
                <span>
                  {formatDistanceToNow(new Date(submission.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </p>
              <span className="text-sm font-medium capitalize text-yellow-600">
                {submission.status}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No submissions found.</p>
        )}
      </ul>
    </section>
  );
}
