class Uploader < CarrierWave::Uploader::Base
  storage :fog

  def cache_dir
    "#{Rails.root}/tmp/uploads"
  end

  def asset_host
    "#{super}/#{fog_directory}"
  end

  def store_dir
    "#{model.class.to_s.underscore}/#{model.id}"
  end

  def as_json(options = {})
    base = versions.reduce({}) do |acc, (name, version)|
      acc[name] = version.url
      acc
    end
    base.merge({original: url})
  end

  def self.to_graphql
    model_class = self
    GraphQL::ObjectType.define do
      name model_class.name

      field :original, !types.String do
        description 'Original uploaded file'
        resolve ->(obj, _, _) { obj }
      end

      # Generate a field for each versions
      model_class.versions.each do |k, v|
        field k, !types.String do
          description "Version `#{k}` of the uploaded file"
          resolve ->(obj, _, _) { obj.versions[k] }
        end
      end
    end
  end

  def self.descendants
    ObjectSpace.each_object(Class).select { |klass| klass < self }
  end
end

# Forcing require of uploaders
uploader_file = Dir[Rails.root.join('app', 'uploaders', 'uploader.rb')]
files = Dir[Rails.root.join('app', 'uploaders', '*.rb')]
(files - uploader_file).each { |file| require file }
