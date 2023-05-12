import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { CurrentUser } from './current-user.decorator';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll(@CurrentUser() user: User) {
    console.log(user);
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ResolveField(() => User)
  author(@Parent() post: Post): any {
    return {
      _typeName: 'User',
      id: post.authorId,
    };
  }
}
