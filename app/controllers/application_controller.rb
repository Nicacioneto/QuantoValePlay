class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def find_player( id = 0 )

    assert { !id.nil? }
    id = id.to_i
    assert { id >= 0 }

    @player= Player.find(id);

  end

end
