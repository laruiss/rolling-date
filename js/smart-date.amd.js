define(["jquery","moment","nanoscroller"],function(e,t){"use strict";!function(s){s(e,t,window,document)}(function(e,t,s,a,i){function n(){for(var e=new Date,t=e.getFullYear(),s=t-5,a=t+5,i=[];a>s;)i.push(s++);return i}function l(t,s){this.element=t,this.$el=e(this.element),this.options=e.extend({},h,s),this._defaults=h,this._name=o,console.log(this.options.locale),this.setLocale(this.options.locale),this.init()}var o="widgetDate",h={locale:"en"};l.prototype={init:function(){var t=this,a=new Date,i=a.getMonth()+1,l=a.getDate();this.selectedDay=10>l?"0"+l:l,this.selectedMonth=10>i?"0"+i:i,this.selectedYear=a.getFullYear(),this.currentYear=a.getFullYear(),this.lastYear=this.currentYear-1,this.availableYears=this.options.years||n(),this.createDateElements(),this.$el.attr("autocomplete","off"),this.$el.on("focus click",function(){t.placeWrapper()}),this.printSelectedDate(),this.checkInput(),e(s).on("click",function(s){var a=!1;e(s.target).parents().each(function(e,s){s===t.$dateWrapper.get(0)&&(a=!0)}),s.target===t.element||a||t.hideWrapper()}),this.$el.on("keyup",this.checkInput.bind(this))},checkInput:function(e){var t=this,s=t.element.value.replace(/(?:^|.*[\W])([a-zA-Z]+).*/i,"$1"),a=t.element.value.replace(/(?:^|.*[\W])([0-9]{1,2})(\W.*|$)/,"$1"),i=t.element.value.replace(/(?:^|.*[\W])([0-9]{4})(\W.*|$)/,"$1"),n=this.highlightMatches(t.$monthsElement,s);t.selectedMonth=n.length?n[0].data("id"):t.selectedMonth,n=this.highlightMatches(t.$daysElement,a,!0),t.selectedDay=n.length?n[0].data("id"):t.selectedDay,n=this.highlightMatches(t.$yearsElement,i,!0),t.selectedYear=n.length?n[0].data("id"):t.selectedYear,e&&13===e.which&&(e.preventDefault(),t.placeWrapper(),t.printSelectedDate(),t.element.focus()),e&&27===e.which&&(e.preventDefault(),t.hideWrapper())},highlightMatches:function(t,s,a){var i=[];return t.children().each(function(t,n){a?n.innerHTML===s&&i.push(e(n).addClass("widget-date-selected")):s&&n.innerHTML.toLowerCase().indexOf(s.toLowerCase())>-1?i.push(e(n).addClass("widget-date-selected")):e(n).removeClass("widget-date-selected")}),1===i.length&&this.scrollToSelection(i[0]),i},printSelectedDate:function(){var e=this.selectedYear+"-"+this.selectedMonth+"-"+this.selectedDay,s=t(e).format("LL");return this.$el.val(s),this},scrollToSelection:function(e){return e.siblings().removeClass("widget-date-selected"),e.parent().animate({scrollTop:e.addClass("widget-date-selected").position().top+e.parent().scrollTop()},500),this},createDateElements:function(){this.$monthsElement=e('<ul class="widget-date-list  widget-date-months  nano-content">');var s="";e.each(t.months(),function(e,t){e++,s+='<li data-id="'+(10>e?"0"+e:e)+'">'+t+"</li>"}),this.$monthsElement.append(s).on("click","li",function(t){this.selectedMonth=t.target.dataset.id,this.scrollToSelection(e(t.target)),this.printSelectedDate(),this.updateNumberOfDays()}.bind(this)),this.$yearsElement=e('<ul class="widget-date-list  widget-date-years  nano-content">').appendTo(e('<div class="nano  col-xs-3">'));var i="";return e.each(this.availableYears,function(e,t){i+='<li data-id="'+t+'">'+t+"</li>"}),this.$yearsElement.append(i).on("click","li",function(t){this.selectedYear=t.target.dataset.id,this.scrollToSelection(e(t.target)),this.printSelectedDate(),this.updateNumberOfDays()}.bind(this)),this.$daysElement=e('<ul class="widget-date-list  widget-date-days  nano-content">').appendTo(e('<div class="nano  col-xs-3">')),this.updateNumberOfDays(),this.$daysElement.on("click","li",function(t){this.selectedDay=t.target.dataset.id,this.scrollToSelection(e(t.target)),this.printSelectedDate()}.bind(this)),this.M=this.$monthsWrapper=e('<div class="nano  col-month">').append(this.$monthsElement),this.D=this.$daysWrapper=e('<div class="nano  col-day">').append(this.$daysElement),this.Y=this.$yearsWrapper=e('<div class="nano  col-year">').append(this.$yearsElement),this.$dateWrapper=e('<div class="widget-date-wrapper  row">').append(this[this.dateElementsOrder[0].charAt(0)]).append(this[this.dateElementsOrder[1].charAt(0)]).append(this[this.dateElementsOrder[2].charAt(0)]).appendTo(a.body),this},updateNumberOfDays:function(){for(var e="",s=t().month(parseInt(this.selectedMonth)).year(this.selectedYear).date(0).date(),a=1;s>=a;a++)e+='<li data-id="'+(10>a?"0"+a:a)+'">'+a+"</li>";this.$daysElement.html(e);this.checkInput()},hideWrapper:function(){this.$dateWrapper.removeClass("widget-date--active"),this.$el.trigger("date-picker:close")},placeWrapper:function(){var e=this.$el.offset();this.$dateWrapper.css({left:e.left+"px",width:this.$el.width()+parseInt(this.$el.css("paddingLeft"))+parseInt(this.$el.css("paddingRight"))+"px",top:e.top+this.$el.height()+parseInt(this.$el.css("borderTopWidth"))+parseInt(this.$el.css("borderBottomWidth"))+"px"}).addClass("widget-date--active"),s.setTimeout(function(){var e={flash:!0};this.$monthsElement.parent().nanoScroller(e),this.$daysElement.parent().nanoScroller(e),this.$yearsElement.parent().nanoScroller(e)}.bind(this),500),this.$el.trigger("date-picker:open")},setLocale:function(e){this.options.locale=e,t.locale(e),console.log("moment locale set",t.locale()),this.dateElementsOrder=t.localeData().longDateFormat("LL").split(" "),console.log("moment locale set",e,this.options.locale,t.locale(),this.dateElementsOrder)},getDate:function(){return new Date(this.selectedYear,this.selectedMonth-1,this.selectedDay)},storeMoment:function(){this.moment=t(this.getDate())},getMoment:function(){return this.storeMoment(),this.moment}},e.fn[o]=function(t){return this.each(function(){e.data(this,"plugin_"+o)||e.data(this,"plugin_"+o,new l(this,t))})}})});
