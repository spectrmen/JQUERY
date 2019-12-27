$(document).ready(function(e){
    var x = 0;
    // checking name
    $("#sub").click(function(event){
	var name = $("input[name=name]").val();
	event.preventDefault();
	$.get("lib_contactDB.php", {check: name}).done(function(data){
		    alert(data);
		    if(data == 0){
		    alert("такое имя уже есть");
		    $("form").submit();
		    }
		});
	});
    //add rows
    $("#add").click(function(e){

	$("#container").append($("#field").clone().css("display", "block"));
        x++;
    });
   //delete rows
    $("#container").on('click', '#remove', function(e){
	$(this).parent('div').remove();
	x--;
     });
   //modal fields
    $("#modal").click(function(e){
	var names = [];
	var types = [];
	$("input[name='comments[]']").map(function(index, element){
	    names.push($(element).val());
	});
	$("select[name='types[]']").map(function(index, element){
	    types.push($(element).val());
        });
	var mas = zip([names, types]);
	mas.slice(0, -1).forEach(function(i){
	    $("#example").find('tr').each(function(){ 
		$(this).find('th').eq(-1).after("<th class=\"rep\">"+i[0]+"</th>");
		if(i[1] == "DATE"){
		    $(this).find('td').eq(-1).after("<td class=\"rep\">12:12:12</td>");
		}
		else if(i[1] == "VARCHAR(12) CHARACTER SET utf8"){
		    $(this).find('td').eq(-1).after("<td class=\"rep\">Название</td>");
		}
		else if(i[1] == "VARCHAR(255) CHARACTER SET utf8"){
		    $(this).find('td').eq(-1).after("<td class=\"rep\">текст текст текст текст</td>");
		}
	    });
	});
	$("#modal_window").css("display", "flex");
    });
    //close modal
    $("#close").click(function(e){
	$("#modal_window").css("display", "none");
	$("#example").find("td.rep").remove();
	$("#example").find("th.rep").remove();
    });
});

function zip(arrays) {
    return arrays[0].map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
};

function onAjaxSuccess(data){
 
    alert(data);
    
};

