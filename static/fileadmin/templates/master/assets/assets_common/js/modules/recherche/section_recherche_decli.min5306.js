let suggestions=$("#suggestions ul li a");function remove_tabindex(){suggestions.removeAttr("tabindex")}function add_tabindex(){suggestions.attr("tabindex","-1")}let focused_elt=function(e){let o=e.find("#main_search, input, .ui-menu-item a, #show_more_results a, #close_recherche").filter(":visible"),n=o.first(),r=o.last();r.on("keydown",function(e){9!==e.which||e.shiftKey||(e.preventDefault(),n.focus())}),n.on("keydown",function(e){9===e.which&&e.shiftKey&&(e.preventDefault(),r.focus())})},typewriterDefaultTexts=["Que recherchez-vous ?","Un service ?","Une information ?"],typewriterTexts=void 0!==$("#main_search").attr("data-texts")?$("#main_search").attr("data-texts").split("|"):typewriterDefaultTexts,placeholder_moteur=$("#header #main_search").placeholderTypewriter({delay:50,pause:1500,text:typewriterTexts});function recherche(){let n=!1;if("small"==Foundation.MediaQuery.current||"medium"==Foundation.MediaQuery.current){$("#zone_recherche").removeClass("is_search");let o=function(){$("#popin_recherche .wrap_popin .close-button").on("click",function(){$("#popin_recherche .wrap_popin").removeClass("is_search"),$("#popin_recherche #main_search").val(""),$("body").removeClass("is-reveal-open"),n=!1,add_tabindex()})},e=$("#popin_recherche");e.on("open.zf.reveal",function(){deleteAutocomplete(),remove_tabindex(),placeholder_moteur.destroy();var e=$("#header #zone_recherche");$("#popin_recherche .content > .cell").append(e),$("#popin_recherche #zone_recherche").removeClass("show-for-large"),$("#popin_recherche #open_search").removeClass("is-hidden"),$("#popin_recherche .content .close-button").addClass("is-hidden"),$("#popin_recherche #main_search").keyup(function(){1!=n&&($("#popin_recherche .wrap_popin").addClass("is_search"),$("body").addClass("is-reveal-open"),o(),n=!0)}),placeholder_moteur.init(),bindRecognition(),bindAutocomplete()}),e.on("closed.zf.reveal",function(){deleteAutocomplete(),add_tabindex();var e=$("#popin_recherche #zone_recherche");$("#header #header_recherche").append(e),$("#header #zone_recherche").addClass("show-for-large"),$("#header #zone_recherche #open_search").addClass("is-hidden"),$("#header #zone_recherche .content .close-button").removeClass("is-hidden"),o(),bindRecognition(),bindAutocomplete()})}else{let o=!1;$("#header #main_search").keyup(function(e){9!=e.keyCode&&16!=e.keyCode&&1!=o&&($("#zone_recherche").addClass("is_search"),$("#open_search").removeClass("is-hidden"),$("html").addClass("is-reveal-open"),$("#zone_recherche .close-button").on("click",function(){$("#zone_recherche").removeClass("is_search"),$("#open_search").addClass("is-hidden"),$("body").removeClass("is-reveal-open"),$("#header #main_search").val(""),$("html").removeClass("is-reveal-open"),$("main").css("z-index","1"),o=!1,$("#show_more_results").addClass("hide"),add_tabindex()}),remove_tabindex(),$("#zone_recherche.is_search #main_search").on("focusout",function(){focused_elt($("#zone_recherche.is_search"))}),o=!0)}),placeholder_moteur.init()}}$(document).bind("_js_ready",function(e){recherche()}),$(window).on("resize",function(){var e;placeholder_moteur.destroy(),"small"==Foundation.MediaQuery.current||"medium"==Foundation.MediaQuery.current?(e=$("#header #zone_recherche"),$("#popin_recherche .content > .cell").append(e),$("#popin_recherche #zone_recherche").removeClass("show-for-large"),$("#popin_recherche #open_search").removeClass("is-hidden"),$("#popin_recherche .content .close-button").addClass("is-hidden")):(e=$("#popin_recherche #zone_recherche"),$("#header #header_recherche").append(e),$("#header #zone_recherche").addClass("show-for-large"),$("#header #zone_recherche #open_search").addClass("is-hidden"),$("#header #zone_recherche .content .close-button").removeClass("is-hidden"),$("#close_recherche").removeClass("is-hidden")),recherche()});let SpeechRecognition,recognition,bindRecognition=function(){$("button.vocal").on("click",function(){recognition.abort(),$("#header #main_search").trigger("keyup"),$("button.vocal").addClass("vocalRecognitionOn"),recognition.start(),recognition.onresult=function(e){for(i=e.resultIndex;i<e.results.length;i++)$("#main_search, #main_search_elastic").val(e.results[i][0].transcript),$("#main_search, #main_search_elastic").focus(),$("#searchEngineForm").submit(),$("#main_search").autocomplete("search")},recognition.onspeechend=function(){recognition.stop(),$("#main_search").autocomplete("search"),$("button.vocal").removeClass("vocalRecognitionOn")},recognition.onerror=function(e){"not-allowed"==e.error&&alert("Vous n'avez pas autorisé l'utilisation du micro !"),console.log("Error occurred in recognition: "+e.error),$("button.vocal").removeClass("vocalRecognitionOn")}})};try{SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition,recognition=new SpeechRecognition,recognition.lang="fr-FR",recognition.interimResults=!0,bindRecognition()}catch(e){$("button.vocal").remove(),$("#bouton_recherche").addClass("noVocalRecognition")}