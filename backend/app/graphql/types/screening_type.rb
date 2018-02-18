Types::ScreeningType = GraphQL::ObjectType.define do
  name "Screening"
  field :id, !types.ID
  field :movie, !Types::MovieType
  field :date, !types.String
end
