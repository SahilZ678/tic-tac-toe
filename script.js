var cells = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
$(document).ready(function () {

    var table = $('table');
    var player = 1;
    var pattern;

    var message = $('.message');


    message.text(`X's turn`);

    $('td').on('mouseenter', function () {
        td = $(this)
        if (player === 1) {
            td.addClass('crosshover')
        } else if (player === 2) {
            td.addClass('circlehover')
        }
    }).on('mouseleave', function () {
        console.log('mouseleft');
        $(this).removeClass('circlehover').removeClass('crosshover')
    });



    $('td').one("click", function () {
        // console.log(cells)

        td = $(this);
        var id = td.data().id;
        // console.log(id)
        if (player == 1) {
            message.text(`O's turn`);
            pattern = 'cross';
            td.addClass(pattern);
            cells.splice(id, 1, 'X');
            // td.removeClass('crosshover');
            // td.removeClass('circlehover');
            // td.off('hover');
            // $(this).mouseover(function () {
            //     console.log("hovered", id)
            // })
            // console.log((td.hasClass('circle') || td.hasClass('cross')))
            player = 2;
            win = hasPlayerWon();
            if (win == 1) {
                message.text(`X has Won`).css({
                    'color': 'red'
                });
                setTimeout(function () {
                    reset();
                }, 3000)
            }
        } else if (player == 2) {
            message.text(`X's turn`);
            pattern = 'circle'
            td.addClass(pattern);
            cells.splice(id, 1, 'O')
            // td.removeClass('circlehover');
            // td.removeClass('crosshover');
            player = 1;
            win = hasPlayerWon();

            if (win == 1) {
                message.text(`O has Won`).css({
                    'color': 'blue'
                });
                setTimeout(function () {
                    reset();
                }, 3000)
            }
        }
        if (win == 'draw') {
            message.text(`It is a Draw`).css({
                'color': 'green'
            });
            setTimeout(function () {
                reset();
            }, 3000)
        }
        td.unbind('mouseenter');
    });




    $('.reset').click(function () {
        location.reload(true);
    })
});

function reset() {
    location.reload(true);
}

function hasPlayerWon() {
    // win = 0;
    var winningCondition = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]
    for (var index = 0; index < winningCondition.length; index++) {
        var winCond = winningCondition[index];
        if (cells[winCond[0]] !== 0 && cells[winCond[0]] === cells[winCond[1]] && cells[winCond[1]] === cells[winCond[2]]) {
            return 1;
        }
    }
    var allCellsFilled = 1;
    for (var index = 1; index < cells.length; index++) {
        if (!cells[index]) {
            allCellsFilled = 0;
            break;
        }
    }
    if (allCellsFilled) {
        return 'draw';
    } else {
        return 0;
    }
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
}