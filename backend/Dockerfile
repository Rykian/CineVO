FROM ruby:2.5
WORKDIR /app
EXPOSE 3000

ADD Gemfile Gemfile.lock /app/
ADD vendor /app/vendor

RUN bundle install --deployment

ADD . /app/

CMD bundle exec rails s
