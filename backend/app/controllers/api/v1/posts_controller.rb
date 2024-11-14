class Api::V1::PostsController < ApplicationController
  # GET一覧
  def index
    @posts = Post.all
    render json:@posts
  end
  # GET詳細
  def show
    @post = Post.find(params[:id])
    render json: @post.as_json.merge(
    image_url: @post.image.attached? ? rails_blob_url(@post.image, only_path: false) : nil
  )
  end
  # POST新規投稿
  def create
    @post = Post.new(post_params)
    
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end
  # PUT更新
  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end
  # DELETE削除
  def destroy
    @post = Post.find(params[:id])
    @post.destroy
  end

  private

  def post_params
  	params.require(:post).permit(:title, :content, :image)
  end
end
