// populate text and answers with list items (<li>) in html file
$(function () {
    // moves li between paragraph and answers
    $(".ans").click(function () {
        // send li back to list and set answer blank sortable
        if ($(this).children().length == 1) {
            var tspanElem = $(this).find(":first-child").detach();
            $("#optionsFiB").append(tspanElem);
        }
        $(this).css({ 'background-color': 'white', 'color': 'blue' });
    });
    // sets style sizes for ul and li elements
    let max = 0;
    $("#optionsFiB>li").each(function() {
        max = $(this).width() > max ? $(this).width() : max;
      });
      $(".ans, #optionsFiB>li, #optionsFiB>li:hover").css('width',''+(max/12) +'vw');
      $("#optionsFiB").css('min-height', $("#optionsFiB").height());
});
// makes answers and blanks sortable/draggable
$(function () {
    $("#optionsFiB,span").sortable({
        connectWith: "#optionsFiB,span",
        disabled: $("span").length == 1,
        receive: function (event, ui) {
            var list = $(this);
            if (list.attr('id') != "optionsFiB" && list.children().length == 2) {
                $("#optionsFiB").append(list.find(":nth-child(2)").detach());
            }
            list.css({ 'background-color': 'white', 'color': 'blue' });
        },
        stop: function (event, ui) {
            var children = $(this)
                .sortable('refreshPositions')
                .children();
        }
    });
});
// shuffle li elements in ul -- needs shuffleNodes(e) function call
// https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order
// Same as statement_justification.js shuffle functions
function shuffle(items) {
    var cached = items.slice(0), temp, i = cached.length, rand;
    while (--i) {
        rand = Math.floor(i * Math.random());
        temp = cached[rand];
        cached[rand] = cached[i];
        cached[i] = temp;
    }
    return cached;
}
// shuffle li elements in ul
function shuffleNodes(e) {
    let listli = document.getElementById(e);
    var nodes = listli.children, i = 0;
    nodes = Array.prototype.slice.call(nodes);
    nodes = shuffle(nodes);
    while (i < nodes.length) {
        listli.appendChild(nodes[i]);
        ++i;
    }
}
// checks for correct answers in correct blanks
function checker() {
    let str = 'All correct!';
    let count = $('.ans').length;
    let inc = 0;
    // sets style for correct and incorrect answers in blanks
    $(".ans").each(function () {
        if ($(this).attr('value') == $(this).html().slice(12, 14)) {
            $(this).css({ 'background-color': '#3193F5', 'color': 'white' });
        }
        else {
            $(this).css({ 'background-color': '#FFD364', 'color': 'red' });
            inc++;
        }
    });
    // counts incorrect anxwers
    // English single
    if (inc == 1) {
        str = '' + inc + ' answer out of the ' + count + ' required answers is incorrect.'
    }
    // English multiple 
    else if (inc > 0) {
        str = '' + inc + ' answers are incorrect out of the ' + count + ' required answers.'
    }
    $("#chkOrder").html(str);
}