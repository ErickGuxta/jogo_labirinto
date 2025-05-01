(function(){

    // Variáveis
    const cnv = document.querySelector("canvas");
    const ctx = cnv.getContext("2d");
    const speed = 5;

    // Teclas
    const UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;
    let moveLeft = moveRight = moveUp = moveDown = false;
    

    // Arrays
    const sprites = []; //todos os elementos que vão ser desenhados
    const blocks = []; //todos os elementos que vão ter consistencia de solidês

    // Objetos
    const character = new Sprite(50, 175, 50, 50, "#00f");
    sprites.push(character);

    const block1 = new Sprite(500, 100, 50, 50, "#f00");
    sprites.push(block1);

    const block2 = new Sprite(200, 300, 100, 50, "#000");
    sprites.push(block2);

    // Entradas (para movimentação)

    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);
  
    function keydownHandler(event) {
      let key = event.keyCode;
  
      if (key === LEFT && key !== RIGHT) moveLeft = true;
      if (key === RIGHT && key !== LEFT) moveRight = true;
      if (key === DOWN && key !== UP) moveDown = true;
      if (key === UP && key !== DOWN) moveUp = true;
  
    }
  
    function keyupHandler(event) {
      let key = event.keyCode;
  
      if (key === LEFT && key !== RIGHT) moveLeft = false;
      if (key === RIGHT && key !== LEFT) moveRight = false;
      if (key === DOWN && key !== UP) moveDown = false;
      if (key === UP && key !== DOWN) moveUp = false;
    }
  
    function mover() {
        if (moveLeft) character.posX -= speed;
        if (moveRight) character.posX += speed;
        if (moveDown) character.posY += speed;
        if (moveUp) character.posY -= speed;

        // Limitar da tela do canva
        character.posX = Math.max(0, Math.min(cnv.width - character.width, character.posX))
        character.posY = Math.max(0, Math.min(cnv.height - character.height, character.posY))
    }

    // Funções
    function loop() {
        window.requestAnimationFrame(loop);
        update();
        render();
    }
    function update() {
        mover()
    }

    function render() {
        ctx.clearRect(0,0, cnv.width, cnv.height);

        // for para facilitar a criação de novos elementos
        for (const i in sprites) {
            let spr = sprites[i]; 
            if (spr.visible) {
                ctx.fillStyle = spr.color;
                ctx.fillRect(spr.posX, spr.posY, spr.width, spr.height);
            }
       }
    }

    loop()


}())