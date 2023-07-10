let n = 1;
let player1_money = 0;
let player2_money = 0;
let moneybox = false;
let objectwin = false;

let all_objects = [];

function setname(player){
	document.getElementById('coin-window').style.display = "none";
	moneybox = false;
	var newname = prompt("player "+player+" :");
	if(newname == "" || newname == null){
		document.getElementById('player'+player).innerHTML = "Player "+player;
	}else{
		document.getElementById('player'+player).innerHTML = newname;
	}
}

function newobject(player){
	var seed = "";
	var obj = document.getElementById('objectname').value;
	if(obj == ""){
		document.getElementById('object-window').style.display = "none";
		objectwin = false;
		return
	}
	var type = document.getElementById('type').value;
	var rarity = document.getElementById('rarity').value;
	var value = setvalue(type,rarity);
	var newDiv = document.createElement("div");
	var thisn = n;
	newDiv.className = "object";
	newDiv.id = "object"+n;
	newDiv.player = player;
	newDiv.innerHTML = "<table><tr><td class='td-type'><img id='img-"+n+"' src='img/"+type+".png'></td><td class='td-name'>"+obj+"</td><td class='td-rarity'><img src='img/"+rarity+".png'></td><td class='td-value'><span id='object"+n+"-value'>"+value+"</span></td><td><img src='img/Gold.png'></td><td id='sell-object-"+n+"' onclick = 'sell(object"+n+")' class='td-sell'><button class='sell-button'></button></td><td class='td-del'><button onclick = 'del(object"+n+",true)' class='delete-button'></button></td></tr></table>";
	newDiv.desc = obj;
	newDiv.num = thisn;
	newDiv.value = value;
	divName = "p"+player+"-inv";
	seed = obj+"$"+type+"$"+rarity+"$"+value+"$"+player+"$"+thisn;
	all_objects.push(seed);
	document.getElementById(divName).appendChild(newDiv);
	document.getElementById('object-window').style.display = "none";
	objectwin = false;
	document.getElementById('object'+n).addEventListener('contextmenu', (event) => {
		if(document.getElementById('object'+thisn).player == 1){
			document.getElementById("p2-inv").appendChild(eval("object"+thisn));
			var thisobject = document.getElementById('object'+thisn);
			thisobject.player = 2;
			var check = [];
			for(x=0; x < all_objects.length; x++){
				check = all_objects[x].split("$");
				if(check[5] == thisobject.num){
					all_objects.splice(x, 1);
					all_objects.push(check[0]+"$"+check[1]+"$"+check[2]+"$"+check[3]+"$2$"+check[5]);
					return
				}
			}
		}else{
			document.getElementById("p1-inv").appendChild(eval("object"+thisn));
			var thisobject = document.getElementById('object'+thisn);
			thisobject.player = 1;
			for(x=0; x < all_objects.length; x++){
				check = all_objects[x].split("$");
				if(check[5] == thisobject.num){
					all_objects.splice(x, 1);
					all_objects.push(check[0]+"$"+check[1]+"$"+check[2]+"$"+check[3]+"$1$"+check[5]);
					return
				}
			}
		}
	});
	document.getElementById('objectname').value = "";
	n++;
	tri();
}

function load(){
	var filename = prompt("File's name ?");
	if(filename == ""){
		return
	}
	var script = document.createElement("script");
  	script.src = filename+".js";
  	document.head.appendChild(script);
  	script.addEventListener('load', function() { 	  
		document.getElementById('player1').innerHTML = player1_name;
		document.getElementById('player2').innerHTML = player2_name;
		player1_money = loadplayer1_money;
		player2_money = loadplayer2_money;
		document.getElementById('totalgold-player1').innerHTML = player1_money;
		document.getElementById('totalgold-player2').innerHTML = player2_money;
		var obj = "";
		var type = "";
		var rarity = "";
		var value = "";
		var player = "";
		var currobject = [];
		var y = 0;
		var newDiv = "";
		var thisobject = "";
		for(x=0; x < all_objects.length; x++){
			y = x+1;
			currobject = all_objects[x].split("$");
			obj = currobject[0];
			type = parseInt(currobject[1]);
			rarity = currobject[2];
			value = parseInt(currobject[3]);
			player = currobject[4];
			newDiv = document.createElement("div");
			newDiv.className = "object";
			newDiv.id = "object"+currobject[5];
			newDiv.player = player;
			newDiv.value = value;
			newDiv.innerHTML = "<table><tr><td class='td-type'><img id='img-"+currobject[5]+"' src='img/"+type+".png'></td><td class='td-name'>"+obj+"</td><td class='td-rarity'><img src='img/"+rarity+".png'></td><td class='td-value'><span id='object"+currobject[5]+"-value'>"+value+"</span><img src='img/Gold.png'></td><td id='sell-object-"+currobject[5]+"' class='td-sell'><button class='sell-button' onclick = 'sell(object"+currobject[5]+")'></button></td><td class='td-del'><button onclick = 'del(object"+currobject[5]+",true)' class='delete-button'></button></td></tr></table>";
			newDiv.desc = obj;
			newDiv.num = currobject[5];
			divName = "p"+player+"-inv";
			document.getElementById(divName).appendChild(newDiv);
			document.getElementById('object-window').style.display = "none";
			objectwin = false;
			const thisid = 'object'+currobject[5];
			document.getElementById(thisid).addEventListener('contextmenu', (event) => {
				if(document.getElementById(thisid).player == 1){
					document.getElementById("p2-inv").appendChild(eval(thisid));
					thisobject = document.getElementById(thisid);
					thisobject.player = 2;
				}else{
					document.getElementById("p1-inv").appendChild(eval(thisid));
					thisobject = document.getElementById(thisid);
					thisobject.player = 1;
				}
			});
			n = Number(currobject[5])+1;
		}
		tri();
	});
}

