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
      get :subscriptions
      get :create_stripe_card
      post :add_stripe_card
      get :attach_yodlee_account
      get :fast_link_provider
      get :transaction_history
      get :files
      post 'get_bank_account'
      get :notification
      post :create_notification

    end
  end
  resources :accounts
  resources :transactions
  resources :users
end
