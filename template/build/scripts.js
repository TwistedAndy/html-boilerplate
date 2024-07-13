function initApp(){"function"==typeof jQuery&&jQuery('[class*="_box"]').trigger("tw_init",[jQuery]);let e=parseInt(window.innerWidth-document.documentElement.clientWidth);(isNaN(e)||e<0)&&(e=0),document.body.style.setProperty("--width-scrollbar",e+"px")}function runOnce(e,t,n){let o="tw_"+(t=t||"element")+"_loaded";return n>0&&setTimeout((function(){e[o]=!1}),n),!!e[o]||(e[o]=!0,!1)}function runLater(e,t){var n;return function(){clearTimeout(n),n=setTimeout(e.apply.bind(e,this,arguments),t)}}function smoothScrollTo(e,t){var n=jQuery,o=n("html, body");if(t=parseInt(t)||1e3,(e=n(e)).length>0){var i=e.offset().top-scrollOffset()-20;if(e.attr("id")){var a=o.scrollTop();window.location.hash=e.attr("id"),o.scrollTop(a)}o.stop().animate({scrollTop:i},t)}}function scrollOffset(){var e=jQuery(".header_box .header").height();if(document.body.classList.contains("admin-bar")){var t=window.innerWidth;t<=782&&t>=600?e+=46:t>782&&(e+=32)}return e}function lockScroll(){document.body.classList.add("is_locked")}function unlockScroll(){document.body.classList.remove("is_locked")}function setCookie(e,t,n){var o=new Date;n=parseInt(n)||365,o.setTime(o.getTime()+24*n*60*60*1e3);var i="expires="+o.toUTCString();document.cookie=e+"="+t+";"+i+";path=/"}function getCookie(e){e+="=";for(var t=decodeURIComponent(document.cookie).split(";"),n=0;n<t.length;n++){for(var o=t[n];" "===o.charAt(0);)o=o.substring(1);if(0===o.indexOf(e))return o.substring(e.length,o.length)}return""}function getCookieValue(e){return getCookie(e).split("|")||[]}function setCookieValue(e,t){return Array.isArray(t)||(t=[t]),setCookie(e,(t=t.filter((function(e){return e}))).join("|"),365)}function addCookieValue(e,t){var n=getCookieValue(e);n.push(t.toString()),setCookieValue(e,n)}function removeCookieValue(e,t){var n=getCookieValue(e);setCookieValue(e,n=n.filter((function(e){return e!==t})))}function hasCookieValue(e,t){return-1!==getCookieValue(e).indexOf(t)}document.addEventListener("rocket-DOMContentLoaded",initApp),document.addEventListener("DOMContentLoaded",initApp),window.addEventListener("rocket-load",initApp),window.addEventListener("load",initApp),jQuery(document).on("tw_init",".posts_box, .content_box",(function(e,t){"function"==typeof Carousel&&t(this).find(".carousel").each((function(){if(!runOnce(this,"carousel",100)){var e=t(this),n=e.data("carousel"),o={},i={infinite:!0,center:!1,transition:"slide",slidesPerPage:1,classes:{container:"carousel",viewport:"carousel-viewport",track:"carousel-track",slide:"item"},Dots:{classes:{list:"carousel-dots",isDynamic:"is-dynamic",hasDots:"has-dots",dot:"dot",isBeforePrev:"is-before-prev",isPrev:"is-prev",isCurrent:"is-current",isNext:"is-next",isAfterNext:"is-after-next"},dotTpl:'<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"></button>',dynamicFrom:3,minCount:3},Navigation:{classes:{container:"carousel-nav",button:"carousel-button",isNext:"is-next",isPrev:"is-prev"},nextTpl:"",prevTpl:""}};e.hasClass("gallery")&&(i.classes.slide="gallery-item",e.hasClass("gallery-columns-1")&&"undefined"!=typeof Thumbs&&(o={Thumbs:Thumbs},i.Dots=!1,i.Thumbs={type:"classic"})),e.on("refresh",(function(){n.reInit(i,o)})),"object"==typeof n?n.reInit(i,o):(n=new Carousel(this,i,o),e.data("carousel",n))}}))})),jQuery(document).on("tw_init",".comments_box",(function(e,t){t("[data-comments]",this).each((function(){if(!runOnce(this,"comments")){var e=t(this),n=e.data("comments"),o=e.parents(".comments_box"),i=o.find(".comments"),a=n.page===n.pages?-1:1;n.action="comment_list",n.noncer=tw_template.nonce,i.on("reset",(function(){i.children().remove(),n.page=1,e.trigger("click")})),e.on("click",(function(){n.page+=a,t.ajax(tw_template.ajaxurl,{type:"post",dataType:"html",data:n,beforeSend:function(){e.addClass("is_loading")}}).always((function(){e.removeClass("is_loading")})).done((function(a){if(a){var s=t(a).find(".comments").html();s?(i.append(t(s)),n.page<n.pages?e.removeClass("is_hidden"):e.addClass("is_hidden"),o.trigger("init")):e.addClass("is_hidden")}else e.addClass("is_hidden")}))}))}}))})),jQuery(document).on("tw_init",'[class*="_box"]',(function(e,t){"function"!=typeof Fancybox||runOnce(this,"fancybox")||(Fancybox.bind(this,'a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]',{groupAll:!0}),Fancybox.bind(this,'a[href*="youtube.com"], a[href*="youtu.be"], a[href*="vimeo.com"], a[href$="mp4"]',{}))})),jQuery(document).on("tw_init",'[class*="_box"]',(function(e,t){var n=t(this);(n=n.hasClass("form_box")&&!n.is("form")?t("form",this):t("form.form_box, form.comment-form",this)).not(".skip_processing").each((function(){if(!runOnce(this,"forms")){var e,n=t(this),o=t('[type="submit"]',n);n.on("submit",(function(e){var a=n.serializeArray();if(0===t('[name="action"]',n).length){var s="email_handler";n.hasClass("comment-form")&&(s="comment_add"),a.push({name:"action",value:s})}return a.push({name:"noncer",value:tw_template.nonce}),t.ajax(tw_template.ajaxurl,{data:a,type:"post",dataType:"json",beforeSend:function(){o.prop("disabled",!0).addClass("is_loading")}}).always((function(){o.prop("disabled",!1).removeClass("is_loading")})).done(i),e.preventDefault(),e.stopPropagation(),!1})),n.on("change","input:file",(function(){var e=new FormData;return e.append("action","email_attachment"),e.append(this.name,this.files[0]),t.ajax(tw_template.ajaxurl,{type:"post",data:e,dataType:"json",processData:!1,contentType:!1,beforeSend:function(){o.prop("disabled",!0).addClass("is_loading")},xhr:function(){var e=new XMLHttpRequest;return e.upload.addEventListener("progress",(function(e){var t=0;e.lengthComputable&&e.total&&(t=Math.round(e.loaded/e.total*100),console.log("Uploading: "+t+"%"))}),!1),e}}).always((function(){o.prop("disabled",!1).removeClass("is_loading")})).done(i),!1})),n.on("click",".remove",(function(){var e=n.serializeArray();e.push({name:"action",value:"email_remove"}),e.push({name:"filename",value:t(this).data("name")}),e.push({name:"noncer",value:tw_template.nonce}),t.ajax(tw_template.ajaxurl,{data:e,type:"post",dataType:"json",beforeSend:function(){o.prop("disabled",!0).addClass("is_loading")}}).always((function(){o.prop("disabled",!1).removeClass("is_loading")})).done(i)}))}function i(o){if(t(".error, .success",n).remove(),o.link&&o.link.length>0&&(window.location.href=o.link),o.errors)for(let i in o.errors)o.errors.hasOwnProperty(i)&&(e=t('<div class="error">'+o.errors[i]+"</div>"),t("[name="+i+"]",n).closest(".field").append(e),e.hide().slideDown());if(o.files)for(let a in o.files)if(o.files.hasOwnProperty(a)){var i=t("[name="+a+"]",n).closest(".field");i.siblings(".notify").slideUp(400,(function(){t(this).remove()})),e=t('<div class="notify">'+o.files[a]+"</div>"),i.after(e),e.hide().slideDown()}o.text&&o.text.length>0&&(e=t('<div class="success">'+o.text+"</div>"),n.append(e),e.hide().slideDown(),n[0].reset())}})),t(document.body).on("input change","textarea",(function(){this.style.minHeight="initial",this.style.minHeight=this.scrollHeight+"px"}))})),jQuery(document).on("tw_init",".header_box",(function(e,t){if(!runOnce(this,"header")){var n=t(this),o=t(".submenu",n);t(window).on("beforeunload pagehide",(function(){i(!1)})),n.on("click",".menu_btn",(function(e){i("is_menu",!0),e.preventDefault()})),n.on("click",".search_btn",(function(e){i("is_search",!0),e.preventDefault()})),n.nextAll("section").find(".fixed").first().attr("id","contents"),n.on("click",(function(e){e.target===this&&i(!1)})),o.each((function(){var e=t(this),n=t("> ul",e),i=t("> a",e),a=t("> .back",n);i.click((function(e){window.innerWidth<=1024&&e.preventDefault()})),0===a.length&&(a=t('<li class="back">'+i.text()+"</li>"),n.prepend(a)),e.click((function(t){o.removeClass("is_active is_parent"),window.innerWidth<=1024&&(e.addClass("is_active").parents(".submenu").addClass("is_active is_parent"),o.find(".sub-menu").scrollTop(0)),t.stopPropagation()})),a.click((function(t){e.removeClass("is_active").parents(".submenu").removeClass("is_parent"),t.stopPropagation()}))}))}function i(e,o){var i=["is_search","is_cart","is_search","is_menu"].filter((function(t){return t!==e}));n.removeClass(i.join(" ")),!e||n.hasClass(e)?(n.removeClass(e),"is_search"===e&&t('[name="s"]',n).blur(),unlockScroll()):(n.addClass(e),"is_search"===e&&t('[name="s"]',n).focus(),o&&lockScroll())}})),jQuery(document).on("tw_init",(function(e,t){if(!runOnce(this,"modals")){var n=t(document.body);t("[data-modal]").click((function(e){var n=t(this).data("modal");n&&t("#modal_"+n).trigger("show")})),t('a[href^="#modal_"]').click((function(e){t(t(this).attr("href")).trigger("show"),e.preventDefault()})),n.on("close",".modal_box",(function(){t(this).removeClass("is_visible"),unlockScroll()})),n.on("show",".modal_box",(function(){t(this).addClass("is_visible"),lockScroll()})),n.on("click",".modal_box",(function(){t(this).trigger("close")})),n.on("click",".modal_box .modal",(function(e){t(e.target).is(".close, [data-close]")?t(this).trigger("close"):e.stopPropagation()})),t(document).keyup((function(e){27===e.which&&t(".modal_box").trigger("close")}))}})),jQuery(document).on("tw_init",(function(e,t){if(runOnce(this,"sticky"))return;let n=t(".header_box.is_sticky"),o=t(".header_box").get(0);function i(){let e=0,t=0,i=[],s=[];if(n.each((function(){let e=window.getComputedStyle(this,null),t=e.getPropertyValue("position"),n=e.getPropertyValue("bottom"),o=e.getPropertyValue("top");if("fixed"!==t&&"sticky"!==t)return;let a={element:this,rect:this.getBoundingClientRect(),top:!1,bottom:!1};"fixed"===t?(o=parseInt(o.replace("px","")),n=parseInt(n.replace("px","")),o<=n?(a.top=o,i.push(a)):(a.bottom=n,s.unshift(a))):-1!==o.indexOf("px")?(a.top=parseInt(o.replace("px","")),i.push(a)):-1!==n.indexOf("px")&&(a.bottom=parseInt(n.replace("px","")),s.unshift(a))})),i.length>0&&i.sort((function(e,t){return e.rect.top-t.rect.top})),s.length>0&&s.sort((function(e,t){return t.rect.top-e.rect.top})),i.concat(s).forEach((function(n){var o=n.element,i=n.rect,a=!1,s=e+"px";!1!==n.top?(o.style.getPropertyValue("--height-top")!==s&&(o.style.setProperty("--height-top",s),n.top=parseInt(window.getComputedStyle(o,null).getPropertyValue("top").replace("px",""))||0,i=o.getBoundingClientRect()),Math.abs(n.top-i.top)<1&&(e+=i.height,a=window.scrollY>0)):!1!==n.bottom&&(s=t+"px",o.style.getPropertyValue("--height-bottom")!==s&&(o.style.setProperty("--height-bottom",s),n.bottom=parseInt(window.getComputedStyle(o,null).getPropertyValue("bottom").replace("px",""))||0,i=o.getBoundingClientRect()),Math.abs(window.innerHeight-i.height-i.top-n.bottom)<1&&(t+=i.height,a=!0)),!a&&o.classList.contains("is_fixed")?o.classList.remove("is_fixed"):a&&!o.classList.contains("is_fixed")&&o.classList.add("is_fixed")})),a(document.body,"--height-top",e+"px"),a(document.body,"--height-bottom",t+"px"),o){var r=o.getBoundingClientRect();r.y>0?a(document.body,"--header-offset",r.y+"px"):a(document.body,"--header-offset","0px")}}function a(e,t,n){e.style.getPropertyValue(t)!==n&&e.style.setProperty(t,n)}window.addEventListener("scroll",i),window.addEventListener("load",i),i()})),jQuery(document).on("tw_init",(function(e,t){t(".content > table").wrap('<div class="table"></div>')}));
//# sourceMappingURL=scripts.js.map
