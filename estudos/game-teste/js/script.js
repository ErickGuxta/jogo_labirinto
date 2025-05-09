(function () {
    const cnv = document.querySelector("canvas");
    const ctx = cnv.getContext("2d");

    // Teclas
    const UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;
    let moveLeft = moveRight = moveUp = moveDown = false;

    //objeto imagem
    var img = new Image();
    img.src = "img/img.png";

    var tileSize = 72;
    var tileSrcSize = 96;

    // personagem OBS: CRIAR CLASSE DEPOIS
    let jogador = {
        posX: 34,
        posY: 34,
        width: tileSize - 30,
        height: tileSize - 30,
        speed: 8
    }

    // paredes
    let walls = [];

    // Criando matriz do labirinto
    const labirinto = [
        [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    // armazenar width e height do labirinto
    const width_labirinto = labirinto[0].length * tileSize;
    const height_labirinto = labirinto.length * tileSize;

    // Função para construir o labirinto
    function gerar_labiririnto() {
        walls = []; // Limpar paredes antes de reconstruir
        for (let linha in labirinto) {
            for (let coluna in labirinto[linha]) {
                let element = labirinto[linha][coluna];
                if (element === 1) {
                    let wall = {
                        posX: coluna * tileSize,
                        posY: linha * tileSize,
                        width: tileSize,
                        height: tileSize
                    }
                    walls.push(wall);
                }
            }
        }
    }

    // MOVIMENTAÇÃO CAMERA 
    // -> esse objeto aqui ta criando os limites
    const camera = {
        x: 0,
        y: 0,
        width: cnv.width,
        height: cnv.height,
        // métodos que retornam codernada das fornteiras
        innerLeftBoundary: function () {
            return this.x + (this.width * 0.25)
        },
        innerTopBoundary: function () {
            return this.y + (this.height * 0.25)
        },
        innerRightBoundary: function () {
            return this.x + (this.width * 0.75)
        },
        innerBottomBoundary: function () {
            return this.y + (this.height * 0.75)
        }
    }
    // -> essa função faz os ajustes na tela
    function movimentacao_camera() {
        // Movimentação (ajustes da tela)
        if (jogador.posX < camera.innerLeftBoundary()) {
            camera.x = jogador.posX - (camera.width * 0.25);
        }
        if (jogador.posY < camera.innerTopBoundary()) {
            camera.y = jogador.posY - (camera.height * 0.25);
        }
        if (jogador.posX + jogador.width > camera.innerRightBoundary()) {
            camera.x = (jogador.posX + jogador.width) - (camera.width * 0.75);
        }
        if (jogador.posY + jogador.height > camera.innerBottomBoundary()) {
            camera.y = (jogador.posY + jogador.height) - (camera.height * 0.75);
        }

        // Posição definitiva da camera
        camera.x = Math.max(0, Math.min(width_labirinto - camera.width, camera.x));
        camera.y = Math.max(0, Math.min(height_labirinto - camera.height, camera.y));
    }

    //Para desenhar os elementos na tela
    function render() {
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.save();
        ctx.translate(-camera.x, -camera.y);

        // Desenhar labirinto
        for (let row in labirinto) {
            for (let column in labirinto[row]) {
                let tile = labirinto[row][column];
                let x = column * tileSize;
                let y = row * tileSize;

                ctx.drawImage(
                    img,
                    tile * tileSrcSize, 0, tileSrcSize, tileSrcSize,
                    x, y, tileSize, tileSize
                );
            }
        }

        // Personagem
        ctx.fillStyle = "#00f";
        ctx.fillRect(jogador.posX, jogador.posY, jogador.width, jogador.height);
        ctx.restore();
    }

    // COLISÃO
    function colisao() {
        for (let i = 0; i < walls.length; i++) {
            let wall = walls[i];
            blockRectangle(jogador, wall);
        }
    }




    // DETECTAR COLISÃO
    function blockRectangle(objA, objB) {
        // Distância entre os centros dos objetos no eixo x 
        // OBS. o valor desses catetos podem dar valores positivos, isso é últil 
        // para saber de qual lado o personagem está em relação ao outro bloco
        const catetoX = (objA.posX + objA.width / 2) - (objB.posX + objB.width / 2);
        const catetoY = (objA.posY + objA.height / 2) - (objB.posY + objB.height / 2);

        // Soma da metade das larguras e alturas
        const somaMetadeWidth = (objA.width + objB.width) / 2;
        const somaMetadeHeight = (objA.height + objB.height) / 2;

        // Verificar se houve colisão
        if (Math.abs(catetoX) < somaMetadeWidth && Math.abs(catetoY) < somaMetadeHeight) {
            // bloqueio do objeto A
            let sobreposicaoX = somaMetadeWidth - Math.abs(catetoX); //Retorna quanto um elemento invadiu o espaço do outro
            let sobreposicaoY = somaMetadeHeight - Math.abs(catetoY); //Retorna quanto um elemento invadiu o espaço do outro

            if (sobreposicaoX < sobreposicaoY) {
                // Colisão horizontal
                if (catetoX > 0) {
                    objA.posX += sobreposicaoX; // Empurra para a direita
                } else {
                    objA.posX -= sobreposicaoX; // Empurra para a esquerda
                }
            } else {
                // Colisão vertical
                if (catetoY > 0) {
                    objA.posY += sobreposicaoY; // Empurra para baixo
                } else {
                    objA.posY -= sobreposicaoY; // Empurra para cima
                }
            }
        }
    }

    // -----------Entradas (para movimentação)-----------

    window.addEventListener("keydown", keydownHandler, false); //keydown é uma função que é disparada quando preciona uma tecla
    window.addEventListener("keyup", keyupHandler, false); //keydown é uma função que é disparada quando uma tecla é solta

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

    // Função Mover personagem
    function mover() {
        if (moveLeft) jogador.posX -= jogador.speed;
        if (moveRight) jogador.posX += jogador.speed;
        if (moveDown) jogador.posY += jogador.speed;
        if (moveUp) jogador.posY -= jogador.speed;
    }


    //para atualizar
    function update() {
        mover();
        colisao();
        movimentacao_camera();
    }


    //vai ficar se repetindo repetidamente
    function loop() {
        update();
        render();
        requestAnimationFrame(loop, cnv);
    }

    // Event listeners
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);

    // Iniciar o jogo quando a imagem carregar
    img.addEventListener("load", function () {
        gerar_labiririnto();
        requestAnimationFrame(loop, cnv);
    }, false);

})();