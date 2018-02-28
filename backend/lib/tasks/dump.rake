require 'graphql/rake_task'

require './config/boot'
require './config/environment'

GraphQL::RakeTask.new(schema_name: :CineVOSchema)
