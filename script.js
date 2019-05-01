var arr = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
var length;
var movecount = 0;
$(document).ready(function () {
    //   var table = $("table");

    var player = 1;
    var pattern;

    $('.setTable').click(function () {

        length = $('input').val();
        $('input').hide();
        $('.setTable').hide();

        var table_body = '<table>'
        for (var i = 0; i < length; i++) {
            table_body += '<tr>';

            for (var j = 0; j < length; j++) {
                table_body += '<td data-id="' + i + '" data-filter="' + j + '">';
                table_body += '</td>';
            }
            table_body += '</tr>'
        }
        table_body += '</table>'
        $('.tableDiv').html(table_body);

        var message = $(".message");
        message.text(`X's turn`);

        $("td").on("mouseenter", function () {
                td = $(this);
                if (player === 1) {
                    td.addClass("crosshover");
                } else if (player === 2) {
                    td.addClass("circlehover");
                }
            })
            .on("mouseleave", function () {
                $(this)
                    .removeClass("circlehover")
                    .removeClass("crosshover");
            });

        $("td").one("click", function () {
            // console.log(cells)
            movecount++;
            td = $(this);
            var X = td.data("id");
            var Y = td.data("filter");
            console.log(X, Y);
            if (player == 1) {
                message.text(`O's turn`);
                pattern = "cross";
                td.addClass(pattern);
                arr[X][Y] = "X";
                //   cells.splice(id, 1, "X");
                player = 2;
                win = hasPlayerWon(X, Y, "X");
                if (win == 1) {
                    message.text(`X has Won`).css({
                        color: "red"
                    });
                    setTimeout(function () {
                        reset();
                    }, 2000);
                }
            } else if (player == 2) {
                message.text(`X's turn`);
                pattern = "circle";
                td.addClass(pattern);

                arr[X][Y] = "O";
                //   cells.splice(id, 1, "O");
                player = 1;
                win = hasPlayerWon(X, Y, "O");

                if (win == 1) {
                    message.text(`O has Won`).css({
                        color: "blue"
                    });
                    setTimeout(function () {
                        reset();
                    }, 2000);
                }
            }
            if (win == "draw") {
                message.text(`It is a Draw`).css({
                    color: "green"
                });
                setTimeout(function () {
                    reset();
                }, 2000);
            }
            td.unbind("mouseenter");
        });

        $(".reset").click(function () {
            reset();
        });
    });
});



function reset() {
    location.reload(true);
}

function hasPlayerWon(X, Y, S) {
    //   console.log(arr[2][3]);
    //   console.log(S);
    win = 0;

    for (var i = 0; i < length; i++) {
        if (arr[X][i] !== S) {
            break;
        }
        if (i == length - 1) {
            win = 1;
        }
    }

    for (var i = 0; i < length; i++) {
        if (arr[i][Y] !== S) {
            break;
        }
        if (i == length - 1) {
            win = 1;
        }
    }

    if (X == Y) {
        for (var i = 0; i < length; i++) {
            if (arr[i][i] !== S) {
                break;
            }
            if (i == length - 1) {
                win = 1;
            }
        }
    }

    if (X + Y == length - 1) {
        for (var i = 0; i < length; i++) {
            if (arr[i][length - 1 - i] !== S) {
                break;
            }
            if (i == length - 1) {
                win = 1;
            }
        }
    }

    if (movecount == length * length) {
        win = "draw";
    }

    return win;
}

// 2
//   var cells = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//   var winningCondition = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//     [1, 4, 7],
//     [2, 5, 8],
//     [3, 6, 9],
//     [1, 5, 9],
//     [3, 5, 7]
//   ];
//   for (var index = 0; index < winningCondition.length; index++) {
//     var winCond = winningCondition[index];
//     if (
//       cells[winCond[0]] !== 0 &&
//       cells[winCond[0]] === cells[winCond[1]] &&
//       cells[winCond[1]] === cells[winCond[2]]
//     ) {
//       return 1;
//     }
//   }
//   var allCellsFilled = 1;
//   for (var index = 1; index < cells.length; index++) {
//     if (!cells[index]) {
//       allCellsFilled = 0;
//       break;
//     }
//   }
//   if (allCellsFilled) {
//     return "draw";
//   } else {
//     return 0;
//   }

//1
// if (table.find('#1').hasClass(pattern) && table.find('#2').hasClass(pattern) && table.find('#3').hasClass(pattern)) {
//     win = 1;
// } else if (table.find('#4').hasClass(pattern) && table.find('#5').hasClass(pattern) && table.find('#6').hasClass(pattern)) {
//     win = 1;
// } else if (table.find('#7').hasClass(pattern) && table.find('#8').hasClass(pattern) && table.find('#9').hasClass(pattern)) {
//     win = 1;
// } else if (table.find('#1').hasClass(pattern) && table.find('#4').hasClass(pattern) && table.find('#7').hasClass(pattern)) {
//     win = 1;
// } else if (table.find('#2').hasClass(pattern) && table.find('#5').hasClass(pattern) && table.find('#8').hasClass(pattern)) {
//     win = 1;
// } else if (table.find('#3').hasClass(pattern) && table.find('#6').hasClass(pattern) && table.find('#9').hasClass(pattern)) {
//     win = 1;
// } else if (table.find('#1').hasClass(pattern) && table.find('#5').hasClass(pattern) && table.find('#9').hasClass(pattern)) {
//     win = 1;
// } else if (table.find('#3').hasClass(pattern) && table.find('#5').hasClass(pattern) && table.find('#7').hasClass(pattern)) {
//     win = 1;
// } else if ((table.find('#1').hasClass('cross') || table.find('#1').hasClass('circle')) && (table.find('#2').hasClass('cross') || table.find('#2').hasClass('circle')) &&
//     (table.find('#3').hasClass('cross') || table.find('#3').hasClass('circle')) && (table.find('#4').hasClass('cross') || table.find('#4').hasClass('circle')) &&
//     (table.find('#5').hasClass('cross') || table.find('#5').hasClass('circle')) && (table.find('#6').hasClass('cross') || table.find('#6').hasClass('circle')) &&
//     (table.find('#7').hasClass('cross') || table.find('#7').hasClass('circle')) && (table.find('#8').hasClass('cross') || table.find('#8').hasClass('circle')) &&
//     (table.find('#9').hasClass('cross') || table.find('#9').hasClass('circle'))) {
//     win = "draw";
// }
// return win;