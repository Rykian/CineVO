# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
bucket = "default"
policy = {
  "Version" => "2012-10-17",
  "Statement" => [
    {
      "Action" => ["s3:GetBucketLocation","s3:ListBucket"],
      "Effect" => "Allow",
      "Principal" => {"AWS" => ["*"]},
      "Resource" => ["arn:aws:s3:::#{bucket}"],
      "Sid" => ""
    },
    {
      "Action" => ["s3:GetObject"],
      "Effect" => "Allow",
      "Principal" => {"AWS" => ["*"]},
      "Resource" => ["arn:aws:s3:::#{bucket}/*"],
      "Sid" => ""
    }
  ]
}
fog_config = {
  provider:              'AWS',
  aws_access_key_id:     ENV['AWS_ACCESS_KEY'] || ENV['MINIO_ACCESS_KEY'],
  aws_secret_access_key: ENV['AWS_SECRET_KEY'] || ENV['MINIO_SECRET_KEY'],
  region:                ENV['AWS_REGION'] || ENV['MINIO_REGION'],
  host:                  ENV['AWS_HOST'] || ENV['MINIO_HOST'],
  endpoint:              ENV['AWS_ENDPOINT'] || ENV['MINIO_ENDPOINT'],
  path_style:          	 true,
}

connection = Fog::Storage.new fog_config
connection.put_bucket(bucket)
connection.put_bucket_policy(bucket, policy)
