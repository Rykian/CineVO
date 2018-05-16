class CreateSubscribers < ActiveRecord::Migration[5.1]
  def change
    create_table :subscribers do |t|
      t.string :email, index: { unique: true }

      t.timestamps
    end
  end
end
