FactoryBot.define do
  factory :screening do
    movie
    date Time.now
  end
end
