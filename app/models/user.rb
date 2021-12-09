class User < ApplicationRecord
  has_many :accounts
  has_many_attached :documents
  has_many :notifications
  rolify
  after_create :assign_default_role
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  validates_presence_of :first_name, :last_name
  def full_name
    "#{self.first_name} #{self.last_name}"
  end

  def before_add_method(role)
    # do something before it gets added
  end

  def assign_default_role
    self.add_role("client") if self.roles.blank?
  end

end
