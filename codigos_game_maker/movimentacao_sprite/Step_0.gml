//Pegando os inputs do usuario

var _dir = keyboard_check(ord("D"));
var _esq = keyboard_check(ord("A"));
var _baixo = keyboard_check(ord("S"));
var _cima = keyboard_check(ord("W"));


//Aplicando os inputs à velocidade
// O resultado da conta vai ser 0, -1 ou 1
velv	= (_baixo - _cima) * vel;
velh	= (_dir - _esq) * vel;

repeat(abs(velh)){
	//colisão horisontal
	if(!place_meeting(x + sign(velh), y, obj_colisor))
	{
		x += sign(velh);
	} 
	else //esta colidindo
	{
		velh = 0;
	}
}

repeat(abs(velv)){
	//colisão horisontal
	if(!place_meeting(x, y + sign(velv), obj_colisor))
	{
		y += sign(velv);
	} 
	else //esta colidindo
	{
		velv = 0;
	}
}





if(velh != 0 or velv != 0){
	movendo = 1;
} else {
	movendo = 0;
}

//direção que olha
if(_dir) lado = 2;
if(_esq) lado = 3;
if(_baixo) lado = 0;
if(_cima) lado = 1;

sprite_index = sprites[movendo][lado];