require 'clockwork'
require './config/boot'
require './config/environment'
require 'active_support/time'

module Clockwork
  every(1.day, 'refresh_screenings_and_send_newsletter', at: 'wednesday 06:00') do
    CineVO::Application.load_tasks
    Rake::Task['cinevolle:update_screenings'].invoke
    Rake::Task['cinevolle:send_newsletter'].invoke
  end
end
