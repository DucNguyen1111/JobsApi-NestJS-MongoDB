import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './interfaces/job.interface';

@Injectable()
export class JobsService {
  constructor(@InjectModel('Job') private readonly jobModel: Model<Job>) { }

  async findAll(): Promise<Job> {
    return await this.jobModel.find({});
  }

  async find(id: string): Promise<Job> {
    return await this.jobModel.findOne({ _id: id });
  }

  async create(job: Job): Promise<Job> {
    let newJob = new this.jobModel(job);
    return await newJob.save();
  }

  async update(id: string, job: Job): Promise<Job> {
    return await this.jobModel.findByIdAndUpdate(id, job, { new: true });
  }

  async delete(id: string): Promise<Job> {
    return await this.jobModel.findByIdAndRemove({ _id: id })
  }
}
