// some from: https://www.pureexample.com/ExampleTesterII-81.html li items draggable/sortable

// Number of statements in proof is required in html file
//initial height of step li
let stepHtInit = $("#step > li").eq(0).height();
var max = 0;
$(function () {
    $(".selOptBtn").click(function () {
        opts = parseInt($('input:radio:checked').val());
        $(".selGroup").prop('hidden', true);
        $("#instructions").prop('hidden', false);
        giddyup();
        setHeight();
    });
});
function setStJust() {
    setStatements("#statement_opt");
    setJustifications("#justification_opt");
    if (opts >0){
        $(".selGroup").prop('hidden', true);
    }
    else {
        $("#instructions").prop('hidden', true);
    }
}
// select the type of proof wanted and display page
function giddyup() {
    switch (opts) {
        case 1: // shuffled statements only
            setHide([false, false, true, true]);
            setSortable([true, true, false, false]);
            shuffleNodes('statement_opt');
            $('#instr').html('<b>Proof:</b> Reorder the statements to correct the proof.');
            break;
        case 2: // shuffled statements with static justifications
            setHide([false, false, true, false]);
            setSortable([true, true, false, false]);
            rename("justification");
            $("th .just").html("Justifications");
            shuffleNodes('statement_opt');
            $('.instr').html('<b>Proof:</b> Match each statement with the appropriate justification in the correct order.');
            break;
        case 3: // static statements with shuffled justifications
            setHide([true, false, false, false]);
            setSortable([false, false, true, true]);
            rename("statement");
            $("th .stOpt").html("Statements");
            shuffleNodes('justification_opt');
            $('.instr').html('<b>Proof:</b> Reorder the justifications to pair with the statements.');
            break;
        case 4: // shuffled statements and justifications
            setHide([false, false, false, false]);
            setSortable([true, true, true, true]);
            shuffleNodes('justification_opt');
            shuffleNodes('statement_opt');
            $(".2Col").prop('hidden', false);
            $('.instr').html('<b>Proof:</b> Reorder each statement and justification to pair in the correct order.');
        default:
            break;
    }
}
function rename(item) {
    $(`#${item}_opt`).attr('id', `${item}1`);
    $(`#${item}`).attr('id', `${item}_opt`);
    $(`#${item}1`).attr('id', `${item}`);
    $()

}
// initialize statements
function setStatements(idName) {
    for (i = 0; i < $(idName + " li").length; i++) {
        if (i < 10) { row = "0" + (i + 1); }
        else { row = "" + (i + 1); }
        $(idName).children().eq(i).attr({ 'data-compare': `${reqBefore[i]}${reqAfter[i]}`, 'value': `${row}`, 'class': 'shuffled' });
        // $("#step").append(`<li class="shufflerstep">${i + 1}</li>`);
    }
}
// initialiaze justifications
function setJustifications(idName) {
    for (i = 0; i < $(idName + " li").length; i++) {
        if (i < 10) { row = "0" + (i + 1); }
        else { row = "" + (i + 1); }
        $(idName).children().eq(i).attr({ 'value': row, 'class': 'shuffled' });
        // $(idName+" li").val(row); 
    }
}
// set step column in table
$(function () {
    for (i = 0; i < $("#statement_opt li").length; i++) {
        $("#step").append(`<li class="shufflerstep">${i + 1}</li>`);
    }
});
// make statements sortable and draggable
$(function () {
    $("#statement_opt,#statement").sortable({
        connectWith: "#statement_opt,#statement",
        start: function (event, ui) {
            ui.item.toggleClass("highlight");
        },
        stop: function (event, ui) {
            ui.item.toggleClass("highlight");
            var children = $(this)
                .sortable('refreshPositions')
                .children();
            liHt();
        }
    });
});
// make functions sortable and draggable
$(function () {
    $("#justification_opt,#justification").sortable({
        connectWith: "#justification_opt,#justification",
        start: function (event, ui) {
            ui.item.toggleClass("highlight");
        },
        // tolerance: 'intersection',
        stop: function (event, ui) {
            ui.item.toggleClass("highlight");
            // https://www.geeksforgeeks.org/jquery-ui-sortable-refreshpositions-method/
            var children = $(this)
                .sortable('refreshPositions')
                .children();
            liHt();
        }
    });
});
// show/hide table columns for different proof types
function setHide(TF) {
    let sethide = ['.st', '.stOpt', '.just', '.justOpt'];
    let setstyle = ['#statement', '#statement_opt', '#justification', '#justification_opt'];
    for (let i = 0; i < TF.length; i++) {
        $(sethide[i]).prop('hidden', TF[i]);
        if (TF[i]) {
            $(setstyle[i] + " li").css({ 'background': '#B1D6FC', 'color': 'black' });
        }
    }
}
// set which columns are sortable and which are static
function setSortable(TF) {
    let setstyle = ['#statement', '#statement_opt', '#justification', '#justification_opt'];
    for (let i = 0; i < TF.length; i++) {
        // alert('sortable');
        $(setstyle[i]).sortable('enable');
        if (TF[i]) {
            $(setstyle[i]).sortable('enable');
        }
        else {
            $(setstyle[i]).sortable('disable');
            $(setstyle[i] + " li").css({ 'background': '#B1D6FC', 'color': 'black' });
        }
    }
}
// Update height and color of li on drag
function liHt() {
    $("li").css('height', '');
    let h = 0;
    for (let i = 0; i < $("#step li").length; i++) {
        m = Math.max($("#statement li").length, $("#justification li").length);
        if (i < m) {
            if ($("#statement li").length > i && $("#justification li").length > i) {
                h = Math.max($("#statement li").eq(i).height(), $("#justification li").eq(i).height());
                $("#statement li").eq(i).height(h);
                $("#justification li").eq(i).height(h);
            }
            else if ($("#justification li").length < m) {
                h = $("#statement li").eq(i).height();
                $("#statement li").eq(i).height(h);
            }
            else {
                h = $("#justification li").eq(i).height();
                $("#justification li").eq(i).height(h);
            }
            $("#step li").eq(i).height(h);
            $("#step li").eq(i).css('background-color', '#3193F5');
        }
        else {
            $("#step li").eq(i).height(stepHtInit);
            $("#step li").eq(i).css('background-color', 'rgb(232, 232, 232)');
        }
    }
    setHeight();
}
// shuffle li elements in ul -- needs shuffleNodes(e) function call
// https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order
// put items in column in random order (li elements)
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
// rearrange rows in a column into a random order (li elements)
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
// dynamically set height of all columns (ul elements)
function setHeight() {
    $(".shuffler1,#step,.shuffler2").each(function () {
        $(this).css("height", '');
    });
    let h = [document.getElementById('statement_opt'), document.getElementById('justification_opt'), document.getElementById('step'), document.getElementById('statement'), document.getElementById('justification')];
    let maxht = h[0].clientHeight;
    for (let i = 0; i < 5; i++) {
        if (h[i].clientHeight > maxht) maxht = h[i].clientHeight;
    }
    $(".shuffler1,#step,.shuffler2").each(function () {
        $(this).css("height", maxht);
    });
}
// gather values on column (li values)
let getData = arr => {
    return arr.map(function () {
        return $(this).attr('value');
    }).get();
}
//  gather before/after values on each li in a column (li compare-data values)
let getDependency = arr => {
    return arr.map(function () {
        return $(this).attr('data-compare');
    }).get();
}
// get incorrect order of proof statements column --  return before and after info for errors
function checkOrder(l1) {
    let l1dep = getDependency($("#statement > li"));
    // alert(l1);
    // alert(l1dep);
    let valAfter = -1, valBefore = -1;
    let countAfter = 0, countBefore = 0;
    l1dep.forEach(function (value, key) {
        checkRow = parseInt(key) + 1;
        if (valAfter < 0) {
            for (let t = checkRow; t < l1.length; t++) {
                if (l1dep[t].slice(2, 5) == l1[key]) {
                    valAfter = checkRow;
                    countAfter++;
                }
            }
        }
        if (valBefore < 0) {
            for (let t = 0; t < checkRow; t++) {
                if (l1dep[t].slice(0, 2) == l1[key]) {
                    valBefore = checkRow;
                    countBefore++;
                }
            }
        }
    });
    return { countAfter, valAfter, countBefore, valBefore };
}
// get incorrect pairing of statements and justifications-- return first row number incorrectly paired
function checkPairs(l1a, l2a) {
    // alert(l1a.length+ "   "+ l2a.length);
    let len = Math.min(l1a.length, l2a.length);
    for (let i = 0; i < len; i++) {
        // alert(l1a[i]+ "   "+ l2a[i]);
        if (l1a[i] != l2a[i]) {
            return i + 1;
        }
    }
    return len + 1;
}
// check for correct pairing of statements and justifications and correct order
function checker() {
    let str = "";
    let l1 = getData($("#statement > li"));
    let l1len = l1.length;
    let l2 = getData($("#justification > li"));
    let l2len = l2.length;
    // only check pairing if justifications are present
    if (l2len > 0) {
        let maxRows = Math.max(l2len, l1len);
        if (maxRows < proofRows) {
            str += " -- At least one step is missing from the proof.<br/>";
        }
        else if (maxRows > proofRows) {
            str += " -- The solution has fewer than " + maxRows + " steps.<br/>";
        }
        if (!(l1.every((e, i) => l2[i] == e)) || (l1len != l2len)) {
            str += " -- Statements require correct pairing with justifications. First incorrect justification at step " + checkPairs(l1, l2) + ".<br/>";
        }
    }
    if (l2len == 0 & l1len != proofRows || l1len == 0 & l2len != proofRows) {
        str += " -- At least one step is missing from the proof.<br/>";
    }
    // check order of statements column
    let c = checkOrder(l1);
    pluralAfter = (c.countAfter == 1) ? " is" : "s are";
    pluralBefore = (c.countBefore == 1) ? " is" : "s are";
    str += (c.valAfter < 0) ? "Statement order is correct so far." : " -- Statements are out of order. At least " + c.countAfter + " more step" + pluralAfter + " needed before step " + c.valAfter + ".<br/>";
    str += (c.valBefore < 0) ? "" : " -- Statements are out of order. At least " + c.countBefore + " more step" + pluralBefore + " needed after step " + c.valBefore + ".<br/>";
    if (str == "Statement order is correct so far.") { str = "Correct!"; }
    // }
    $("#chkOrder").html(str);
}