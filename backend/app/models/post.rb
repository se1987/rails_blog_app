class Post < ApplicationRecord
  # imageフィールドを追加して１件の投稿にひとつの画像ファイルを添付できるようマッピング
  has_one_attached :image

  include Rails.application.routes.url_helpers
  # URLの生成を行い、そのURLをJSONレスポンスに含める
  def as_json(options = {})
    super(options).merge(
      image_url: image.attached? ? Rails.application.routes.url_helpers.url_for(image) : nil
    )
  end
end

