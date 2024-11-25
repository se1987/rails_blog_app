require 'rails_helper'

RSpec.describe Post do
    let(:post) { build(:post) } expect(post).to be_valid
    it "is valid with a valid content" do
        expect(tweet).to be_valid
    end
    it "is not valid without a content" do
        tweet.content = ''
        expect(tweet).to_not be_valid
    end
    it "is not valid with a content longer than 140" do
        tweet.content = Faker::Lorem.characters(number: 9)
        expect(tweet).to_not be_valid
    end
end