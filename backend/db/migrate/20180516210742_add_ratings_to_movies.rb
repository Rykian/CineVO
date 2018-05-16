class AddRatingsToMovies < ActiveRecord::Migration[5.1]
  def change
    add_column :movies, :press_ratings, :float
    add_column :movies, :user_ratings, :float
  end
end