function del(object, sound){
	var check = [];
	for(x=0; x < all_objects.length; x++){
		check = all_objects[x].split("$");
		if(check[5] == object.num){
			all_objects.splice(x, 1);
			object.remove();
			if(sound == true){
				trash.pause();
				trash.play();
			}
			return
		}
	}
}

function showmoneybox(player){
	if(moneybox){
		document.getElementById('coin-window').style.display = "none";
		moneybox = false;
	}else{
		document.getElementById('object-window').style.display = "none";
		objectwin = false;
		var name = document.getElementById('player'+player).innerHTML;
		var coins = document.getElementById('totalgold-player'+player).innerHTML;
		document.getElementById('okbutton').onclick = function(){upgold(player)};
		document.getElementById('player-name').innerHTML = name;
		document.getElementById('coin-player').innerHTML = coins;
		document.getElementById('coin-window').style.display = "block";
		document.getElementById('coin-num').focus();
		moneybox = true;
	}
}

function objectwindow(player){
	if(objectwin){
		document.getElementById('object-window').style.display = "none";
		objectwin = false;
	}else{
		document.getElementById('coin-window').style.display = "none";
		moneybox = false;
		document.getElementById('object-window').style.display = "block";
		document.getElementById('create-button').onclick = function(){newobject(player)}
		document.getElementById('objectname').focus();
		objectwin = true;
	}
}

function upgold(player){
	var quantity = document.getElementById('coin-num').value;
	quantity = Number(quantity);
	var actualmoney = document.getElementById('totalgold-player'+player);
	if(player == 1){
		player1_money = player1_money+quantity;
		actualmoney.innerHTML = player1_money;
	}else{
		player2_money = player2_money+quantity;
		actualmoney.innerHTML = player2_money;
	}
	document.getElementById('coin-window').style.display = "none";
	moneybox = false;
	if(quantity != 0){
		sfx.pause();
		sfx.play();
	}
	document.getElementById('coin-num').value = "";
}

function sell(object){
	var player = object.player;
	var value = object.value;
	var actualmoney = document.getElementById('totalgold-player'+player);
	if(player == 1){
		player1_money += value;
		actualmoney.innerHTML = player1_money;
	}else{
		player2_money += value;
		actualmoney.innerHTML = player2_money;
	}
	sfx.play();
	del(object, false);
}

function setvalue(type, rarity){
	var rate = 1;
	var value = 0;
	var min = 0;
	var max = 0;
	var variation = 0;
	switch(rarity){
		case "brown":
		rate = 0.34;
		break

		case "green":
		rate = 1;
		break

		case "blue":
		rate = 3;
		break

		case "pink":
		rate = 9;
		break

		case "purple":
		rate = 297;
		break
	}

	switch(type){
		//nourriture
		case "1":
		//boisson
		case "2":
		//plante
		case "3":
		min = 3*rate; 
		max = 6*rate+1;
		break

		//matériel
		case "4":
		min = 7*rate; 
		max = 14*rate+1;
		break

		//drop
		case "5":
		min = 15*rate; 
		max = 30*rate+1;
		break

		//vêtement
		case "6":
		min = 31*rate; 
		max = 62*rate+1;
		break

		//livre
		case "7":
		min = 63*rate; 
		max = 126*rate+1;
		break

		//meuble
		case "8":
		min = 63*rate; 
		max = 126*rate+1;
		break

		//potion
		case "9":
		min = 63*rate;
		max = 126*rate+1;
		break		

		//outil
		case "10":
		min = 127*rate;
		max = 254*rate+1;
		break

		//armure
		case "11":
		min = 255*rate;
		max = 510*rate+1;
		break

		//arme
		case "12":
		min = 511*rate;
		max = 1022*rate+1;
		break

		//parchemin
		case "13":
		min = 1023*rate;
		max = 2046*rate+1;
		break

		//objet magique
		case "14":
		min = 2047*rate;
		max = 4094*rate+1;
		break

		//objet précieux
		case "15":
		min = 4095*rate;
		max = 8190*rate+1;
		break

		//propriété
		case "16":
		min = 8191*rate;
		max = 16382*rate+1;
		break
	}
	variation = max-min;
	value = Math.floor(Math.random()*variation)+min;
	return Math.floor(value);
}

function save(){
	var send = `all_objects = [`;
	for(x=0; x < all_objects.length; x++){
		if(all_objects.length-1 == x){
			send += `"`+all_objects[x]+`"`;
		}else{
			send += `"`+all_objects[x]+`",`;
		}
	}
	send += `];\n`;
	send += `let loadplayer1_money =`+player1_money+`;\n`
	send += `let loadplayer2_money =`+player2_money+`;\n`
	send += `let player2_name ="`+document.getElementById('player2').innerHTML+`";\n`
	send += `let player1_name ="`+document.getElementById('player1').innerHTML+`";`
	var save = new Blob([send], {type: "text/plain;charset=utf-8"});
	var filename = prompt("File's name ?");
   	saveAs(save, filename+".js");
}

document.getElementById("coin-num")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("okbutton").click();
    }
});

function tri(){
	trinext(12);
	trinext(11);
	trinext(14);
	trinext(6);
	trinext(9);
	trinext(1);
	trinext(2);
	trinext(13);
	trinext(10);
	trinext(7);
	trinext(8);
	trinext(4);
	trinext(3);
	trinext(5);
	trinext(15);
	trinext(16);
}

function trinext(type){
	var check = [];
	for(x=0; x < all_objects.length; x++){
		check = all_objects[x].split("$");
		if(type == parseInt(check[1])){
			document.getElementById("p"+check[4]+"-inv").appendChild(eval("object"+check[5]));
		}
	}	
}