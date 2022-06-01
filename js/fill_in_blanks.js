alert('first li length = '+$('#optionsFiB').children().eq(1).html());
// populate text and answers with arrays from script in html file
$(function () {
    $(".ans").click(function () {
        // send li back to list and set answer blank sortable
        if ($(this).children().length == 1) {
            var tspanElem = $(this).find(":first-child").detach();
            $("#optionsFiB").append(tspanElem);
        }
        $(this).css({ 'background-color': 'white', 'color': 'blue' });
    });
    let max = 0;
    $("#optionsFiB>li").each(function() {
        // alert(max);
        max = $(this).width() > max ? $(this).width() : max;
      });
      $(".ans, #optionsFiB>li, #optionsFiB>li:hover").css('width',''+(max/10)+'vw');
});

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
// Same as statement-justification.js shuffle functions
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

function checker() {
    let str = 'All correct!';
    let count = $('.ans').length;
    let inc = 0;
    $(".ans").each(function () {
        // alert($(this).html());
        if ($(this).attr('value') == $(this).html().slice(12, 14)) {
            $(this).css({ 'background-color': '#3193F5', 'color': 'white' });
        }
        else {
            $(this).css({ 'background-color': '#FFD364', 'color': 'red' });
            inc++;

        }
    });
    if (inc == 1) {
        str = '' + inc + ' answer out of the ' + count + ' required answers is incorrect.'
    }
    else if (inc > 0) {
        str = '' + inc + ' answers are incorrect out of the ' + count + ' required answers.'
    }

    $("#chkOrder").html(str);
}
