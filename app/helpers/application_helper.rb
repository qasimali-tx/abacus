module ApplicationHelper

  def subscription_name(id)
    product = Stripe::Product.retrieve(id)
    product["name"]
  end

end
