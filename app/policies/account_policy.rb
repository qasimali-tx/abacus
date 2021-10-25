class AccountPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.has_role? :admin
        scope.all
      else
        scope.where(user: user)
      end
    end
  end

  def index?
    user.has_role? :admin
  end

end
