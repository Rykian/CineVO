require 'allocine_converter'
namespace :cinevo do
  desc 'Update screening dates'
  task update_screenings: :environment do
    result = Allocine::ShowtimeList.search_by(theaters: ['P1140'])
    sessions = result['feed']['theaterShowtimes'].first['movieShowtimes']

    # Select only sessions with original version which is not french
    original_versions = sessions.keep_if do |screening|
      version = screening['version']
      version['original'] == 'true' && version['code'] != 6001
    end

    AllocineConverter.update_sessions(original_versions)
  end

  desc 'Sending newsletter with OV sessions'
  task send_newsletter: :environment do
    movies = Movie.current_week

    next if movies.count < 1

    Subscriber.all.each do |subscriber|
      DefaultMailer.weekly(subscriber, movies).deliver_now
    end
  end
end
