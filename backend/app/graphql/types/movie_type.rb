Types::MovieType = GraphQL::ObjectType.define do
  name 'Movie'
  field :id, !types.ID
  field :title, !types.String
  field :runtime, !types.Int
  field :plot, types.String
  field :poster, PosterUploader.to_graphql
  field :actors, !types[types.String]
  field :directors, !types[types.String]
  field :screenings, types[!Types::ScreeningType]
end
