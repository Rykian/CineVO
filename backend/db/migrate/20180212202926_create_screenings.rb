class CreateScreenings < ActiveRecord::Migration[5.1]
  def change
    create_table :screenings do |t|
      t.references :movie, foreign_key: true
      t.datetime :date, null: false

      t.timestamps
    end
  end
end
