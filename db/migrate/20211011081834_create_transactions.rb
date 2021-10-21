class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.string :amount
      t.string :category
      t.string :category_type
      t.string :description
      t.datetime :transaction_date
      t.string :currency
      t.string :uuid
      t.references :account

      t.timestamps
    end
  end
end
