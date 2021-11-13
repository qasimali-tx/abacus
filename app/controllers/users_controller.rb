class UsersController < ApplicationController
  def update
    @user = User.find(params[:id])
    if @user.update(documents: params[:user][:documents])
       redirect_to @user, notice: 'User was successfully created.'
    end
  end

  def show
    @user = current_user
  end

end


