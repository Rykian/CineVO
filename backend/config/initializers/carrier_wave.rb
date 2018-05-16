CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    provider:              'AWS',
    aws_access_key_id:     ENV['AWS_ACCESS_KEY'] || ENV['MINIO_ACCESS_KEY'],
    aws_secret_access_key: ENV['AWS_SECRET_KEY'] || ENV['MINIO_SECRET_KEY'],
    region:                ENV['AWS_REGION'] || ENV['MINIO_REGION'],
    host:                  ENV['MINIO_HOST'],
    endpoint:              ENV['MINIO_ENDPOINT'],
    path_style:            true,
  }
  config.fog_directory  = 'default' # Default bucket
  config.asset_host = ENV['MINIO_ASSET_HOST']
end
