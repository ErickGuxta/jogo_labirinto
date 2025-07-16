//Salvando o texto atual que eu devo escrever
var _texto = string_copy(texto, 0, indice)



//derfinindo fonte
draw_set_font(fnt_texto);

//desenhando caixa de dialogo
draw_sprite(spr_box2, 0, 128, 32)

//mudando cor do texto
draw_set_color(c_black);
draw_text_ext(128 + margem, 32 + margem, _texto, 20, 108 - margem*2);

