import axios from "axios";
import { useAuth } from "../../hooks/AuthHooks";
import { useEffect, useState } from "react";
import Submission from "../../components/Submission";

export type SubmissionTypes = {
  _id: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  userId: {
    name: string;
  };
  agencyId:{
    name:string
  }
};

export default function Submissions() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<SubmissionTypes[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user?._id) return;

      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${user._id}/submissions`,
          { withCredentials: true }
        );

        setSubmissions(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Failed to fetch user submissions", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSubmissions();
    }
  }, [user]);

  console.log(user,"submission");
  return (
    <Submission
      submissions={submissions}
      loading={loading}
      title="Submissions you sent"
    />
  );
}
