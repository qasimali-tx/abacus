module ApplicationHelper

  def subscription_name(id)
    begin
      product = Stripe::Product.retrieve(id)
      product["name"]
    rescue
      ""
    end
  end

end
