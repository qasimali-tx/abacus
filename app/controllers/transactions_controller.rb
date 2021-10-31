class TransactionsController < ApplicationController
  def index
    @transactions =  policy_scope(Transaction)
  end

  def show
    account = Account.find(params[:id])
    @transaction =  account.transactions
  end
end
