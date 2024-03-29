let interval;
function timerFunction(e) {
  $(function () {
    let e = $(".acces_rapides_item"),
      t = 0;
    interval = setInterval(function () {
      t < e.length
        ? e.eq(t++).addClass("mui-enter-active")
        : clearInterval(interval);
    }, 200);
  });
}
function playTimer() {
  timerFunction();
}
function stopTimer() {
  clearInterval(interval);
}
$(document).foundation(),
  $(document).bind("_js_ready", function () {
    let e = $("#popin_menu");
    e.on("closed.zf.reveal", function () {
      $(".hamburger").removeClass("is-active");
    }),
      e.on("open.zf.reveal", function () {
        $(".hamburger").addClass("is-active");
      }),
      $("#menu_principal .submenu-toggle").on("click", function () {
        let e = $(this).parent("li");
        e.hasClass("is-active")
          ? e.removeClass("is-active")
          : e.addClass("is-active");
      });
    let t = $("#offCanvasLeft");
    t.on("opened.zf.offcanvas", function () {
      $("#smart_menu .menu").on("open.zf.drilldown", function () {
        $(".is-drilldown-submenu-parent[aria-expanded='true']")
          .parent("ul")
          .scrollTop(0)
          .addClass("overflow");
      }),
        $(".hamburger").addClass("is-active");
    }),
      $(".js-drilldown-back a").on("click", function () {
        $(this)
          .parent("li")
          .parent("ul")
          .parent("li")
          .parent("ul")
          .scrollTop(0)
          .removeClass("overflow");
      }),
      t.on("closed.zf.offcanvas", function () {
        $(".hamburger").removeClass("is-active"),
          $(".is-drilldown-submenu-parent")
            .attr("aria-expanded", "false")
            .parent("ul")
            .scrollTop(0)
            .removeClass("overflow"),
          $("#offCanvasLeft ul").scrollTop(0).removeClass("overflow");
      });
  }),
  (deleteAutocomplete = function () {
    void 0 !== $("#main_search").autocomplete("instance") &&
      $("#main_search").autocomplete("destroy"),
      $("#suggestions-list").removeClass("hide");
  }),
  (bindAutocomplete = function () {
    var e = !1;
    $("#main_search").autocomplete({
      appendTo: "#autocomplete_results",
      create: function () {
        ($(this).data("ui-autocomplete")._renderItem = function (e, t) {
          return $("<li>")
            .append(
              $("<a>")
                .removeAttr("style")
                .removeAttr("class")
                .addClass("grid-x grid-padding-x align-justify align-middle")
                .attr("href", t.value)
                .attr("title", t.label)
                .attr("data-counter-url-search", t.counter_url_search)
                .append(
                  $("<span>").addClass("resultat cell auto").append(t.label)
                )
                .append(
                  $("<span>").addClass("categories cell shrink").append(t.type)
                )
            )
            .appendTo(e);
        }),
          ($(this).data("ui-autocomplete")._renderMenu = function (e, t) {
            $(e).removeAttr("class").removeAttr("style").removeAttr("tabindex");
            var i = this;
            $.each(t, function (t, o) {
              i._renderItemData(e, o);
            });
          });
      },
      select: function (t, i) {
        return (e = !0), !1;
      },
      focus: function (e, t) {
        return !1;
      },
      response: function (e, t) {},
      source: function (e, t) {
        $.ajax({
          dataType: "json",
          url: $("#tx_indexedsearch").attr("action"),
          data: {
            q: e.term,
            type: 889,
            tx_cimelastic_search: {
              action: "autocomplete",
              controller: "Search",
            },
            elementId: $("#tx_indexedsearch").attr("data-element-id"),
          },
          success: function (i) {
            $("#autocomplete_results li").remove(),
              $("#suggest_title").addClass("hide"),
              $("#suggestions-list").addClass("hide"),
              $("#suggestions_no_results").addClass("hide"),
              $("#show_more_results").addClass("hide"),
              $("#suggestions_no_results_corrected").addClass("hide"),
              $("#suggestions_results_but_suggest").addClass("hide"),
              0 === i.length && void 0 === i.correctedWord
                ? $("#suggestions_no_results").removeClass("hide")
                : void 0 !== i.correctedWord
                ? ($("#result_title").removeClass("hide"),
                  $("#searchedWord").html(e.term),
                  $("#correctedWord").html(i.correctedWord),
                  $("#suggestions_no_results_corrected").removeClass("hide"),
                  $("#show_more_results a").attr(
                    "href",
                    $("#tx_indexedsearch").attr("action") +
                      "?q=" +
                      i.correctedWord
                  ),
                  $("#show_more_results").removeClass("hide"))
                : void 0 !== i.suggestedWord
                ? ($("#result_title").removeClass("hide"),
                  $("#suggestedWord").html(
                    $("<a>")
                      .attr(
                        "href",
                        $("#tx_indexedsearch").attr("action") +
                          "?q=" +
                          i.suggestedWord
                      )
                      .text(i.suggestedWord)
                  ),
                  $("#suggestions_results_but_suggest").removeClass("hide"),
                  $("#show_more_results a").attr(
                    "href",
                    $("#tx_indexedsearch").attr("action") +
                      "?q=" +
                      $("#main_search").val()
                  ),
                  $("#show_more_results").removeClass("hide"))
                : ($("#result_title").removeClass("hide"),
                  $("#show_more_results").removeClass("hide"),
                  $("#show_more_results a").attr(
                    "href",
                    $("#tx_indexedsearch").attr("action") +
                      "?q=" +
                      $("#main_search").val()
                  )),
              t(i.data);
          },
        });
      },
      open: function () {
        $("#suggestions").removeClass("hide"),
          $("#suggestions-list").addClass("hide"),
          $(this).autocomplete("widget").removeAttr("style");
      },
      close: function () {
        return $("#main_search").val().length > 1
          ? ($("#autocomplete_results ul").show(), !1)
          : e
          ? ($("#suggestions").addClass("hide"), !1)
          : ($("#show_more_results").addClass("hide"),
            $("#suggestions_results_but_suggest").addClass("hide"),
            $("#result_title").addClass("hide"),
            $("#suggest_title").removeClass("hide"),
            $("#suggestions_no_results").addClass("hide"),
            void $("#suggestions-list").removeClass("hide"));
      },
      minLength: 2,
    });
  }),
  (bindListAutoComplete = function () {
    $.widget("custom.combobox", {
      _create: function () {
        (this.wrapper = $("<span>")
          .addClass("custom-combobox")
          .insertAfter(this.element)),
          this.element.hide(),
          this._createAutocomplete(),
          this._createShowAllButton(),
          this.input.attr("placeholder", this.element.attr("title")),
          this.input.focus().blur();
      },
      _createAutocomplete: function () {
        let e = this.element.children(":selected"),
          t = e.val() ? e.text() : "",
          i = this.element.attr("id");
        this.element.removeAttr("id", ""),
          (this.input = $("<input>")
            .appendTo(this.wrapper)
            .val(t)
            .removeAttr("title", "")
            .attr("id", i)
            .addClass(
              "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left"
            )
            .autocomplete({
              delay: 0,
              minLength: 0,
              source: $.proxy(this, "_source"),
              messages: {
                noResults: "Aucun résultat correspondant",
                results: function (e) {
                  return (
                    e +
                    (e > 1
                      ? " résultats sont disponibles"
                      : " résultat disponible") +
                    ", utilisez les flèches haut et bas pour naviguer"
                  );
                },
              },
            })
            .tooltip({ classes: { "ui-tooltip": "ui-state-highlight" } })),
          this._on(this.input, {
            autocompleteselect: function (e, t) {
              (t.item.option.selected = !0),
                this._trigger("select", e, { item: t.item.option });
            },
            autocompletechange: "_removeIfInvalid",
          });
      },
      _createShowAllButton: function () {
        let e = this.input,
          t = !1;
        $("<a>")
          .attr("tabIndex", -1)
          .attr("title", "Afficher tous les éléments")
          .tooltip()
          .appendTo(this.wrapper)
          .button({ icons: { primary: "ui-icon-triangle-1-s" }, text: !1 })
          .removeClass("ui-corner-all")
          .addClass("custom-combobox-toggle ui-corner-right")
          .on("mousedown", function () {
            t = e.autocomplete("widget").is(":visible");
          })
          .on("click", function () {
            e.trigger("focus"), t || e.autocomplete("search", "");
          });
      },
      _source: function (e, t) {
        let i = new RegExp($.ui.autocomplete.escapeRegex(e.term), "i");
        t(
          this.element.children("option").map(function () {
            let t = $(this).text();
            if (this.value && (!e.term || i.test(t)))
              return { label: t, value: t, option: this };
          })
        );
      },
      _removeIfInvalid: function (e, t) {
        if (t.item) return;
        let i = this.input.val(),
          o = i.toLowerCase(),
          a = !1;
        this.element.children("option").each(function () {
          if ($(this).text().toLowerCase() === o)
            return (this.selected = a = !0), !1;
        }),
          a ||
            (this.input
              .val("")
              .attr("title", i + " Aucune valeur correspondante")
              .tooltip("open"),
            this.element.val(""),
            this._delay(function () {
              this.input.tooltip("close").removeAttr("title");
            }, 2500),
            void 0 !== this.input.autocomplete("instance") &&
              (this.input.autocomplete("instance").term = ""));
      },
      _destroy: function () {
        this.wrapper.remove(), this.element.show();
      },
    });
  }),
  $(document).bind("_js_ready", function () {
    bindListAutoComplete(), $("#combobox").combobox(), bindAutocomplete();
  });
