import { IfeedBack, Submission } from '../models/submission';

class SubmissionService {
  async findById(id: string, popOption?: string) {
    const query = await Submission.findById(id);
    if (popOption) query?.populate(popOption);
    return query;
  }
  async deleteSubmission() {
    return await Submission.deleteOne();
  }
  async findUserorAgentSubmissions(name: string, currentUserId: string) {
    return await Submission.find({ [name]: currentUserId });
  }
  async findUpdateSubmission(id: string, update: Partial<IfeedBack>) {
    return await Submission.findByIdAndUpdate(id, update);
  }
}

export default SubmissionService;
