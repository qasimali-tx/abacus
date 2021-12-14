module ApplicationHelper

  def subscription_name(id)
    begin
      product = Stripe::Product.retrieve(id)
      product["name"]
    rescue
      ""
    end
  end

  def yodlee_user_token

    require "uri"
    require "net/http"

    url = URI("#{ENV["BASE_URL"]}/auth/token")

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Post.new(url)
    request["Content-Type"] = "application/x-www-form-urlencoded"
    request["Api-Version"] = "1.1"
    request["loginName"] = ENV["YODLEE_USER_LOGOINNAME"]
    request["Cookie"] = "visid_incap_1070612=5yvC92sSS4yVQoLidXqbY/HZ72AAAAAAQUIPAAAAAACEJ+a/IZsG7NOy8n/GaFd/"
    request.body = "clientId=#{ENV["YODLEE_CLIENT_ID"]}&secret=#{ENV["YODLEE_SECRET_ID"]}"
    response = https.request(request)
    yodlee_auth_token = JSON.parse(response.read_body)["token"]["accessToken"]
    current_user.update(yodlee_account_token: yodlee_auth_token)

  end

  def get_yodlee_admin_token
    require "uri"
    require "net/http"

    url = URI("#{ENV["BASE_URL"]}/auth/token")

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Post.new(url)
    request["Content-Type"] = "application/x-www-form-urlencoded"
    request["Api-Version"] = "1.1"
    request["loginName"] = ENV["YODLEE_ADMIN_LOGOINNAME"]
    request.body = "clientId=#{ENV["YODLEE_CLIENT_ID"]}&secret=#{ENV["YODLEE_SECRET_ID"]}"
    response = https.request(request)
    JSON.parse(response.read_body)["token"]["accessToken"]

  end

end
