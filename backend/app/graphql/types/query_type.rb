Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  field :movie do
    type !Types::MovieType
    argument :id, !types.ID
    description "Find a Movie by ID"
    resolve ->(obj, args, ctx) { Movie.find(args["id"]) }
  end

  field :movies do
    type !types[!Types::MovieType]
    description "Display all movies in db"
    resolve -> (obj, args, ctx) { Movie.all }
  end
end
