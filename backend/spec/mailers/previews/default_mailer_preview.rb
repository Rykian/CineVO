# Preview all emails at http://localhost:3000/rails/mailers/default_mailer
class DefaultMailerPreview < ActionMailer::Preview
  def weekly
    DefaultMailer.weekly(Subscriber.last)
  end
end
