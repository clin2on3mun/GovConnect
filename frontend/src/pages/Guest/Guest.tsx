import axios from "axios";
import { useAuth } from "../../hooks/AuthHooks";
import { useEffect, useState } from "react";
import Submission from "../../components/Submission";
import { ClipLoader } from "react-spinners";

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

export default function Guest() {
  const { user, isLoading } = useAuth();
  const [submissions, setSubmissions] = useState<SubmissionTypes[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);
  console.log(isLoading);
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user?.id) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/${user.id}/submissions`,
          { withCredentials: true }
        );

        setSubmissions(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Failed to fetch user submissions", err);
      } finally {
        setLoadingSubmissions(false);
      }
    };

    if (!isLoading && user) {
      fetchSubmissions();
    }
  }, [isLoading, user]);

  if (isLoading || loadingSubmissions) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }

  return <Submission submissions={submissions} title="Submissions you sent" />;
}
