require 'rails_helper'

RSpec.describe Screening, type: :model do
  describe 'scopes' do
    before {
      @current = create(:screening, date: Time.now)
      @next = create(:screening, date: 8.days.from_now)
      @previous = create(:screening, date: 8.days.ago)
    }

    describe ':current_week' do
      it 'returns only the screening of the current week' do
        expect(Screening.current_week).to eq [@current]
      end
    end

    describe ':next_week' do
      it 'returns only the screening of the next week' do
        expect(Screening.next_week).to eq [@next]
      end
    end
  end
end
