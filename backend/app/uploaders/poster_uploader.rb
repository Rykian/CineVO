class PosterUploader < Minio::Uploader
  include CarrierWave::MiniMagick

  version :thumb do
    process resize_to_fit: [300, 300]
  end
end
