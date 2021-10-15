# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
set :environment, "development"
set :output, "log/cron.log"
# set :bundle_command, "/home/southville-solutions/.rbenv/shims/bundle exec"
set :bundle_command, "/home/deploy/.rbenv/shims/bundle exec"
every 1.hour do
  rake 'account_data:fetch_account_details'
end

# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever
