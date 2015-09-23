var bannerAdministration = angular.module('bannerAdministration', ["ngSanitize"]).config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.timeout = 10000;
}]);

bannerAdministration.controller('bannerController', ['$scope', function($scope) {

	$scope.banners = [
	    {'displayName': 'Bloque Publicitario', 'type': 0},
	    {'displayName': 'Superbanner Premium', 'type': 1},
	    {'displayName': 'Ventana Premium', 'type': 2},
		{'displayName': 'SliderBar', 'type': 3},
		{'displayName': 'Terceros', 'type': 4},
		{'displayName': 'Superbanner Premium Con Script', 'type': 5},
		{'displayName': 'BaseBoard', 'type': 6}
	];

	$scope.show_ruta1 = false;
	$scope.show_ruta2 = false;
	$scope.show_ruta3 = false;
	$scope.show_codigo_tercero = false;
	$scope.show_tag_script = false;
	$scope.show_richMedia = false;
	$scope.show_buttons = false;
	$scope.preview_disabled = true;
	$scope.showBannerPreview = false;

	$scope.contenido = "<div><div><h3>Generador de código HTML para Publicidades Richmedia</h3></div><ol><li>Llena los campos </li><li>Genera el código</li><li>Copia y pega en el campo de HTML en OX</li></ol><div style='position:relative;z-index:1!important;'><div style='z-index:2!important;top:0px; height:400pxpx'><object  classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0' type='application/x-shockwave-flash' data='http://ox-i.eluniversal.com/06c/06ce6138-b4be-4c09-8e33-30011e74c154/cfb/cfbfa65a738245d09b88ed6d2d5b7470.swf' width='970' height='400'><param name='movie' value='http://ox-i.eluniversal.com/06c/06ce6138-b4be-4c09-8e33-30011e74c154/cfb/cfbfa65a738245d09b88ed6d2d5b7470.swf' /><param name='wmode' value='transparent' /><embed src='http://ox-i.eluniversal.com/06c/06ce6138-b4be-4c09-8e33-30011e74c154/cfb/cfbfa65a738245d09b88ed6d2d5b7470.swf' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='970' height='400'></embed></object></div></div></div>";

	$scope.generar_banner = function() {

		objetoParametros = {};

		switch($scope.type_banner) {
			case 0:
				objetoParametros.tipo = "bloque";
				objetoParametros.material1 = $scope.conversionMateriales($scope.model_ruta1,"970","90","px");
				objetoParametros.material2 = $scope.conversionMateriales($scope.model_ruta2,"420","800","px");
				objetoParametros.div = "richmedia_BP";
				$scope.mostrarResultados(objetoParametros);
				$scope.preview_disabled = false;
				break;
			case 1:
				objetoParametros.tipo = "superbanner";
				objetoParametros.material1 = $scope.conversionMateriales($scope.model_ruta1,"970","400","px");
				objetoParametros.div = "richmedia_SB";
				$scope.mostrarResultados(objetoParametros);
				$scope.preview_disabled = false;
				break;
			case 2:
				objetoParametros.tipo = "ventanaPremium";
				objetoParametros.material1 = $scope.conversionMateriales($scope.model_ruta1,"300","250","px");
				objetoParametros.material2 = $scope.conversionMateriales($scope.model_ruta2,"970","400","px");
				objetoParametros.material3 = $scope.conversionMateriales($scope.model_ruta3,"1400","700","px");
				objetoParametros.div = "richmedia_VP";
				$scope.mostrarResultados(objetoParametros);
				$scope.preview_disabled = false;
				break;
			case 3:
				objetoParametros.tipo = "sliderbar";
				objetoParametros.material1 = $scope.conversionMateriales($scope.model_ruta1,"990","90","px");
				objetoParametros.material2 = $scope.conversionMateriales($scope.model_ruta2,"950","550","px");
				objetoParametros.div = "richmedia_SL";
				$scope.mostrarResultados(objetoParametros);
				$scope.preview_disabled = false;
				break;
			case 4:
				objetoParametros.tipo = "thirdParty";
				objetoParametros.material1 = $scope.model_codigoTercero;
				$scope.mostrarResultados(objetoParametros);
				$scope.preview_disabled = false;
				break;
			case 5:
				objetoParametros.tipo = "superbanner_script";
				objetoParametros.material1 = $scope.model_tagScript;
				objetoParametros.div = "richmedia_SBS";
				$scope.mostrarResultados(objetoParametros);
				$scope.preview_disabled = false;
				break;
			case 6:
				objetoParametros.tipo = "baseboard";
				objetoParametros.material1 = $scope.conversionMateriales($scope.model_ruta1,"990","90","px");
				objetoParametros.material2 = $scope.conversionMateriales($scope.model_ruta2,"500","300","px");
				objetoParametros.div = "richmedia_BB";
				$scope.mostrarResultados(objetoParametros);
				$scope.preview_disabled = false;
				break;
			default:
		}

	}

	$scope.objectToJson = function(mapa){

		jsonFinal = JSON.stringify(mapa);
		return jsonFinal;

	}

	$scope.generarPreviewBanner = function(){

		$scope.showBannerPreview = true;
		scriptRichmedia = document.createElement('script');
		divRichMedia = document.createElement('div');
		divRichMedia.id = objetoParametros.div;
		dataJsonBanner =  document.createElement('script');
		dataJsonBanner.text='var jsonRichMedia = '+jsonFinal+';jsonRichMedia.destino = "http://www.eluniversal.com";';
		scriptRichmedia.onload = function() {
			document.getElementById('iframeTest').contentWindow.eval($('#iframeTest').contents().find("body")[0].getElementsByTagName('script')[0].text);
			document.getElementById('iframeTest').contentWindow.eval(alert(jsonRichMedia));
			alert("Script loaded and ready");
		};
		scriptRichmedia.src = "http://static.eluniversal.com/js/eu4/richMedia.js";
		$('#iframeTest').contents().find("head")[0].appendChild(scriptRichmedia);
		$('#iframeTest').contents().find("body")[0].appendChild(divRichMedia);
		$('#iframeTest').contents().find("body")[0].appendChild(dataJsonBanner);

	}

	$scope.mostrarResultados = function (objetoParametro){

		if (objetoParametro.urlVistaCliente != "" && objetoParametro.urlVistaCliente != undefined)  {
			objetoParametro.urlVistaCliente = '<img src="' + objetoParametro.urlVistaCliente + '" id=impRichMediaClient>';
		}else{	
			objetoParametro.urlVistaCliente = "";
		}

		if(objetoParametro.tipo=="thirdParty")	{
			$scope.model_richMedia = objetoParametro.html + "<scr" + "ipt type='text/javascript'>var src = 'http://static.eluniversal.com/js/eu4/richMedia.js';var script = document.createElement('script');script.src=src;document.getElementsByTagName('head')[0].appendChild(script);script.onload = function(){var clickUrl='{clickurl}';thirdBannerClick(clickUrl);};</scr" + "ipt>"
			}else if(objetoParametro.tipo=="superbanner_script")	{
				$scope.model_richMedia = "<div id='richmedia_SBS'>"+$scope.model_tagScript+" </div> <scr" + "ipt type='text/javascript' src='http://static.eluniversal.com/js/eu4/richMedia.js'></scr" + "ipt><scr" + "ipt>var clickUrl='{clickurl}';var jsonRichMedia = "+$scope.objectToJson(objetoParametro)+";jsonRichMedia.destino = clickUrl;validarRichMedia(jsonRichMedia); </scr" + "ipt>";
		}else{
			$scope.model_richMedia = "<div id='"+objetoParametro.div+"'></div><scr" + "ipt type='text/javascript' src='http://static.eluniversal.com/js/eu4/richMedia.js'></scr" + "ipt><scr" + "ipt>var clickUrl='{clickurl}';var jsonRichMedia = "+$scope.objectToJson(objetoParametro)+";jsonRichMedia.destino = clickUrl;validarRichMedia(jsonRichMedia); </scr" + "ipt>";
			}
	}

	$scope.conversionMateriales = function (material,w,h,medida){

		m1 = material.toLowerCase();
		if(m1 != null && m1 != "")
		{
			if(m1.indexOf(".swf")>-1){
				material = "<div style='position:relative;z-index:1!important;'><div style='z-index:2!important;top:0px; height:"+h+medida+"px'><object  classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0' type='application/x-shockwave-flash' data='" + material + "' width='"+w+"' height='"+h+"'><param name='movie' value='" + material + "' /><param name='wmode' value='transparent' /><embed src='" + material + "' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='"+w+"' height='"+h+"'></embed></object></div></div>";
			}
			else if(m1.indexOf(".jpg") >-1 || m1.indexOf(".ico") >-1 || m1.indexOf(".gif") >-1 || m1.indexOf(".png") >-1 || m1.indexOf(".bmp") >-1 ){
				material = "<img src='"+material+"' width='"+w+medida+"'; height='"+h+medida+"';/>";
				}
		}
		return material;

	}

	$scope.hide_all = function() {

		$scope.show_ruta1 = false;
		$scope.show_ruta2 = false;
		$scope.show_ruta3 = false;
		$scope.show_codigo_tercero = false;
		$scope.show_tag_script = false;
		$scope.show_contador_cliente = false;
		$scope.show_richMedia = false;
		$scope.preview_disabled = true;
	}

	$scope.clean_all = function() {

		$scope.model_richMedia = "";
		$scope.model_ruta1 = "";
		$scope.model_ruta2 = "";
		$scope.model_ruta3 = "";
		$scope.model_codigoTercero = "";
		$scope.model_tagScript = "";
		$scope.model_richMedia = "";
	}

	$scope.change_type = function() {

		switch($scope.type_banner) {
			case 0:
				$scope.hide_all();
				$scope.clean_all();
				$scope.show_ruta1 = true;
				$scope.show_ruta2 = true;
				$scope.show_contador_cliente = true;
				$scope.show_richMedia = true;
				$scope.show_buttons = true;
				$scope.preview_disabled = true;
				break;
			case 1:
				$scope.hide_all();
				$scope.clean_all();
				$scope.show_ruta1 = true;
				$scope.show_contador_cliente = true;
				$scope.show_richMedia = true;
				$scope.show_buttons = true;
				$scope.preview_disabled = true;
				break;
			case 2:
				$scope.hide_all();
				$scope.clean_all();
				$scope.show_ruta1 = true;
				$scope.show_ruta2 = true;
				$scope.show_ruta3 = true;
				$scope.show_contador_cliente = true;
				$scope.show_richMedia = true;
				$scope.show_buttons = true;
				$scope.preview_disabled = true;
				break;
			case 3:
				$scope.hide_all();
				$scope.clean_all();
				$scope.show_ruta1 = true;
				$scope.show_ruta2 = true;
				$scope.show_contador_cliente = true;
				$scope.show_richMedia = true;
				$scope.show_buttons = true;
				$scope.preview_disabled = true;
				break;
			case 4:
				$scope.hide_all();
				$scope.clean_all();
				$scope.show_codigo_tercero = true;
				$scope.show_richMedia = true;
				$scope.show_buttons = true;
				$scope.preview_disabled = true;
				break;$scope.preview_disabled = true;
			case 5:
				$scope.hide_all();
				$scope.clean_all();
				$scope.show_tag_script = true;
				$scope.show_richMedia = true;
				$scope.show_buttons = true;
				$scope.preview_disabled = true;
				break;
			case 6:
				$scope.hide_all();
				$scope.clean_all();
				$scope.show_ruta1 = true;
				$scope.show_ruta2 = true;
				$scope.show_contador_cliente = true;
				$scope.show_richMedia = true;
				$scope.show_buttons = true;
				$scope.preview_disabled = true;
				break;
			default:
				$scope.hide_all();
				$scope.clean_all();
		}
	}

}]);

bannerAdministration.controller('administratorController', ['$scope', function($scope) {
	
}]);

bannerAdministration.controller('previewController', ['$scope', '$sce', '$http', function($scope, $sce, $http) {

	$scope.bannerData = "";
	$scope.showBannerData = false;
	
	$scope.generarPreview = function(){
		$http.get("http://ox-d.eluniversal.com/w/1.0/acj?auid="+$scope.model_AdUnitId+"")
		.success(function(data){
			//código en caso de éxito
			$('#testContainer').html('');
			$('#testContainer').append("<div id="+$scope.model_AdUnitId+"></div>")
			$scope.bannerData = data.ads.adunits[0];
			var OX_Banner = OX();
			OX_Banner.addAdUnit($scope.model_AdUnitId);
			OX_Banner.setAdUnitSlotId($scope.model_AdUnitId,$scope.model_AdUnitId);
			OX_Banner.load();
			$scope.showBannerData = true;
		});
	}

}]);

