class DashboardsController < ApplicationController
  before_action :authenticate_user!
  before_action :check_default_source, only: [:create_subscription]
  def index
    begin
      @subscriptions = Stripe::Price.list({limit: 3})
    rescue
      []
    end
  end

  def create_stripe_card
  end

  def add_stripe_card
    card_token = params[:card][:token]
    @card = Stripe::Customer.create_source(
      current_user.stripe_customer_token,
      {source: card_token}
      )
    current_user.update(default_source: @card.id)
    flash[:notice] = 'Card Created successfully'
    redirect_to root_path
  end

  def create_subscription
    begin
      if params[:type] == "recurring"
        Stripe::Subscription.create({
                                                      customer: current_user.stripe_customer_token,
                                                      items: [
                                                        {price: params[:id]},
                                                      ]
                                                    })
      else
        price = JSON.parse(params[:subscription])["unit_amount"]
        @charge=Stripe::Charge.create({
                                amount: price/100,
                                customer: current_user.stripe_customer_token,
                                currency: 'usd',
                                description: 'One Time charge',
                              })
      end
      current_user.update(subscription_id: params[:id])
      flash[:notice] = 'Subscription Created successfully'
      redirect_to root_path
    rescue => e
      flash[:notice] = e.message
      redirect_to root_path
    end
  end

  def check_default_source
    if current_user.default_source.nil?
      redirect_to create_stripe_card_dashboards_url
    end
  end
end
