import { Injectable } from '@nestjs/common';

import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostsService {
  private readonly posts: Post[] = [];

  create(createPostInput: CreatePostInput) {
    this.posts.push(createPostInput);
    return createPostInput;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: string) {
    return this.posts.find((x) => x.id === id);
  }
  forAuthor(authorId: string) {
    return this.posts.filter((x) => x.authorId === authorId);
  }
}
