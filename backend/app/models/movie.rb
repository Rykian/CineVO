require 'theater_dates'

class Movie < ApplicationRecord
  has_many :screenings
  mount_uploader :poster, PosterUploader

  scope :week, ->(weeks_from_now = 0) {
    includes(:screenings)
      .joins(:screenings)
      .where('screenings.date' => TheaterDates.week(weeks_from_now))
      .distinct
  }

  scope :current_week, ->{ week() }
  scope :next_week, ->{ week(+1) }
end
