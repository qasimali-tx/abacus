class AccountsController < ApplicationController
  def index
    @accounts = policy_scope(Account)
  end
end
