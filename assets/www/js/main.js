// document ready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

	// global ayarlar
	common();
	
	// network kontrolu
	if(!isConnected())
		showConnectionAlert();
	else
		loadPosts();

}

var common = function() {
	
	$.mobile.loadingMessage = 'Yukleniyor...';
	$.mobile.touchOverflowEnabled = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushStateEnabled = false;
	$.support.cors = true;
	
}

var isConnected = function() {
	
	var networkState = navigator.network.connection.type;

	if(networkState == Connection.NONE || typeof networkState === "undefined" || networkState == null)
		return false;
		
	return true;
	
}

var showConnectionAlert = function() {
	navigator.notification.alert(
    	'İnternet bağlantısı yok!',  
   		alertDismissed,         
    	'Bağlantı',            
    	'Tamam'                  
	);
}

var alertDismissed = function() {
	// burada baglanti hatasi kapatildi
	// herhangi bir islem yapabilirsiniz	
}

var loadPosts = function() {
	$.ajax({
	  url: 'http://www.emincansumer.com/demo/pg-app/json.php',
	  type: 'POST',
	  dataType: 'jsonp',
	  timeout: 10000,
	  cache: false,
	  beforeSend: function(xhr, settings){
	  	$.mobile.showPageLoadingMsg();
	  },
	  complete: function(xhr, textStatus) {
		$.mobile.hidePageLoadingMsg();
	  },
	  success: function(data, textStatus, xhr) {
		$.each(data, function(ind, post) {
			$("#posts").append(
				$("<li>").append(
					$("<a>").attr("href","#postpage").attr("onclick","showPost("+post.id+")").text(post.title).append(
						$("<span>").addClass("ui-li-count").text(post.comment_num)
					)
				)
			);
		});
		// yazilari ekledikten sonra listeyi yenilemeliyiz
		$("#posts").listview("refresh");
	  },
	  error: function(xhr, textStatus, errorThrown) {
	  	alert(textStatus);
	  }
	});
	
}

var showPost = function(id) {
	
	$.ajax({
	  url: 'http://www.emincansumer.com/demo/pg-app/json.php',
	  type: 'POST',
	  dataType: 'jsonp',
	  data: {id: id},
	  timeout: 10000,
	  cache: false,
	  beforeSend: function(xhr, settings){
	  	$("#post-content").html("");
	  	$.mobile.showPageLoadingMsg();
	  },
	  complete: function(xhr, textStatus) {
		$.mobile.hidePageLoadingMsg();
	  },
	  success: function(data, textStatus, xhr) {
		$("#post-content").append(
			$("<h2>").text(data.title)
		).append(
			$("<p>").text(data.body)
		);
		// yazilari ekledikten sonra listeyi yenilemeliyiz
		$("#posts").listview("refresh");
	  },
	  error: function(xhr, textStatus, errorThrown) {
	  	alert(textStatus);
	  }
	});
	
}
