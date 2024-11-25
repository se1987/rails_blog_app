module ApplicationHelper
  def image_url_for(record)
    if record.respond_to?(:image) && record.image.attached?
      Rails.application.routes.url_helpers.url_for(record.image)
    else
      nil
    end
  end
end
