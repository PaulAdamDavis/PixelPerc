$(function(){

    var app = {};

    app.utils = {
        random_color: function(){
            var ranges = [
                [20,220],
                [20, 220],
                [20, 220]
            ];
            var colour_part = function() {
                var range = ranges.splice(Math.floor(Math.random()*ranges.length), 1)[0];
                return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
            };
            return "rgb(" + colour_part() + "," + colour_part() + "," + colour_part() +")";
        },
        round_number: function(num, dec){
            var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
            return result;
        },
        array_from_inputs: function(){
            var form = $("#widths"),
                inputs = form.find("input.number"),
                widths = [];
            $.each(inputs, function(i, input) {
                var value = ~~($(input).val());
                widths.push(value);
            });
            return widths;
        },
        get_total_width: function(){
            var widths = app.utils.array_from_inputs(),
                total_width = 0;
            $.each(widths, function(i, value) {
                total_width = ~~(total_width + value);
            });
            return total_width;
        }
    };

    // Update the last inout, which is the total width. Should be the same as the wrapper.
    function update_total_input() {
        $("#widths input[name='total_width']").attr('value', app.utils.get_total_width());
        $("#widths input.number").bind("change blur keyup", function(){
            $("#widths input[name='total_width']").attr('value', app.utils.get_total_width());
        });
    }

    // Remove a column
    function remove_number() {
        $(".minus").bind("click", function(){
            var elem = $(this),
                pair = elem.attr("data-pair");
            $(".pair_" + pair).remove();
            update_total_input();
            update();
            return false;
        });
    }

    function add_element(passed_value) {
        var value = (typeof passed_value === 'number') ? passed_value : '',
            num = $("#widths .number_wrapper").length;
        $("#widths .equals").before('<div class="operator pair pair_' + num +'">+</div><div class="number_wrapper pair_' + num +'"><a href="#" class="minus" data-pair="' + num + '">&#9587;</a><input type="text" class="number" value="' + value + '" /></div>');
        $("#widths input.number:last").focus();
        update_total_input();
        remove_number();
    }

    // Get the vars from the URL and return an array
    // This needs validation to make sure only ints are users
    function get_url_vars() {
        var url = document.location.href,
            domain = document.domain,
            extras = url.replace('http://' + domain, ''),
            vars = extras.split('/').map(Number),
            array = $.grep(vars,function(n){
                return n;
            });
        return array;
    }

    // This is just horrible, but it works, for now.
    function pre_populate() {
        var values = get_url_vars();
        if (values.length > 0) {
            $(".pair").not(".pair_1").remove();
            $.each(values, function(i, val){
                if (i === 0) {
                    $(".number_wrapper.pair_1 input").attr("value", val);
                } else {
                    add_element(val);
                }
            });
            $("#widths button").click();
        }
    }

    function update() {
        var total = app.utils.get_total_width(),
            widths = app.utils.array_from_inputs();

        // If total is 0, throw error
        if (total === 0) {
            $("#widths input.number").addClass("error");
            return false;
        } else {
            $("#widths input.number").removeClass("error");
        }

        // Loop through the remaining inouts and give a % width
        $(".example div").html('');
        $.each(widths, function(i, passed_value) {
            var value = passed_value,
                real_perc_width = 100 * parseFloat(value) / parseFloat(total),
                nice_width = app.utils.round_number(real_perc_width , 5 ); // 100 times by element width (600px) devided by total width (950px)

            var color = app.utils.random_color();
            var bar = '<div class="example_column" style="width: ' + nice_width + '%; background: ' + color + ';"></div>';
            var num = '<div class="values" style="width: ' + nice_width + '%; color: ' + color + '">' + nice_width + '% <br><span class="pixels">(was ' + value + 'px)</span></div>';
            $("#example_bar").append(bar);
            $("#example_num").append(num);

        });

        var new_url = '/' + widths.join("/");
        history.pushState(null, null, new_url);
    }

    // Update shit on click
    $("#widths button").on("click", function(){
        update();
        return false;
    });

    // And also update shit on input keyup
    $("#widths").on("keyup", "input", function(){
        update();
    });



    $(document).on('keyup', function(e) {
        if(e.keyCode == 9) {
            add_element();
        }
    }).on('click', 'input');

    // Add element
    $("#add_el").on("click", function(){
        add_element();
        return false;
    });

    pre_populate();


    // Run functions
    update_total_input();
    remove_number();
    get_url_vars();


});