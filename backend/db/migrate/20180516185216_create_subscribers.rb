class CreateSubscribers < ActiveRecord::Migration[5.1]
  def change
    enable_extension 'uuid-ossp'
    enable_extension 'pgcrypto'
    create_table :subscribers, id: :uuid do |t|
      t.string :email, index: { unique: true }

      t.timestamps
    end
  end
end
