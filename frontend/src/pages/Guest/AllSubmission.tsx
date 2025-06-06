import { useAuth } from "../../hooks/AuthHooks"
import AgentSubmission from "./AgentSubmissions"
import Submissions from "./Submissions"

export default function AllSubmission(){
   const {user} = useAuth()
   console.log(user)
    return(
        <>
        {
            user?.role==="agent_admin" ?(<AgentSubmission/>) : (<Submissions/>)
        }
        </>
    )
}