class CreateAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :accounts do |t|
      t.string :provider_id
      t.string :provider_name
      t.string :status
      t.string :provider_account_id
      t.string :account_type
      t.references :user

      t.timestamps
    end
  end
end
