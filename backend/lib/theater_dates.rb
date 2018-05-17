class TheaterDates
  def self.week(weeks_from_now = 0)
    first = weeks_from_now.week.from_now.beginning_of_week(:wednesday)
    last = weeks_from_now.week.from_now.end_of_week(:wednesday)
    first..last
  end
end
