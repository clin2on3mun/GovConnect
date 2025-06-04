import axios from "axios"
import { useEffect, useState } from "react"
import type { SubmissionTypes } from "./Submissions"
import { useAuth } from "../../hooks/AuthHooks"
import { useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"



export default function Submission(){

    const {user} = useAuth()
    const paramId = useParams()
    const [submission, setSubmission] = useState<SubmissionTypes|null>(null)

    useEffect(()=>{
        const fetchSubmission = async()=>{
            try{
               const res = await axios.get(`${import.meta.env.VITE_API_URL}/submissions/${paramId.id}`,
                { withCredentials: true }
               )
               setSubmission(res.data.data)

            }catch(err){
                console.error("Failed to fetch user submissions", err);
            }

        }
         if (user && paramId.id) {
      fetchSubmission();
    }
    },[user, paramId.id])

    if(!submission){
        return(
            <div className="flex justify-center items-center">
          <ClipLoader color="#3b82f6" size={50} />
        </div>
        )
    }
    console.log(submission)
    return (
        <>
         <p>{submission.title}</p>
        </>
    )
}