let intervalList,
  the_element = $("#popin_acces_rapides");
function timerFunctionListSearch(e) {
  let t = $(".list_item:not(.mui-enter-active), .appear"),
    i = 0,
    o = setInterval(function () {
      i < t.length ? t.eq(i++).addClass("mui-enter-active") : clearInterval(o);
    }, 200);
}
function playTimerListSearch() {
  timerFunctionListSearch();
}
function stopTimerListSearch() {
  clearInterval(intervalList);
}
function focusing() {
  $(".list_item a").on("focusin", function () {
    $(this).parents(".list_item").addClass("focusing");
  }),
    $(".list_item:not(.poi) a").on("focusout", function () {
      $(this).parents(".list_item").removeClass("focusing");
    });
}
function focusing_ar() {
  let e = $(".acces_rapides a");
  e.on("focusin", function () {
    $(this).parents(".item_acces_rapide").addClass("focusing");
  }),
    e.on("focusout", function () {
      $(this).parents(".item_acces_rapide").removeClass("focusing");
    });
}
function place_popinarrow() {
  if (Foundation.MediaQuery.atLeast("large")) {
    let e = $("#popin_detail").offset().left;
    $(".wrap_arrow.to_right").css({
      left: e + $("#popin_detail").outerWidth(),
    }),
      $(".wrap_arrow.to_left").css({ left: e });
  }
}
function animate(e) {
  new Hunt(document.getElementsByClassName("act"), {
    enter: function (e) {
      e.classList.add("mui-enter-active");
    },
    leave: function (e) {
      e.classList.remove("mui-enter");
    },
    persist: !0,
    throttleInterval: 100,
  });
  if ($("#page").not("#page.list").length || $("#home")) {
    new Hunt(document.getElementsByClassName("mui-enter"), {
      enter: function (e) {
        e.classList.add("mui-enter-active");
      },
      leave: function (e) {
        e.classList.remove("mui-enter");
      },
      persist: !0,
      throttleInterval: 100,
    });
  }
  new Hunt(document.getElementsByClassName("active-title"), {
    enter: function (e) {
      e.classList.add("mui-enter-active");
    },
    leave: function (e) {
      e.classList.remove("mui-enter");
    },
    persist: !0,
    throttleInterval: 100,
  });
  let t = document.querySelectorAll("img.lazy"),
    i =
      (new Hunt(t, {
        enter: function (e) {
          e.src = e.dataset.src;
        },
      }),
      $("video.lazy")),
    o =
      (new Hunt(i, {
        enter: function (e) {
          e.dataset.src;
          let t = e.dataset.video,
            i = e.dataset.type;
          if (!e.querySelector("source")) {
            let o = document.createElement("source");
            o.setAttribute("src", t),
              o.setAttribute("type", i),
              e.appendChild(o);
          }
        },
        offset: 200,
      }),
      $(".external_vid.lazy:not(.video_appeared)")),
    a =
      (new Hunt(o, {
        enter: function (e) {
          let t = $(e),
            i = t.find(".element_to_remove"),
            o = t.find("img");
          t.hasClass("video_appeared") ||
            (t.hasClass("youtube") &&
              ($("<div>")
                .addClass("youtube_player")
                .attr("title", t.find(".title_video").text())
                .attr("data-videoID", o.attr("data-videoID"))
                .attr("data-width", o.attr("data-width"))
                .attr("data-height", o.attr("data-height"))
                .attr("data-theme", o.attr("data-theme"))
                .attr("data-rel", o.attr("data-rel"))
                .attr("data-controls", o.attr("data-controls"))
                .attr("data-showinfo", o.attr("data-showinfo"))
                .attr("data-autoplay", o.attr("data-autoplay"))
                .attr("data-mute", o.attr("data-mute"))
                .appendTo(t),
              i.remove(),
              t.addClass("video_appeared")),
            t.hasClass("vimeo") &&
              ($("<div>")
                .addClass("vimeo_player")
                .attr("title", t.find(".title_video").text())
                .attr("data-videoID", o.attr("data-videoID"))
                .attr("data-width", o.attr("data-width"))
                .attr("data-height", o.attr("data-height"))
                .appendTo(t),
              i.remove(),
              t.addClass("video_appeared")),
            t.hasClass("dailymotion") &&
              ($("<div>")
                .addClass("dailymotion_player")
                .attr("title", t.find(".title_video").text())
                .attr("data-videoID", o.attr("data-videoID"))
                .attr("data-width", o.attr("data-width"))
                .attr("data-height", o.attr("data-height"))
                .appendTo(t),
              i.remove(),
              t.addClass("video_appeared")),
            void 0 !== tarteaucitron &&
              tarteaucitron.job.forEach(function (e) {
                tarteaucitron.job.push(e);
              }));
        },
        offset: 200,
      }),
      $(".slick-slide.slick-current + .slick-slide .external_vid img")),
    n =
      (new Hunt(a, {
        enter: function (e) {
          e.src = e.dataset.src;
        },
        offset: 200,
      }),
      $(".bloc_video_cont.slick-slide.slick-current")
        .prevAll(".slick-slide")
        .slice(0, 1)
        .find(".external_vid img"));
  new Hunt(n, {
    enter: function (e) {
      e.src = e.dataset.src;
    },
    offset: 200,
  });
}
the_element.on("open.zf.reveal", function () {
  $(this).addClass("open"),
    playTimer(),
    $("#popin_acces_rapides #acces_rapides").addClass("mui-enter-active");
}),
  the_element.on("closed.zf.reveal", function () {
    $(this).removeClass("open"),
      stopTimer(),
      $(
        "#popin_acces_rapides .acces_rapides_item, #popin_acces_rapides #acces_rapides"
      ).removeClass("mui-enter-active");
  }),
  $(document).bind("_js_ready", function () {
    playTimerListSearch();
  }),
  $(document).bind("_js_ready", function () {
    const e = $("#main"),
      t = $("#home #main");
    function i() {
      if (Foundation.MediaQuery.atLeast("large")) {
        let i = $("#footer").outerHeight(),
          o = $(window).height();
        e.css({ "padding-bottom": i }), t.css({ "min-height": o });
      } else e.css({ "padding-bottom": "initial" }), t.css({ "min-height": "initial" });
    }
    i();
    const o = $(".off-canvas-content"),
      a = $("#offCanvasLeft");
    function n() {
      if (
        "small" == Foundation.MediaQuery.current ||
        "medium" == Foundation.MediaQuery.current
      ) {
        let e = $("#data-sticky-header").outerHeight();
        o.css({ "padding-bottom": e }),
          a.css({ height: $(window).height() - e });
      } else o.css({ "padding-bottom": "initial" }), a.css({ height: "auto" });
    }
    n(),
      $(window).on("resize", function () {
        i(), n();
      });
  }),
  $(document).bind("_js_ready", function () {
    function e() {
      let e = Math.abs(parseInt($("html").css("top"))),
        t = $(".dp1").offset().top,
        i = $(".dp1").innerHeight(),
        o = e + t + i;
      if (
        $(".dp1").offset().top + $(".datepicker:visible").innerHeight() >
        $(".reveal-overlay").innerHeight()
      ) {
        $(".datepicker:visible").innerHeight();
      } else {
      }
      $(".datepicker:visible").css({ top: o });
    }
    $(function () {
      window.prettyPrint && prettyPrint(),
        $(".dp1").fdatepicker({
          format: "dd/mm/yyyy",
          language: "fr",
          disableDblClickSelection: !0,
        });
    }),
      $(".dp1").length > 0 &&
        ($(".dp1").on("show", function () {
          e();
        }),
        $(window).on("resize", function () {
          e();
        }),
        $($("#popin_filters").parent(".reveal-overlay")).on(
          "scroll",
          function () {
            e();
          }
        ));
  }),
  $(document).bind("_js_ready", function () {
    $("#second_display").on("off.zf.toggler", function () {
      if (
        ($(".wrap_result").removeClass("list"),
        "small" != Foundation.MediaQuery.current)
      ) {
        $(".cs-loader").removeClass("hide"),
          setTimeout(function () {
            $(".cs-loader").addClass("hide");
          }, 2e3);
      }
      "small" == Foundation.MediaQuery.current
        ? ($("#first_display").addClass("is-hidden"),
          $("#second_display").removeClass("is-hidden"),
          $("#top_moteur #switch_display")
            .addClass("hide_map")
            .removeClass("show_map")
            .html("Masquer la carte"),
          $(".wrap_result").addClass("list"))
        : $("#second_display .sticky, #line_tools_moteur").foundation(
            "_calc",
            !0
          ),
        $("#switch_display")
          .text("Masquer la carte")
          .addClass("hide_map")
          .removeClass("show_map"),
        $("#second_display #loader_filters").css({ visibility: "hidden" });
    }),
      $("#second_display").on("on.zf.toggler", function () {
        if (
          ($(".wrap_result").addClass("list"),
          "small" != Foundation.MediaQuery.current)
        ) {
          $(".cs-loader").removeClass("hide"),
            setTimeout(function () {
              $(".cs-loader").addClass("hide");
            }, 2e3);
        }
        "small" == Foundation.MediaQuery.current &&
          ($("#first_display").removeClass("is-hidden"),
          $("#second_display").addClass("is-hidden"),
          $("#top_moteur #switch_display")
            .html("Afficher la carte")
            .addClass("show_map")
            .removeClass("hide_map"),
          $(".wrap_result").removeClass("list")),
          $("#switch_display")
            .text("Afficher la carte")
            .addClass("show_map")
            .removeClass("hide_map"),
          $("#second_display #loader_filters").css({ visibility: "visible" });
      });
  }),
  $(document).bind("_js_ready", function () {
    let e = $("#switch_filters"),
      t = $("#filters");
    function i() {
      "small" == Foundation.MediaQuery.current ||
      "medium" == Foundation.MediaQuery.current
        ? (e.text("Afficher les filtres"),
          t.on("off.zf.toggler", function () {
            e.text("Masquer les filtres");
          }),
          t.on("on.zf.toggler", function () {
            e.text("Afficher les filtres");
          }))
        : t.removeClass("close");
    }
    ("small" != Foundation.MediaQuery.current &&
      "medium" != Foundation.MediaQuery.current) ||
      t.addClass("close"),
      i(),
      $(window).on("resize", function () {
        i();
      });
  }),
  $(document).bind("_js_ready", function () {
    focusing();
  }),
  $(document).bind("_js_ready", function () {
    focusing_ar();
  }),
  $(document).bind("_js_ready", function () {
    $(
      ".ligne_form.checkbox input, .ligne_form.radio input, .powermail_field .checkbox input, .powermail_field .radio input"
    ).iCheck({
      checkboxClass: "icheckbox icheckbox_minimal",
      radioClass: "iradio iradio_minimal",
    });
  }),
  $(document).bind("_js_ready", function () {
    $("#popin_detail").on("open.zf.reveal", function () {
      place_popinarrow(),
        $(window).on("resize", function () {
          place_popinarrow();
        }),
        $("body").addClass("overflow"),
        $(".wrap_arrow").removeClass("is-hidden"),
        $(
          "#popin_detail #form_postuler, #popin_detail #col_right_popin, #popin_detail #commentaires_form_popin, #popin_detail #comment-list_popin"
        ).foundation(),
        $("#col_right_popin").on("off.zf.toggler", function () {
          $("#btn_col_right_popin").addClass("open"),
            $(".wrap_arrow, #popin_detail .close-button").addClass("hide"),
            $("#main").addClass("zindex");
        }),
        $("#col_right_popin").on("on.zf.toggler", function () {
          $("#btn_col_right_popin").removeClass("open"),
            $(".wrap_arrow, #popin_detail .close-button").removeClass("hide"),
            $("#main").removeClass("zindex");
        });
    }),
      $("#popin_detail").on("closed.zf.reveal", function () {
        "true" == $(this).attr("aria-hidden") &&
          ($("body").removeClass("overflow"),
          $(".wrap_arrow").addClass("is-hidden"));
      });
    $("#col_right").on("off.zf.toggler", function () {
      $("#col_right").scrollTop(0),
        $("#cont_btn_col_right").addClass("open"),
        $("#btn_col_right").text("Cacher les infos pratiques"),
        $("#main").addClass("zindex"),
        $("body").addClass("overflow"),
        $("#col_right, #col_right_inner").addClass("mui-enter-active"),
        animate(),
        setTimeout(function () {
          animate();
        }, 300),
        ("medium" != Foundation.MediaQuery.current &&
          "small" != Foundation.MediaQuery.current) ||
          $("#cont_btn_col_right, #cont_btn_col_right_popin").addClass("open");
    }),
      $("#col_right, #col_right_popin").on("on.zf.toggler", function () {
        $("#cont_btn_col_right, #cont_btn_col_right_popin").removeClass("open"),
          $("#btn_col_right, #btn_col_right_popin").text(
            "Voir les infos pratiques"
          ),
          $("#main").removeClass("zindex"),
          $("body").removeClass("overflow"),
          ("medium" != Foundation.MediaQuery.current &&
            "small" != Foundation.MediaQuery.current) ||
            $("#cont_btn_col_right, #cont_btn_col_right_popin").removeClass(
              "open"
            );
      });
  }),
  $(document).bind("_js_ready", function () {
    $(".popin_detail").on("open.zf.reveal", function () {
      let e = Math.abs(parseInt($("html").css("top")));
      $(".popin_detail .image_pop").on("open.zf.reveal", function () {
        let t =
          Math.abs($(".popin_detail").offset().top) +
          parseInt($(".popin_detail").css("top"));
        $("html").css({ top: e }),
          setTimeout(function () {
            $(".popin_detail")
              .parent(".reveal-overlay")
              .animate({ scrollTop: t }, 0);
          }, 0);
      }),
        $(".popin_detail .image_pop").on("closed.zf.reveal", function () {
          $("html").css({ top: e });
        });
    });
  }),
  $(document).bind("_js_load", function () {
    console.log("_js_load"), animate();
  }),
  $(document).bind("_js_ready", function () {
    $("#page.list").length ||
      $("#page.carto_tpl").length ||
      $(
        ".content_page p, .content_page li, .content_page h2, .content_page h3, .content_page h4, .content_page h5"
      ).addClass("active-title fade-in mui-enter"),
      console.log("_js_ready"),
      animate();
  }),
  $("#col_right_inner").scroll(function () {
    animate();
  }),
  $(document).bind("_js_ready", function () {
    $("#cookie_close").click(function (e) {
      $("#cookie_msg").hide(), $("#cookie_msg").addClass("display_none");
    });
  }),
  $(document).bind("_js_ready", function () {
    let e = $(".bloc_compl > button");
    e.focusin(function () {
      $(this).parent().addClass("hover");
    }),
      e.focusout(function () {
        $(this).parent().removeClass("hover");
      });
    let t = $(".bloc_compl ul");
    t.on("on.zf.toggler", function () {
      $(this).parent().addClass("act");
    }),
      t.on("off.zf.toggler", function () {
        $(this).hasClass("block") || $(this).parent().removeClass("act");
      });
    let i = $(".accordinception");
    i.on("on.zf.toggler", function () {
      console.log("inception open"), $(this).parent().addClass("open");
    }),
      i.on("off.zf.toggler", function () {
        console.log("inception close"), $(this).parent().removeClass("open");
      });
    let o = $(".btn_accordinception");
    if (
      (o.focusin(function () {
        $(this).parent().addClass("hover");
      }),
      o.focusout(function () {
        $(this).parent().removeClass("hover");
      }),
      $(".tx_cim_comarquage_ariane").length > 0)
    ) {
      $("#fil_ariane li:last-child").wrapInner(
        '<a href="' +
          $(".tx_cim_comarquage_ariane li:first-child a")
            .attr("href")
            .split("?")[0] +
          '"></a>'
      ),
        $(".tx_cim_comarquage_ariane").find("div").remove(),
        $(".tx_cim_comarquage_ariane li:first-child").remove();
      let e =
        '<li class="actif"><span class="show-for-sr">Page active : </span>' +
        $(".tx_cim_comarquage_ariane li").text() +
        "<span></li>";
      $("#fil_ariane li")
        .removeClass("actif")
        .children("a")
        .children("span")
        .remove(),
        $("#fil_ariane ul").append(e),
        $(".tx_cim_comarquage_ariane").remove();
    }
    if (
      $(".tx_cimcomarquage_content").length > 0 &&
      $("#ComarquageSectionTitle").length > 0
    ) {
      let e = $("#ComarquageSectionTitle").text();
      (document.title = e),
        $("#titre_page h1").text(e),
        $("#ComarquageSectionTitle").remove();
    }
  });
