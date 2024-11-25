class Api::V1::PostsController < ApplicationController
  include ApplicationHelper

  # GET一覧
  def index
    posts = Post.all.map do |post|
      post.as_json.merge(image_url: image_url_for(post))
    end
    render json: posts
  end

  # GET詳細
  def show
    post = Post.find(params[:id])
    render json: post.as_json.merge(image_url: image_url_for(post))
  end

  # POST新規投稿
  def create
    @post = Post.new(post_params)
    
    if @post.save
      render json: @post.as_json.merge(image_url: image_url_for(@post)), status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PUT更新
  def update
    @post = Post.find(params[:id])

    if params[:image]
      @post.image.purge if @post.image.attached?
      @post.image.attach(params[:image])
    end

    if @post.update(post_params)
      render json: @post.as_json.merge(image_url: image_url_for(@post)), status: :ok
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE削除
  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    head :no_content
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :image)
  end
end

