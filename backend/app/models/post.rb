class Post < ApplicationRecord
  has_one_attached :image

  include Rails.application.routes.url_helpers

  def as_json(options = {})
    super(options).merge(
      image_url: image.attached? ? Rails.application.routes.url_helpers.url_for(image) : nil
    )
  end
end

