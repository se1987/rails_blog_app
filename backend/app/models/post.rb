class Post < ApplicationRecord
    has_one_attached :image
    # validates :image, content_type: ['image/png', 'image/jpg', 'image/jpeg']

    def as_json(options = {})
        super(options).merge({ image_url: image.attached? ? Rails.application.routes.url_helpers.url_for(image) : nil })
    end
end
