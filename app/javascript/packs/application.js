// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import $ from 'jquery'
import "channels"
import Inputmask from "inputmask";

require("turbolinks").start()
require("jquery");
require("bootstrap");



require("metismenu");
import * as Waves from "./theme-js/waves"
import * as feather from "./theme-js/feather.min";

require("simplebar");
import * as moment from "moment";
require("./theme-js/daterangepicker/daterangepicker");
import * as ApexCharts from "apexcharts";

Rails.start()
Turbolinks.start()
ActiveStorage.start()

$(document).on('turbolinks:load', function() {
  function initDateRangrPicker() {
    if ($('#Dash_Date').length == 0) {
      return;
    }

    var picker = $('#Dash_Date');
    var start = moment();
    var end = moment();

    function cb(start, end, label) {
      var title = '';
      var range = '';

      if ((end - start) < 100 || label == 'Today') {
        title = 'Today:';
        range = start.format('MMM D');
      } else if (label == 'Yesterday') {
        title = 'Yesterday:';
        range = start.format('MMM D');
      } else {
        range = start.format('MMM D') + ' - ' + end.format('MMM D');
      }

      picker.find('#Select_date').html(range);
      picker.find('#Day_Name').html(title);
    }

    picker.daterangepicker({
      startDate: start,
      endDate: end,
      opens: 'left',
      applyClass: "btn btn-sm btn-primary",
      cancelClass: "btn btn-sm btn-secondary",
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
    }, cb);

    cb(start, end, '');
  }

  function initMetisMenu() {
    //metis menu
    $(".metismenu").metisMenu();
    $(window).resize(function () {
      initEnlarge();
    });
  }

  function initLeftMenuCollapse() {
    // Left menu collapse
    $('.button-menu-mobile').on('click', function (event) {
      event.preventDefault();
      $("body").toggleClass("enlarge-menu");
    });
  }

  function initEnlarge() {
    if ($(window).width() < 1300) {
      $('body').addClass('enlarge-menu enlarge-menu-all');
    } else {
      // if ($('body').data('keep-enlarged') != true)
      $('body').removeClass('enlarge-menu enlarge-menu-all');
    }
  }



  function initMainIconTabMenu() {
    $('.main-icon-menu .nav-link').on('click', function (e) {
      $("body").removeClass("enlarge-menu");
      e.preventDefault();
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      $('.main-menu-inner').addClass('active');
      var targ = $(this).attr('href');
      $(targ).addClass('active');
      $(targ).siblings().removeClass('active');
    });
  }


  function initActiveMenu() {
    // === following js will activate the menu in left side bar based on url ====
    $(".leftbar-tab-menu a, .left-sidenav a").each(function () {
      var pageUrl = window.location.href.split(/[?#]/)[0];
      if (this.href == pageUrl) {
        $(this).addClass("active");
        $(this).parent().addClass("active"); // add active to li of the current link                 
        $(this).parent().parent().addClass("in");
        $(this).parent().parent().addClass("mm-show");
        $(this).parent().parent().parent().addClass("mm-active");
        $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
        $(this).parent().parent().parent().addClass("active");
        $(this).parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link                
        $(this).parent().parent().parent().parent().parent().addClass("mm-active");
        var menu = $(this).closest('.main-icon-menu-pane').attr('id');
        $("a[href='#" + menu + "']").addClass('active');

      }
    });
  }

  function initFeatherIcon() {
    feather.replace()
  }



  function initMainIconMenu() {
    $(".navigation-menu a").each(function () {
      var pageUrl = window.location.href.split(/[?#]/)[0];
      if (this.href == pageUrl) {
        $(this).parent().addClass("active"); // add active to li of the current link
        $(this).parent().parent().parent().addClass("active"); // add active class to an anchor
        $(this).parent().parent().parent().parent().parent().addClass("active"); // add active class to an anchor
      }
    });
  }

  function initTopbarMenu() {
    $('.navbar-toggle').on('click', function (event) {
      $(this).toggleClass('open');
      $('#navigation').slideToggle(400);
    });

    $('.navigation-menu>li').slice(-2).addClass('last-elements');

    $('.navigation-menu li.has-submenu a[href="#"]').on('click', function (e) {
      if ($(window).width() < 992) {
        e.preventDefault();
        $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
      }
    });
  }

  function init() {
    initDateRangrPicker();
    initMetisMenu();
    initLeftMenuCollapse();
    initEnlarge();
    initMainIconTabMenu();
    initActiveMenu();
    initFeatherIcon();
    initMainIconMenu();
    initTopbarMenu();
    Waves.init();
  }

  init();


  // charts config

  var options = {
    chart: {
      height: 320,
      type: 'area',
      stacked: true,
      toolbar: {
        show: false,
        autoSelected: 'zoom'
      },
    },
    colors: ['#2a77f4', '#a5c2f1'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: [1.5, 1.5],
      dashArray: [0, 4],
      lineCap: 'round',
    },
    grid: {
      padding: {
        left: 0,
        right: 0
      },
      strokeDashArray: 3,
    },
    markers: {
      size: 0,
      hover: {
        size: 0
      }
    },
    series: [{
      name: 'New Visits',
      data: [0, 60, 20, 90, 45, 110, 55, 130, 44, 110, 75, 120]
    }, {
      name: 'Unique Visits',
      data: [0, 45, 10, 75, 35, 94, 40, 115, 30, 105, 65, 110]
    }],

    xaxis: {
      type: 'month',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },

    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    },
  }

  var chart = new ApexCharts(
      document.querySelector("#ana_dash_1"),
      options
  );

  chart.render();


  var colors = ['#98e7df', '#b8c4d0', '#bec7fa', '#ffe2a3', '#92e6f0'];

  var options = {
    series: [44, 55, 13, 43, 22],
    chart: {
      width: 380,
      type: 'pie',
    },
    colors: colors,
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };


  var chart = new ApexCharts(
      document.querySelector("#ana_device"),
      options
  );

  chart.render();




  var colors = ['#98e7df', '#b8c4d0', '#bec7fa', '#ffe2a3', '#92e6f0'];
  var options = {
    series: [{
      name: 'Website Blog',
      type: 'column',
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
    }, {
      name: 'Social Media',
      type: 'line',
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
    }],
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false,
        autoSelected: 'zoom'
      },
    },
    stroke: {
      width: [0, 4]
    },
    title: {
      text: 'Traffic Sources'
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1]
    },
    labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
    xaxis: {
      type: 'datetime'
    },
    yaxis: [{
      title: {
        text: 'Website Blog',
      },

    }, {
      opposite: true,
      title: {
        text: 'Social Media'
      }
    }]
  };
  var chart = new ApexCharts(document.querySelector("#barchart"), options);
  chart.render();
  $(".notification").fadeOut(6000);
  Inputmask({"mask": "9999 9999 9999 9999"}).mask($('#card_number'));
  Inputmask({"mask": "99/99"}).mask($("#exp_date"));
  Inputmask({"mask": "9999"}).mask($("#cvc"));
  Inputmask({"mask": "999999"}).mask($('#postal'));
})