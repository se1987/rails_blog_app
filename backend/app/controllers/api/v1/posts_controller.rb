class Api::V1::PostsController < ApplicationController

  # GET一覧
  def index
    render json: Post.all
  end

  # GET詳細
  def show
    render json: Post.find(params[:id])
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
