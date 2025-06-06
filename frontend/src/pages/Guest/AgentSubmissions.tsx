import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthHooks";
import type { SubmissionTypes } from "./Submissions";
import axios from "axios";
import Submission from "../../components/Submission";




export default function AgentSubmission(){
    const { user } = useAuth();
  const [submissions, setSubmissions] = useState<SubmissionTypes[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user?.agency) return;

      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/agencies/${user.agency}/submissions`,
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
  
  return (
    <Submission
      submissions={submissions}
      loading={loading}
      title="Submissions"
    />
  );
}
