require 'clockwork/test'

describe Clockwork do
  after(:each) { Clockwork::Test.clear! }

  describe 'refresh_screenings_and_send_newsletter' do
    it "runs the job only one time a week" do
      current_week = TheaterDates.week
      Clockwork::Test.run(
        start_time: current_week.begin,
        end_time: current_week.end,
        tick_speed: 1.minute)

      expect(Clockwork::Test.times_run('refresh_screenings_and_send_newsletter')).to eq 1
    end
  end
end
