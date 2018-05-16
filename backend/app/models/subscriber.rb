class Subscriber < ApplicationRecord
  validates_uniqueness_of :email
end
