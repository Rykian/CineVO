FactoryBot.define do
  factory :movie do
    title 'My Movie'
    runtime 100
    plot 'A very interesting plot'
    actors ['first actor']
    directors ['first director']
    poster 'screen.jpg'
    press_ratings 3
    user_ratings 4
  end
end
