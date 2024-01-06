import { IsNotEmpty, IsString } from 'class-validator';

export class AddTweetDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  tweet: string;
}
