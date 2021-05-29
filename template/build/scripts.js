"use strict";function setCookie(name,value,exdays){var date=new Date();exdays=parseInt(exdays)||365;date.setTime(date.getTime()+exdays*24*60*60*1000);var expires='expires='+date.toUTCString();document.cookie=name+'='+value+';'+expires+';path=/';}function getCookie(name){name=name+'=';var decodedCookie=decodeURIComponent(document.cookie);var parts=decodedCookie.split(';');for(var i=0;i<parts.length;i++){var part=parts[i];while(part.charAt(0)===' '){part=part.substring(1);}if(part.indexOf(name)===0){return part.substring(name.length,part.length);}}return'';}/* Image popup */jQuery(function($){if(typeof $.fn.fancybox!=='undefined'){$('section').each(function(){var section=$(this);section.on('init',function(){var gallery=$('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]',this);var videos=$('a[href*="youtube.com"], a[href*="vimeo.com"]',this);gallery.off('click').on('click',function(e){$.fancybox.open(gallery,{infobar:true},gallery.index(this));e.preventDefault();return false;});videos.fancybox();});section.trigger('init');});}});/* Form processing */jQuery(function($){$('.form_box form, form.form_box, form.comment-form').each(function(){var form=$(this),message,button=$('[type="submit"]',form);form.on('submit',function(e){var data=$(':input',form).serializeArray();var action='feedback';if(form.hasClass('comment-form')){action='comment';}if($('[name="action"]',form).length===0){data.push({name:'action',value:action});}data.push({name:'noncer',value:template.nonce});$.ajax({url:template.ajaxurl,data:data,type:'post',dataType:'json',beforeSend:function beforeSend(){button.prop('disabled',true).addClass('is_loading');},complete:function complete(){button.prop('disabled',false).removeClass('is_loading');},success:processResponse});e.preventDefault();e.stopPropagation();return false;});form.on('change','input:file',function(){var data=new FormData(),file=this;data.append('action','process_file');data.append(file.name,file.files[0]);$.ajax({url:template.ajaxurl,type:'post',data:data,dataType:'json',processData:false,contentType:false,beforeSend:function beforeSend(){button.prop('disabled',true).addClass('is_loading');},complete:function complete(){button.prop('disabled',false).removeClass('is_loading');},xhr:function xhr(){var xhr=new XMLHttpRequest();xhr.upload.addEventListener('progress',function(e){var percent=0;if(e.lengthComputable&&e.total){percent=Math.round(e.loaded/e.total*100);console.log('Uploading: '+percent+'%');}},false);return xhr;},success:processResponse});return false;});form.on('click','.remove',function(){var data=form.serializeArray();data.push({name:'action',value:'remove_file'});data.push({name:'filename',value:$(this).data('name')});data.push({name:'noncer',value:template.nonce});$.ajax({url:template.ajaxurl,data:data,type:'post',dataType:'json',beforeSend:function beforeSend(){button.prop('disabled',true).addClass('is_loading');},complete:function complete(){button.prop('disabled',false).removeClass('is_loading');},success:processResponse});});function processResponse(data){$('.error, .success',form).remove();if(data.link){window.location.href=data.link;}if(data.errors){for(var i in data.errors){if(data.errors.hasOwnProperty(i)){message=$('<div class="error">'+data['errors'][i]+'</div>');$('[name='+i+']',form).parents('.field').append(message);message.hide().slideDown();}}}if(data.files){for(var _i in data.files){if(data.files.hasOwnProperty(_i)){var field=$('[name='+_i+']',form).parents('.field');field.siblings('.notify').slideUp(400,function(){$(this).remove();});message=$('<div class="notify">'+data['files'][_i]+'</div>');field.after(message);message.hide().slideDown();}}}if(data.text){message=$('<div class="success">'+data.text+'</div>');form.append(message);message.hide().slideDown();form[0].reset();}}});});jQuery(function($){$('.header_box').each(function(){var wrapper=$(this),submenus=$('.submenu',wrapper);$('.menu_btn',wrapper).click(function(){wrapper.toggleClass('is_menu');});submenus.click(function(e){var submenu=$(this);if(window.innerWidth<=1024){submenu.siblings('.submenu').removeClass('is_expanded').children('ul').slideUp();submenu.toggleClass('is_expanded').children('ul').slideToggle(400,function(){if(this.style.display==='none'){this.style.removeProperty('display');}});}else{submenus.removeClass('is_expanded');submenus.children('ul').each(function(){if(this.style.display==='none'){this.style.removeProperty('display');}});}if(e.target===this){e.stopPropagation();return false;}});window.addEventListener('scroll',handleScroll);handleScroll();function handleScroll(){var offset=wrapper.offset().top+40;if(window.pageYOffset>offset){wrapper.addClass('is_compact');}else{wrapper.removeClass('is_compact');}}});});/* Modal windows */jQuery(function($){var wrapper=$(document.body);$('[data-modal]').click(function(e){var modal=$(this).data('modal');if(modal){$('#modal_'+modal).trigger('show');}});$('a[href^="#modal_"]').click(function(e){$($(this).attr('href')).trigger('show');e.preventDefault();});wrapper.on('close','.modal_box',function(){$(this).removeClass('is_visible');unlockScroll();});wrapper.on('show','.modal_box',function(){$(this).addClass('is_visible');lockScroll();});wrapper.on('click','.modal_box',function(){$(this).trigger('close');});wrapper.on('click','.modal_box .modal',function(e){if($(e.target).is('.close, [data-close]')){$(this).trigger('close');}else{e.stopPropagation();}});$(document).keyup(function(e){if(e.which===27){$('.modal_box').trigger('close');}});});/* Smooth scroll */jQuery(function($){$('a[href*="#"]').click(function(){var href=this.href;var link=document.location.protocol+'//'+document.location.hostname+document.location.pathname;if(href&&href.indexOf('#')!==false){var parts=href.split('#');var selector='';if(parts.length>1&&link===parts[0]){selector=parts[1];}else if(parts.length===1){selector=parts[0];}if(selector){smoothScrollTo($('#'+selector));return false;}}});if(window.location.hash){smoothScrollTo($(window.location.hash));}});function smoothScrollTo(element,speed){var $=jQuery;speed=parseInt(speed)||1000;element=$(element);if(element.length>0){var offset=element.offset().top-scrollOffset();$('html, body').stop().animate({'scrollTop':offset},speed);}}function scrollOffset(){var header=jQuery('.header_box .header'),offset=header.height();if(document.body.classList.contains('admin-bar')){var width=window.innerWidth;if(width<=782&&width>=600){offset+=46;}else if(width>782){offset+=32;}}return offset;}jQuery(function($){if(typeof Flickity!=='undefined'){/* Set an equal height for the slides */Flickity.prototype._createResizeClass=function(){this.element.classList.add('flickity-resize');};Flickity.createMethods.push('_createResizeClass');var resize=Flickity.prototype.resize;Flickity.prototype.resize=function(){this.element.classList.remove('flickity-resize');resize.call(this);this.element.classList.add('flickity-resize');};$('.slider_box').each(function(){var wrapper=$(this),carousel=$('.slider',wrapper),buttons=$('.dots > span',wrapper),navigation=$('.arrow_prev, .arrow_next, .dots',wrapper),slides=carousel.children('.item');var args={wrapAround:true,prevNextButtons:false,pageDots:false,adaptiveHeight:false,cellSelector:'.item',imagesLoaded:true,cellAlign:'left',watchCSS:false};buttons.first().addClass('active');if(carousel.length>0&&slides.length>1){var flkty=new Flickity(carousel.get(0),args);$('.arrow_next',wrapper).click(function(){flkty.next();});$('.arrow_prev',wrapper).click(function(){flkty.previous();});buttons.click(function(){flkty.select($(this).index());});carousel.on('select.flickity',function(){buttons.removeClass('active').eq(flkty.selectedIndex).addClass('active');});$(window).on('load resize',init);init();function init(){flkty.options.draggable=carousel.outerWidth()<slides.outerWidth()*slides.length;if(flkty.options.draggable){navigation.removeAttr('style');}else{navigation.hide();}flkty.updateDraggable();flkty.resize();}}});}});jQuery(function($){$('.content > table').wrap('<div class="table_wrapper"></div>');});function lockScroll(){document.body.classList.add('is_locked');document.body.style.paddingRight=getScrollbarWidth()+'px';}function unlockScroll(){document.body.classList.remove('is_locked');document.body.style.paddingRight='0px';}function getScrollbarWidth(){var outer=document.createElement('div');var inner=document.createElement('div');outer.style.visibility='hidden';outer.style.overflow='scroll';outer.style.msOverflowStyle='scrollbar';outer.appendChild(inner);document.body.appendChild(outer);var scrollbarWidth=outer.offsetWidth-inner.offsetWidth;outer.parentNode.removeChild(outer);return scrollbarWidth;}function fixViewportHeight(){document.documentElement.style.setProperty('--vh',window.innerHeight/100+'px');}window.addEventListener('DOMContentLoaded',fixViewportHeight);window.addEventListener('orientationchange',fixViewportHeight);window.addEventListener('resize',fixViewportHeight);window.addEventListener('load',fixViewportHeight);
//# sourceMappingURL=scripts.js.map
