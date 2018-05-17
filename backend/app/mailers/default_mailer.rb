require 'theater_dates'
class DefaultMailer < ApplicationMailer
  def weekly(subscriber)
    @subscriber = subscriber
    @movies = Movie.current_week
    week = TheaterDates.week

    subject = default_i18n_subject(begin: l(week.begin, format: :long),
                                   end: l(week.end, format: :long))

    @unsubscribe_url = "http://localhost/unsubscribe/#{subscriber.email}"
    headers['List-Unsubscribe'] = @unsubscribe_url
    mail(to: subscriber.email, subject: subject)
  end
end
