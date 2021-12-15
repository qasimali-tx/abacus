class TransactionsController < ApplicationController
  def index
    if params[:title] == 'Today:'
      @transactions = policy_scope(Transaction.where('created_at > ?', Date.today))
    elsif params[:title] == 'Yesterday:'
      @transactions = policy_scope(Transaction.where('created_at > ?', Date.today-1))
    elsif
      params[:title] == 'Last 7 Days:'
      @transactions = policy_scope(Transaction.where('created_at > ?', Date.today-6.days))
    elsif
    params[:title] == 'Last 30 Days:'
      @transactions = policy_scope(Transaction.where('created_at > ?', 30.days.ago))
    elsif
    params[:title] == 'This Month:'
      @transactions = policy_scope(Transaction.where('created_at > ?', Date.today-29.days))
    elsif
    params[:title] == 'Last Month:'
      @transactions = policy_scope(Transaction.where('created_at > ?', 1.month.ago.beginning_of_month , 1.month.ago.end_of_month))
    elsif
    params[:title] == 'Custom Range' && params[:start] && params[:end]
      @transactions = policy_scope(Transaction.where(:created_at => params[:start].to_date.beginning_of_day..params[:end].to_date.end_of_day))
    else
      @transactions =  policy_scope(Transaction)
    end
  end

  def show
    account = Account.find(params[:id])
    @transaction =  account.transactions
  end
end
