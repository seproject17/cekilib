class AddBookReferenceToBookItem < ActiveRecord::Migration[5.1]
  def change
    add_reference :book_items, :book, foreign_key: true
  end
end
