(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"post\">\r\n  <div class=\"post-content\">\r\n    <p class=\"upvote\">\r\n      <i class=\"fa fa-arrow-up\" aria-hidden=\"true\"></i>\r\n    </p>\r\n    <p class=\"points\">\r\n      "
    + alias4(((helper = (helper = helpers.points || (depth0 != null ? depth0.points : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"points","hash":{},"data":data}) : helper)))
    + "\r\n    </p>\r\n    <p class=\"downvote\">\r\n      <i class=\"fa fa-arrow-down\" aria-hidden=\"true\"></i>\r\n    </p>\r\n    <p class=\"text\">\r\n      "
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "\r\n    </p>\r\n    <p class=\"author\">\r\n      <a href=\"#\">"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "</a>\r\n    </p>\r\n  </div>\r\n</article>";
},"useData":true});
})();