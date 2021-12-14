class AccountsController < ApplicationController
  include ApplicationHelper
  before_action :check_login_name
  before_action :yodlee_user_token
  def index
    @accounts = policy_scope(Account)
  end

  private
  def check_login_name
    if current_user.yodlee_login_name.blank?
      current_user.update(yodlee_login_name: ENV["YODLEE_USER_LOGOINNAME"])
    end
  end
end
