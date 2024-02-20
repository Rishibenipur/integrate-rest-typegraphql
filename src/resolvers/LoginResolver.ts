import { Query, Resolver } from 'type-graphql';

@Resolver()
export class LoginResolver {
  @Query(() => String)
  async greet() {
    return 'Hello from your first response';
  }
}
