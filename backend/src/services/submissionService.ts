import { MongooseQueryOptions } from 'mongoose';
import { IfeedBack, Submission } from '../models/Submission';

class SubmissionService {
  async findById(id: string, popOption?: string) {
    const query = await Submission.findById(id);
    if (popOption) await query?.populate(popOption);
    return query;
  }
  async deleteSubmission() {
    return await Submission.deleteOne();
  }
  async findUserorAgentSubmissions(name: string, currentUserId: string) {
    return await Submission.find({ [name]: currentUserId }).populate(
      'userId agencyId',
    );
  }
  async findUpdateSubmission(
    id: string,
    update: Partial<IfeedBack>,
    option?: MongooseQueryOptions,
  ) {
    return await Submission.findByIdAndUpdate(id, update, option);
  }
}

export default SubmissionService;
