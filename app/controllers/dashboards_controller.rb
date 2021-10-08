class DashboardsController < ApplicationController
  include ApplicationHelper
  before_action :authenticate_user!
  before_action :check_default_source, only: [:create_subscription]
  before_action :check_login_name , only:[:transaction_history, :fast_link_provider]
  before_action :yodlee_user_token , only:[:transaction_history, :fast_link_provider]
  def index
  end

  def subscriptions
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
    begin
      @card = Stripe::Customer.create_source(
        current_user.stripe_customer_token,
        {source: card_token}
      )
      current_user.update(default_source: @card.id)
      flash[:notice] = 'Card Created successfully'
      redirect_to root_path
    rescue => e
      flash[:notice] = e.message
      redirect_to root_path
    end
  end

  def files

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
        price = JSON.parse(params[:subscription])["unit_amount"].to_i
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

  def fast_link_provider

  end

  def transaction_history
    token = current_user.yodlee_account_token
    require "uri"
    require "net/http"

    url = URI("#{ENV["BASE_URL"]}/transactions")

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["Api-Version"] = "1.1"
    request["Content-Type"] = "application/x-www-form-urlencoded"
    request["Authorization"] = "Bearer "+token

    response = https.request(request)
    @response = response.read_body
    @transactions=JSON.parse(@response)["transaction"]
  end

  def check_default_source
    if current_user.default_source.nil?
      redirect_to create_stripe_card_dashboards_url
    end
  end
  def check_login_name
    return unless current_user.yodlee_login_name.nil?
  end
end
