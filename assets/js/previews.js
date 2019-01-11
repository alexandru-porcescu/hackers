$(document).ready(function() {

      function postLinkPreviews() {
        $(".post-content > p > a").each(function(index, element) {
            $.ajax({
              url: 'https://us-central1-hackersandslackers-204807.cloudfunctions.net/link-preview-endpoint?url=' + $(element).attr('href'),
              async: true,
              contentType: "application/json",
              data: JSON.stringify({
                q: $(element).attr('href'),
              }),
              dataType: 'json',
              success: function(result) {
                console.log(result)
                $(element).after('<a href="' + result.url + '"><div class="link-preview"> \n ' +
                '<h4 class="title-desktop">' + result.title + '</h4> \n ' +
                '<div class="link-info"> \n ' +
                '<div class="link-preview-image"><img src="' + result.image + '"></div> \n' +
                '<div class="detail-stack"><p>' + result.description + '</p><span class="url-info"><i class="far fa-link"></i>' + result.url.split('://')[1] + '</span> \n ' +
                '<h4 class="title-mobile">' + result.title + '</h4> \n ' +
                '</div></div></a>');
                $(element).remove();
                if( $('.link-preview-image').find('img').attr('src') == 'null'){
                  $( this ).remove();
                }
              }
            });
          });
        }

      function authorLinkPreviews() {
          $(".author-website a").each(function(index, element) {
            $.ajax({
              url: 'https://us-central1-hackersandslackers-204807.cloudfunctions.net/link-preview-endpoint?url=' + $(this).text(),
              contentType: "application/json",
              dataType: 'json',
              success: function(result) {
                $('.author-website').append('<a href="' + result.url + '"><div class="link-preview" style="background:url(' + result.image + ')"><h4>' + result.title + '</h4><i class="fas fa-link"></i></div></a>');
                $(element).remove();
              }
            });
          });
      }

      postLinkPreviews();

      if ($('.author-template').length) {
        authorLinkPreviews();
      }
});