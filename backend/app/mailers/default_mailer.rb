require 'theater_dates'
class DefaultMailer < ApplicationMailer
  def weekly(subscriber, movies = nil)
    @subscriber = subscriber
    @movies = movies || Movie.current_week
    week = TheaterDates.week

    subject = default_i18n_subject(begin: l(week.begin.to_date, format: :long),
                                   end: l(week.end.to_date, format: :long))

    @unsubscribe_url = "http://localhost/unsubscribe/#{subscriber.id}"
    headers['List-Unsubscribe'] = @unsubscribe_url
    mail(to: subscriber.email, subject: subject)
  end
end
