import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SignInDto } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { AddTweetDto } from './dtos/tweet.dto';
import { Tweet } from './entities/tweet.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('sign-up')
  @HttpCode(200)
  signUp(@Body() body: SignInDto) {
    const newUser = new User(body.username, body.avatar);
    this.appService.addUser(newUser);
  }

  @Post('tweets')
  postTweet(@Body() body: AddTweetDto) {
    const newTweet = new Tweet(body.username, body.tweet);
    this.appService.addTweet(newTweet);
  }

  @Get('tweets')
  getTweets(@Query('page') page?: string) {
    const pageNumber = !page ? null : parseInt(page);

    return this.appService.getTweets(pageNumber);
  }

  @Get('tweets/:username')
  getUsername(@Param('username') username: string) {
    // Verificar se o parametro username está aqui!
    // Desnecessário nesse caso pq sempre vai ter username.
    // if(!username) throw HttpException('Precisa informar o nome do usuário!')
    const response = this.appService.getUserTweets(username);
    return response;
  }
}
