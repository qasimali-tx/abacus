require "test_helper"

class DashboradControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get dashborad_index_url
    assert_response :success
  end
end
