class Post < ApplicationRecord
    has_one_attached :image
    validates :image, content_type: ['image/png', 'image/jpg', 'image/jpeg']
end
