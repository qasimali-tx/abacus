class DashboardsController < ApplicationController
  before_action :authenticate_user!, :set_stripe_key

  def index
    @subscriptions = Stripe::Price.list({limit: 3})
  end

  def create_stripe_card
  end

  def add_stripe_card
    card_token = params[:card][:token]
    @card = Stripe::Customer.create_source(
      current_user.stripe_customer_token,
      {source: card_token}
      )
    current_user.update(default_source: @card.id )
    flash[:notice] = 'Card Created successfully'
    redirect_to root_path
  end

  def create_subscription
    begin
      @subscription = Stripe::Subscription.create({
                                                    customer: current_user.stripe_customer_token,
                                                    items: [
                                                      {price: params[:id]},
                                                    ]
                                                  })
      current_user.update(subscription_id: params[:id])
      flash[:notice] = 'Subscription Created successfully'
      redirect_to root_path
    rescue => e
      flash[:notice] = e.message
      redirect_to root_path
    end
  end

  private

  def set_stripe_key
    Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
  end
end
