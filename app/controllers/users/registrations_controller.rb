class Users::RegistrationsController < Devise::RegistrationsController
  include ApplicationHelper
  before_action :configure_permitted_parameters, only: [:create]
  before_action :configure_permitted_parameters, if: :devise_controller?

  # POST /resource
  def create
    build_resource(sign_up_params)
    resource.skip_confirmation!
    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        stripe_customer
        yodlee_user
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
          set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      resource.errors.full_messages.each {|x| flash[x] = x}
      flash[:alert] = resource.errors.full_messages.to_sentence
      respond_with resource
    end
  end

  def stripe_customer
    customer = Stripe::Customer.create(email:resource.email, name:resource.full_name)
    resource.update(stripe_customer_token:customer.id)
  end

  def yodlee_user
    require "uri"
    require "net/http"
    token = get_yodlee_admin_token
    url = URI("#{ENV["BASE_URL"]}/user/register")

    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Post.new(url)
    request["Api-Version"] = "1.1"
    request["Authorization"] = "Bearer "+token
    request["Content-Type"] = "application/json"
    raw_data = {
      "user": {
        "loginName": "#{resource.first_name}.#{resource.last_name}.#{SecureRandom.hex(4)}",
        "email": resource.email,
        "name": {
          "first": resource.first_name,
          "last": resource.last_name
        }
      }
    }
    request.body = raw_data.to_json
    response = https.request(request)
    response.read_body
    yodleelogInName=JSON.parse(response.read_body)["user"]["loginName"]
    resource.update(yodlee_login_name:yodleelogInName)
  end

  protected
  def sign_up_params
    params.require(:user).permit(:first_name, :last_name,  :email, :password, :password_confirmation)
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :email, :password, :password_confirmation])
  end

end
