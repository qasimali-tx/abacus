module ApplicationHelper

  def subscription_name(id)
    begin
      product = Stripe::Product.retrieve(id)
      product["name"]
    rescue
      ""
    end
  end

  def get_auth_token
    require "uri"
    require "net/http"

    url = URI("https://sandbox.api.yodlee.com/ysl/auth/token")

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Post.new(url)
    request["Api-Version"] = "1.1"
    request["loginName"] = current_user.yodlee_login_name
    request["Content-Type"] = "application/x-www-form-urlencoded"
    request.body = "clientId=wJlfFslvB9lK0w7XklUIqmNgGPuVAMfm&secret=oUPLdP3FNC8x2p4Z"

    response = https.request(request)
    yodlee_auth_token = JSON.parse(response.read_body)["token"]["accessToken"]
    current_user.update(yodlee_account_token: yodlee_auth_token)
  end

end
