class AddColumnsUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :stripe_customer_token, :string
    add_column :users, :default_source, :string
    add_column :users, :subscription_id, :string
  end
end
