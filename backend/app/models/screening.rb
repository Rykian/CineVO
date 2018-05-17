require 'theater_dates'

class Screening < ApplicationRecord
  belongs_to :movie

  scope :week, ->(weeks_from_now = 0) {
    where(date: TheaterDates.week(weeks_from_now))
  }

  scope :current_week, ->{ week() }
  scope :next_week, ->{ week(+1) }
end
