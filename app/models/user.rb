class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  validates_presence_of :first_name, :last_name
  def full_name
    "#{self.first_name} #{self.last_name}"
  end

end
