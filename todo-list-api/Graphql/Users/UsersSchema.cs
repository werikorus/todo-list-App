using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace todo_list_api.Graphql.Users
{
    public class UsersSchema : Schema
    {
        public UsersSchema(IServiceProvider serviceProvider) : base(serviceProvider)
        {
            Query = serviceProvider.GetRequiredService<UsersQuery>();
            Mutation = serviceProvider.GetRequiredService<UsersMutation>();
        }
    }
}
