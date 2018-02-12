class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.string :runtime
      t.string :plot
      t.string :actors, array: true, default: [], null: false
      t.string :directors, array: true, default: [], null: false

      t.timestamps
    end
  end
end
