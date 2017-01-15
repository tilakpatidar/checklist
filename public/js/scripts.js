(function(){

  function createItem(serializedData){
    $.ajax({
      type: "POST",
      url: "/api/items",
      data: serializedData,
      success: function(data){
        $("#success_insert").attr("style", "").fadeOut();
      },
      error: function(){
        $("#failed_insert").attr("style", "").fadeOut();
      },
      dataType: "json"
    });
  }

  $(document).ready(function(){
    $("#create_item").on("submit", function(){
      createItem($(this).serialize());
      return false;
    })
  });
})();
