import { LoggingInterceptor } from './../interceptors/logging.interceptor';
import { ValidationPipe } from './pipes/validation.pipe';
import { HttpExceptionFilter } from './../filters/http-exception.filter';
import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, UseFilters, UsePipes, CacheKey, CacheTTL, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobDTO } from './dtos/job.dto';
import { Job } from './interfaces/job.interface';
import { JobData } from 'src/decorators/jobdata.decorator';

@Controller('jobs')
@UseInterceptors(CacheInterceptor, LoggingInterceptor)
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Get()
  @CacheKey('allJobs')
  @CacheTTL(15)
  findAll(): Promise<Job> {
    // console.log('find one')
    return this.jobsService.findAll();
  }

  @Get(':id')
  @CacheTTL(15)
  @UseFilters(HttpExceptionFilter)
  find(@Param('id') id): Promise<Job> {
    return this.jobsService.find(id)
      .then((result) => {
        if (result) return result
        else {
          throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            message: 'Job not found'
          }, HttpStatus.NOT_FOUND)
        }
      })
      .catch(() => {
        throw new HttpException('Job not Found', HttpStatus.NOT_FOUND)
      })
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@JobData() job: JobDTO): Promise<Job> {
    return this.jobsService.create(job);
  }

  @Put(':id')
  update(@Param('id') id, @Body() job: JobDTO): Promise<Job> {
    return this.jobsService.update(id, job);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Job> {
    return this.jobsService.delete(id);
  }
}
