var id = 0;
function Item(title, description){
  if(title.trim() === "" || description.trim() === ""){
    throw new Error();
  }
  id += 1;
  this.id = id;
  this.title = title;
  this.description = description;
}

module.exports = Item;
