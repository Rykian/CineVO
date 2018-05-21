Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :subscribe, !types.Boolean do
    description 'Subscribe to newsletter'

    argument :email, !types.String

    resolve ->(_obj, args, _ctx) {
      Subscriber.create(email: args[:email]).persisted?
    }
  end

  field :unsubscribe, types.Boolean do
    description 'Unsubscribe from newsletter'
    argument :id, !types.ID
    resolve ->(_obj, args, _ctx) {
      Subscriber.find(args[:id]).destroy.destroyed?
    }
  end
end
