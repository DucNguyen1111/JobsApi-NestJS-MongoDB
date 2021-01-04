import { IsInt, isInt, IsString } from "class-validator";

export class JobDTO {
  @IsString()
  readonly title: string;

  @IsInt()
  readonly salary: number;
}
