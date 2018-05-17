require 'rails_helper'

RSpec.describe Movie, type: :model do
  describe "scopes" do
    describe ":current_week" do
      it 'return the movie with a screening this week' do
        movie = create(:movie)
        create(:screening, movie: movie, date: Time.now)

        expect(Movie.current_week.count).to eq 1
      end

      it 'does not return movies if screenings are next week' do
        movie = create(:movie)
        create(:screening, movie: movie, date: 8.days.from_now)

        expect(Movie.current_week.count).to eq 0
      end

      it 'does not return movies if screenings are last week' do
        movie = create(:movie)
        create(:screening, movie: movie, date: 8.days.ago)

        expect(Movie.current_week.count).to eq 0
      end

      it 'returns only screenings of this week' do
        movie = create(:movie)
        screening_of_the_week = create(:screening, movie: movie, date: Time.now)
        create(:screening, movie: movie, date: 8.days.from_now)
        create(:screening, movie: movie, date: 8.days.ago)

        expect(Movie.current_week.first.screenings).to eq [screening_of_the_week]
      end
    end

    describe ":next_week" do
      it 'does not return the movie with a screening this week' do
        movie = create(:movie)
        create(:screening, movie: movie, date: Time.now)

        expect(Movie.next_week.count).to eq 0
      end

      it 'returns movie if screenings are next week' do
        movie = create(:movie)
        create(:screening, movie: movie, date: 8.days.from_now)

        expect(Movie.next_week.count).to eq 1
      end

      it 'does not return movies if screenings are last week' do
        movie = create(:movie)
        create(:screening, movie: movie, date: 8.days.ago)

        expect(Movie.next_week.count).to eq 0
      end

      it 'returns only screenings of next week' do
        movie = create(:movie)
        create(:screening, movie: movie, date: Time.now)
        screening_of_next_week = create(:screening, movie: movie, date: 8.days.from_now)
        create(:screening, movie: movie, date: 8.days.ago)

        expect(Movie.next_week.first.screenings).to eq [screening_of_next_week]
      end
    end
  end
end
