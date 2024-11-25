FactoryBot.define do
    factory :post do
        # 英数字のランダムな文字列を生成する（100文字)
        title { "有効なタイトル" }
        content { "Rspecテストの投稿です。有効なコンテンツ。"}
    end
end