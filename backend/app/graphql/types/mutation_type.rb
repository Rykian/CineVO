Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :subscribe, types.Boolean do
    description "Subscribe to newsletter"

    argument :email, !types.String

    resolve ->(obj, args, ctx) {
      Subscriber.create(email: args[:email]).persisted?
    }
  end
end
