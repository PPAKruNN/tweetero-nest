import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];
  private pageSize = 15;

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  addUser(user: User) {
    this.users.push(user);
  }

  addTweet(tweet: Tweet) {
    const index = this.users.findIndex(
      (curr) => curr.username == tweet.username,
    );

    if (index == -1)
      throw new HttpException(
        'Usuário não cadastrado',
        HttpStatus.UNAUTHORIZED,
      );

    this.tweets.push(tweet);
  }

  getTweets(page?: number) {
    let response: Tweet[] = [];

    if (page == null) {
      response = this.tweets.slice(this.tweets.length - this.pageSize);
    } else {
      if (page <= 0) {
        throw new HttpException(
          'Informe uma página válida!',
          HttpStatus.BAD_REQUEST,
        );
      }

      response = this.tweets.slice(
        this.pageSize * (page - 1),
        this.pageSize * page,
      );
    }

    const res = response.map((curr) => {
      return {
        avatar: this.users.find((c) => c.username == curr.username).avatar,
        tweet: curr.tweet,
        username: curr.username,
      };
    });

    return res;
  }

  getUserTweets(username: string) {
    // Verificar se o usuário existe.
    const myUser: User = this.users.find((i) => i.username == username);
    if (!myUser) return [];
    // Pegar todos tweets dele.
    const filtered = this.tweets.filter(
      (tw) => tw.username === myUser.username,
    );
    const response = filtered.map((tw) => {
      if (tw.username === myUser.username) {
        return {
          username: tw.username,
          tweet: tw.tweet,
          avatar: myUser.avatar,
        };
      }
    });

    return response;
  }
}
