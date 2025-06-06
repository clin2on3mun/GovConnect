import { formatDistanceToNow } from "date-fns";
import { ClipLoader } from "react-spinners";
import type { SubmissionTypes } from "../pages/Guest/Submissions";
import { Link } from "react-router-dom";



type SubmissionProps = {
  submissions?: SubmissionTypes[];
  title?: string;
  loading: boolean;
};

export default function Submission({
  submissions,
  title = "Submissions",
  loading,
}: SubmissionProps) {

  return (
    <section className="py-8  mx-auto flex flex-col gap-5">

      <h2 className="text-xl">{title}</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#3b82f6" size={50} />
        </div>
      ) : (
        <ul className="space-y-4">
          {Array.isArray(submissions) && submissions?.length !== 0 ? (
            submissions?.map((submission) => (
              <li>
              <Link to={`/submission/${submission._id}`}
                key={submission._id}
                className="flex flex-col gap-3 rounded-lg max-w-5xl py-2 px-4 shadow-md transition-all duration-200 hover:shadow-lg hover:bg-gray-50 hover:rounded-lg cursor-pointer"
              >
                <div className="flex justify-between">
                  <p className="text-lg">{submission.title}</p>
                   <span className={`text-sm font-medium capitalize ${submission.status ==="unread" ? 'text-yellow-600': submission.status ==='read'?'text-blue-500': submission.status==="answered"? 'text-green-500':null}`}>
                    {submission.status}
            </span> 
                </div>

                <p className="flex justify-between text-sm text-gray-600">
                  <span>
                    To:{" "}
                    <span className="font-medium">
                      {submission.agencyId.name}
                    </span>
                  </span>
                  <span>
                    {formatDistanceToNow(new Date(submission.createdAt), {
                      // addSuffix: true,
                    })}
                  </span>
                </p>
              </Link>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No submissions found.</p>
          )}
        </ul>
      )}
    </section>
  );
}
