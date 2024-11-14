Rails.application.routes.draw do
  # Active Storage routes
  direct :rails_blob do |blob|
    route_for(:rails_blob, blob)
  end
  direct :rails_blob_proxy do |blob|
    route_for(:rails_blob_proxy, blob)
  end
  direct :rails_blob_redirect do |blob|
    route_for(:rails_blob_redirect, blob)
  end
  # 他のルート
  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :show, :create, :update, :destroy]
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
