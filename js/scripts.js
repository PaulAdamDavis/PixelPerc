function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function random_color() {
	var ranges = [
		[20,220],
		[20, 220],
		[20, 220]
	];
	var colour_part = function() {
		var range = ranges.splice(Math.floor(Math.random()*ranges.length), 1)[0];
		return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
	}
	return "rgb(" + colour_part() + "," + colour_part() + "," + colour_part() +")";
}

$(function(){

	// Build an array from the number inputs
	function array_from_inputs() {
		var form = $("#widths"),
			inputs = form.find("input.number"),
			widths = [];
		$.each(inputs, function(i, input) {
			var value = ~~($(input).val());
			widths.push(value);
		});
		return widths;
	}

	// Add all the column widths and return total.
	function get_total_width() {
		var widths = array_from_inputs(),
			total_width = 0;
		$.each(widths, function(i, value) {
			total_width = ~~(total_width + value);
		});
		return total_width;
	}

	// Update the last inout, which is the total width. Should be the same as the wrapper.
	function update_total_input() {
		$("#widths input[name='total_width']").attr('value', get_total_width());
		$("#widths input.number").bind("change blur keyup", function(){
			$("#widths input[name='total_width']").attr('value', get_total_width());
		});
	}

	// Remove a column
	function remove_number() {
		$(".minus").bind("click", function(){
			var elem = $(this),
				pair = elem.attr("data-pair");
			$(".pair_" + pair).remove();
			update_total_input();
			return false;
		});
	}

	// Update shit on click
	$("#widths button").on("click", function(){

		var total = get_total_width(),
			widths = array_from_inputs();

		// If total is 0, throw error
		if (total === 0) {
			$("#widths input.number").addClass("error");
			return false;
		} else {
			$("#widths input.number").removeClass("error");
		}

		// Loop through the remaining inouts and give a % width
		$("#example").html('');
		$.each(widths, function(i, value) {
			var value = value,
				real_perc_width = 100 * parseFloat(value) / parseFloat(total),
				nice_width = roundNumber(real_perc_width , 5 ); // 100 times by element width (600px) devided by total width (950px)
			$("#example").append('<div class="example_column" style="width: ' + nice_width + '%; background: ' + random_color() + ';"><span class="values">' + nice_width + '% <br><span class="pixels">(was ' + value + 'px)</span></span></div>');
		});

		return false;
	});

	// Add element
	$("#add_el").on("click", function(){
		var num = $("#widths .number_wrapper").length;
		$("#widths .equals").before('<div class="operator pair pair_' + num +'">+</div><div class="number_wrapper pair_' + num +'"><a href="#" class="minus" data-pair="' + num + '">&#9587;</a><input type="text" class="number" /></div>');
		$("#widths input.number:last").focus();
		update_total_input();
		remove_number();
		return false;
	});


	// Run functions
	update_total_input();
	remove_number();


});