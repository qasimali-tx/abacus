// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import $ from 'jquery'
import "channels"

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



  var options = {
    chart: {
      height: 270,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '85%'
        }
      }
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },

    series: [50, 25, 25, ],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      floating: false,
      fontSize: '13px',
      offsetX: 0,
      offsetY: 0,
    },
    labels: ["Mobile", "Tablet", "Desktop"],
    colors: ["#2a76f4", "rgba(42, 118, 244, .5)", "rgba(42, 118, 244, .18)"],

    responsive: [{
      breakpoint: 600,
      options: {
        plotOptions: {
          donut: {
            customScale: 0.2
          }
        },
        chart: {
          height: 240
        },
        legend: {
          show: false
        },
      }
    }],
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " %"
        }
      }
    }

  }

  var chart = new ApexCharts(
    document.querySelector("#ana_device"),
    options
  );

  chart.render();




  var colors = ['#98e7df', '#b8c4d0', '#bec7fa', '#ffe2a3', '#92e6f0'];
  var options = {
    series: [{
      name: 'Inflation',
      data: [4.0, 10.1, 6.0, 8.0, 9.1]
    }],
    chart: {
      height: 355,
      type: 'bar',
      toolbar: {
        show: false
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top', // top, center, bottom              
        },
        columnWidth: '20',
        distributed: true,
      },

    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#000"]
      }
    },
    colors: colors,
    xaxis: {
      categories: ["Email", "Referral", "Organic", "Direct", "Campaign", ],
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      },
    },

    grid: {
      padding: {
        left: 0,
        right: 0
      },
      strokeDashArray: 3,
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        }
      }

    },
  };

  var chart = new ApexCharts(document.querySelector("#barchart"), options);
  chart.render();
  $(".alert").delay(5000).slideUp(300);
})