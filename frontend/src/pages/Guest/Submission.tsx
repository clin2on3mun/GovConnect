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
        const AgencyViewSubmission = async()=>{
            try{
               const res = await axios.patch(`${import.meta.env.VITE_API_URL}/submissions/${paramId.id}/read`,{status:'read'},{
                withCredentials:true
               })
               setSubmission(res.data.data)
            }catch(err){
              console.error("Failed to fetch user submissions", err)
            }
        }
         if (user?.role==="guest" && paramId.id) {
          fetchSubmission();
        }
        else{
            AgencyViewSubmission()
        }

    },[user, paramId.id])

    if(!submission){
        return(
            <div className="flex justify-center items-center">
          <ClipLoader color="#3b82f6" size={50} />
        </div>
        )
    }
    return (
        <section className="mt-8  bg-gray-50 rounded-md p-4 border mx-auto ">
         <div className="flex justify-between">
            <div className="grid gap-3">
                <h2><span>subject:</span> {submission.title[0].toUpperCase()+submission.title.slice(1)}</h2>
                <p><span>To:</span> {submission.agencyId.name}</p>
                <p><span>category:</span> {submission.categoryId.name}</p>
            </div>  
            <span className={`text-sm font-medium capitalize ${submission.status ==="unread" ? 'text-yellow-600': submission.status ==='read'?'text-blue-500': submission.status==="answered"? 'text-green-500':null}`}>
                    {submission.status}
            </span> 
        </div>    
         <hr className="my-5 border-gray-500"/>
         <p className="mt-1">{submission.description}</p>
        </section>
    )
}