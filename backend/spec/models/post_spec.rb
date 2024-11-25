require 'rails_helper'

RSpec.describe Post, type: :model do
  let(:post) { build(:post) } # FactoryBot を使用してインスタンスを生成

  describe 'バリデーションのテスト' do
    it "有効なコンテンツを持つ場合に有効である" do
      post.content = '有効なコンテンツ'
      expect(post).to be_valid
    end

    it "コンテンツが空の場合に無効である" do
      post.content = ''
      expect(post).to_not be_valid
    end

    it "コンテンツが10文字未満の場合に無効である" do
      post.content = 'a' * 9
      expect(post).to_not be_valid
    end
  end
end
