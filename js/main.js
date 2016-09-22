var nodes, edges, network;
var color1 = "#97C2FC"
var color2 = "#75B8EA"
var ID_nodo = 6;
var ID_lado = 5;
var visible = false;

var tmp;

function show_relation() {
	if( visible == false ) {
		$('#relaciones').append('<pre id="edges"></pre>');
		$('#edges').html(toJSON(edges.get()));
		$('#SR').text("Ocultar");
		visible = true;
	}
	else {
		$('#edges').remove();
		$('#SR').text("Ver");
		visible = false;
	}

}

// convenience method to stringify a JSON object
function toJSON (obj) {
	return JSON.stringify(obj, null, 4);
}

$(window).load(function () {
	// attach actions to the node buttons

	$('#node-id').val(ID_nodo);
	$('#edge-id').val(ID_lado);

	$('#node-add').click(function () {
		
		if ( $('#node-label').val() == "" )
			return

		try {
			nodes.add({
				id: $('#node-id').val(),
				//label: $('#node-label').val()
				label: $('#node-id').val(),
			});
			$('#node-id').val(ID_nodo);
		}
		catch (err) {
			alert(err);
		}
	});
	/*
	$('#node-update').click(function () {

		if ( $('#node-label').val() == "" )
			return

		try {
			nodes.update({
				id: $('#node-id').val(),
				//label: $('#node-label').val()
				label: $('#node-id').val(),
			});
		}
		catch (err) {
			alert(err);
		}
	});
	//*/
	$('#node-remove').click(function () {
		try {
			var id = $('#node-id').val();
			nodes.remove(id);
		}
		catch (err) {
			alert(err);
		}
	});

  // attach actions to the edge buttons
	$('#edge-add').click(function () {

		if ( $('#edge-from').val() == "" || $('#edge-to').val() == "" || $('#edge-weight').val() == "" )
			return

		try {
			edges.add({
				id: ID_lado,
				from: $('#edge-from').val(),
				to: $('#edge-to').val(),
				label: $('#edge-weight').val()
			});
			$('#edge-id').val(ID_lado);
			ID_lado += 1;
		}
		catch (err) {
			alert(err);
		}
	});
	/*
	$('#edge-update').click(function () {

		if ( $('#edge-from').val() == "" || $('#edge-to').val() == "" )
			 return

		try {
			edges.update({
				id: $('#edge-id').val(),
				from: $('#edge-from').val(),
				to: $('#edge-to').val(),
				label: $('#edge-weight').val()
			});
		}
		catch (err) {
			alert(err);
		}
	});
	//*/
	$('#edge-remove').click(function () {
		try {
			var id = $('#edge-id').val();
			edges.remove(id);
		}
		catch (err) {
			alert(err);
		}
	});

  // create an array with nodes
	nodes = new vis.DataSet();
	nodes.subscribe('*', function () {
		$('#nodes').html(toJSON(nodes.get()));
	});
  
	nodes.add([
		{id: '1', label: '1'},
		{id: '2', label: '2'},
		{id: '3', label: '3'},
		{id: '4', label: '4'},
		{id: '5', label: '5'}
	]);

  // create an array with edges
	edges = new vis.DataSet();
	edges.subscribe('*', function () {
		$('#edges').html(toJSON(edges.get()));
  	});

	edges.add([
		{id: '1', from: '1', to: '2', label: 21},
		{id: '2', from: '1', to: '3', label: 45},
		{id: '3', from: '2', to: '4', label: 54},
		{id: '4', from: '2', to: '5', label: 12}
	]);

  // create a network
	var container = $('#network').get(0);
	var data = {
		nodes: nodes,
		edges: edges
	};
	var options = {
		width:  '100%',
		height: '600px'
	};
	
	network = new vis.Network(container, data, options);
});