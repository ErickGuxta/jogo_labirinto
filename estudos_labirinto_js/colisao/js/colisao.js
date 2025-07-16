function blockRect(r1, r2) {
    // r1 -> objeto bloqueado
    // r2 -> parede
    
    // Catetos (distancia do centro entre os blocos)
    const catetoX = r1.centroX() - r2.centroX();
    const catetoY = r1.centroY() - r2.centroY();
    

    // Soma das metades
    const somaMetadeWidth = r1.metadeWidth() + r2.metadeWidth();
    const somaMetadeHeight = r1.metadeHeight() + r2.metadeHeight();

    if(Math.abs(catetoX) < somaMetadeWidth && Math.abs(catetoY) < somaMetadeHeight ){
        r2.visible = false;
    }
}