class Movie < ApplicationRecord
  has_many :screenings
  mount_uploader :poster, PosterUploader
end
