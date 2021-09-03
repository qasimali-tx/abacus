Rails.application.routes.draw do
  get 'dashborad/index'
  devise_for :users, :controllers => {:registrations => "users/registrations"}
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "dashboards#index"
  resources :dashboards do
    member do
      get :create_subscription
    end
    collection do
      get :create_stripe_card
      post :add_stripe_card
      get :attach_yodlee_account
      get :fast_link_provider
      get :transaction_history
    end
  end
end