let params = {};
window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (e, t, i) {
  params[t] = i;
}),
  $(document).bind("_js_ready", function () {
    params["tx_felogin_pi1%5Bforgot%5D"] &&
      $("#popin_compte").foundation("open"),
      params["tx_felogin_pi1%5Bforgothash%5D"] &&
        $("#popin_compte").foundation("open"),
      params["tx_felogin_pi1%5Bbtlf%5D"] &&
        $("#popin_compte").foundation("open"),
      $("#login_status p").text().indexOf("incorrect") > -1 &&
        $("#popin_compte").foundation("open");
  }),
  $(document).bind("_js_ready", function () {
    $(".reveal").on("open.zf.reveal", function () {
      let e = $(this);
      e.is(":visible")
        ? makeFocusable(e)
        : e.one(
            "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
            function (t) {
              makeFocusable(e);
            }
          );
    });
  });
let makeFocusable = function (e) {
  let t = e.attr("id"),
    i = $("#" + t + " :focusable");
  i[0] && i[0].focus();
};
$(document).bind("_js_ready", function () {
  if ("line_tools_moteur" == $(location.href.split("#")[1]).selector) {
    let e = $("#" + location.href.split("#")[1]);
    e.length && $("html,body").animate({ scrollTop: e.offset().top - 10 }, 0);
  }
}),
  $(document).bind("_js_ready", function () {
    (function () {
      let e = window.navigator.userAgent,
        t = e.indexOf("MSIE");
      return t > 0
        ? parseInt(e.substring(t + 5, e.indexOf(".", t)))
        : navigator.userAgent.match(/Trident\/7\./)
        ? 11
        : 0;
    })() > 0 &&
      ($("body").prepend(
        '<div id="popin_navigateurs" class="reveal full open without-overlay" data-reveal data-animation-in="fade-in" data-animation-out="fade-out" aria-label="Fenêtre de navigateur obsolète"><div class="wrap grid-x grid-padding-x flex-dir-column align-center small-12"><p role="heading" aria-level="1">Votre navigateur est obsolète.</p><p>Nous vous recommandons de le remplacer.</p><h2>Télécharger des navigateurs plus récents</h2><ul class="grid-x grid-padding-x medium-up-3 small-up-1"><li class="cell"><div class="border_nav"><h3>Google Chrome</h3><div class="grid-x grid-padding-x align-center"><p class="cell"><a href="https://www.google.com/chrome/" target="_blank" title="Télécharger Google Chrome pour Windows (Nouvelle Fenêtre)">Windows </a></p></div></div></li><li class="cell"><div class="border_nav"><h3>Mozilla Firefox</h3><div class="grid-x grid-padding-x align-center"><p class="cell"><a href="https://www.mozilla.org/fr-FR/firefox/new/" target="_blank" title="Télécharger Mozilla Firefox pour Windows (Nouvelle Fenêtre)">Windows </a></p></div></div></li><li class="cell" ><div class="border_nav"><h3>Opera</h3><div class="grid-x grid-padding-x small-up-1"><p class="cell"><a href="https://www.opera.com/fr/download" target="_blank" title="Télécharger Opera pour Windows (Nouvelle Fenêtre)">Windows </a></p><p class="cell"><a href="https://m.opera.com/" target="_blank" title="Télécharger Opera pour Window Phone (Nouvelle Fenêtre)">Téléphone </a></p></div></div></li></ul></div></div>'
      ),
      $("body").css("overflow", "hidden"),
      $("#popin_navigateurs").foundation(),
      window.navigator.userAgent.match(/Windows NT 10.0/) &&
        ($("#popin_navigateurs .wrap").append(
          '<h2>Ouvrir la page avec Microsoft Edge</h2><div class="grid-x grid-padding-x medium-up-3 small-up-1"><div class="cell"><div class="border_nav"><h3 class="title_edge">Microsoft Edge</h3><div class="align-center"><button aria-label="Ouvrir la page avec Microsoft Edge">Windows </button></div></div></div></div>'
        ),
        $(".bloc_compat button").click(function () {
          window.open("microsoft-edge:" + document.location.href);
        })));
  });
