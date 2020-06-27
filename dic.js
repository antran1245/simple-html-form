//setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var spheres;
var x = 0;
var y = 0;
var z = 0;

function init() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	document.addEventListener('mousedown', mouseClicked, false);
}

//overall light
var ambientlight = new THREE.AmbientLight(0xffffff);
scene.add(ambientlight);

//overlay
//form setting for adding
function openAddForm() {
	document.getElementById("addForm").style.display = "block";
	document.getElementById("sphere-form").reset();
	document.removeEventListener('mousedown', mouseClicked, false);
	x = Math.floor(Math.random()*500) - 250;
	y = Math.floor(Math.random()*500) - 250;
	z = Math.floor(Math.random()*500) - 250;

	document.getElementById("x_value").value = x;
	document.getElementById("y_value").value = y;
	document.getElementById("z_value").value = z;
}
function closeAddForm() {
	document.getElementById("addForm").style.display = "none";
	document.addEventListener('mousedown', mouseClicked, false);
}
//form setting for search 
function openSearchForm() {
	document.getElementById("searchForm").style.display = "block";
	document.getElementById("search-form").reset();
	document.removeEventListener('mousedown', mouseClicked, false);
}
function closeSearchForm() {
	document.getElementById("searchForm").style.display = "none";
	document.addEventListener('mousedown', mouseClicked, false);
	document.getElementById("showInfo").style.display = "block";
}
function func(info, password) {
	alert(info);
}
function closeInfo() {
	document.getElementById("showInfo").style.display = "none";
}
//create spheres
var geometry = new THREE.SphereGeometry(20, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
function test(){
	var material = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
	spheres = new THREE.Mesh(geometry, material);
	spheres.position.set(x, y, z);
	scene.add(spheres);
	animate();
	closeAddForm();
}

//camera initial setting (0,0,500)
camera.position.z = 500;

//control over camera
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 2.0;

//mouse clicker
var searchX_value = 0;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
function mouseClicked(event) {
	event.preventDefault();
	mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
	mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(scene.children);
	if (intersects.length > 0) {
		intersects[0].object.material.color.set(0xff0000);
		document.getElementById("searchX_value").value = intersects[0].object.position.x;
		document.getElementById("searchY_value").value = intersects[0].object.position.y;
		document.getElementById("searchZ_value").value = intersects[0].object.position.z;
		document.getElementById("showInfo").style.display = "block";
		document.getElementById("clickForm").submit();
	}
}

//main function
function animate() {
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
	controls.update();
}

init();
animate();