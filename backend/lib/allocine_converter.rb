# Convert Allocine data into ActiveRecord objects
class AllocineConverter
  # Update screening list
  # @param sessions [Hash] return from showtimelist Allocine API
  def self.update_sessions(sessions)
    sessions.each do |session|
      movie = AllocineConverter.find_or_create_movie(session['onShow']['movie'])

      session['scr'].each do |s|
        date_day_str = s['d'] + ' '
        s['t'].each do |t|
          date = DateTime.strptime(
            date_day_str + t['$'],
            '%Y-%m-%d %H:%M'
          )
          Screening.create(movie: movie, date: date)
        end
      end
    end
  end

  # Convert Allocine movie data into [Movie]
  # @param movie [Hash] Allocine movie hash
  # @return [Movie] Old or newly created movie
  def self.find_or_create_movie(movie)
    amovie = Allocine::Movie.new(movie['code'])
    Movie.where(id: amovie.id).first_or_create(
      id: amovie.id,
      title: amovie.title,
      runtime: amovie.length,
      remote_poster_url: amovie.poster,
      plot: ActionView::Base.full_sanitizer.sanitize(amovie.plot(false)),
      actors: amovie.actors_name,
      directors: amovie.directors_name,
      press_ratings: movie['statistics']['pressRating'],
      user_ratings: movie['statistics']['userRating'],
    )
  end
end