let get_list_item_focus = function () {
    focusing();
  },
  item_focused = [],
  pop = !0,
  clic_arrow = function () {
    $(".to_left .arrows").on("click", function () {
      pop = !1;
      let e = item_focused.toString();
      item_focused.pop();
      let t = $(".list_item[data-uid = '" + e + "']")
        .prev()
        .attr("data-uid");
      item_focused.push(t);
    }),
      $(".to_right .arrows").on("click", function () {
        pop = !1;
        let e = item_focused.toString();
        item_focused.pop();
        let t = $(".list_item[data-uid = '" + e + "']")
          .next()
          .attr("data-uid");
        item_focused.push(t);
      });
  },
  close = function () {
    $("#popin_detail").on("closed.zf.reveal", function () {
      (pop = !0),
        $(".list_item[data-uid = '" + item_focused + "'] .titre a").focus();
    });
  },
  popfunction = function () {
    clic_arrow(),
      $("#popin_detail").on("closeme.zf.reveal", function () {
        if (1 == pop) {
          item_focused.pop();
          let e = $(".list_item.focusing").attr("data-uid");
          item_focused.push(e);
        }
      });
  };
function reinit_list_item_focus() {
  popfunction(), close();
}
$(document).bind("_js_ready", function () {}),
  $(document).bind("_js_ready", function () {
    $("#menu_principal .level2.has-submenu-toggle a span").each(function (e) {
      let t =
        $(this)
          .parent("a")
          .parent(".level2.has-submenu-toggle")
          .children("button")
          .children("span")
          .text() +
        " " +
        $(this).text();
      $(this)
        .parent("a")
        .parent(".level2.has-submenu-toggle")
        .children("button")
        .attr("title", t)
        .children("span")
        .text(t),
        $(this).parent("a").parent(".level2.has-submenu-toggle");
    });
  }),
  $(document).ready(function () {
    $(document).trigger("_js_ready"),
      $(document).trigger("_page_ready"),
      $(document).trigger("_page_ready_geo");
  }),
  $(window).on("load", function () {
    $(document).trigger("_js_load"),
      $(document).trigger("_social_stream_ready");
  });
//# sourceMappingURL=app.min.js.map
