namespace :account_data do
task fetch_account_details: :environment do
  require "uri"
  require "net/http"
  date = Time.now - 1.year
  from_date = date.strftime("%F")
  url = URI("#{ENV["BASE_URL"]}/transactions?fromDate=#{from_date}")

  https = Net::HTTP.new(url.host, url.port)
  https.use_ssl = true
  request = Net::HTTP::Get.new(url)
  request["Api-Version"] = "1.1"
  request["Content-Type"] = "application/x-www-form-urlencoded"
  accounts = Account.all
  accounts.each do |account|
    user = account.user
    token = user.yodlee_account_token
    request["Authorization"] = "Bearer " + token
    response = https.request(request)
    @response = response.read_body
    transactions = JSON.parse(@response)

    if transactions.empty?
      raise 'No transaction found!'
    else
      transaction_data_array = transactions["transaction"]
      transaction_data_array.each do |trans|
        transaction = Transaction.find_or_create_by(uuid: trans["id"])
        transaction.update(amount: trans["amount"]["amount"], currency: trans["amount"]["currency"],
                           description: trans["description"]["original"], category: trans["category"],
                           category_type: trans["categoryType"], transaction_date: trans["transactionDate"],
                           account_id: account.id)
      end
      end
  end
  puts 'Done!'
end
end