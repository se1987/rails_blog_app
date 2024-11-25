class Post < ApplicationRecord
  # imageフィールドを追加して１件の投稿にひとつの画像ファイルを添付できるようマッピング
  has_one_attached :image
  # バリデーション
  validates :title, presence: true
  validates :content, length: { minimum: 10 }
end
