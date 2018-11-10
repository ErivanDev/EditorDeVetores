var vectors = [], t, s = 1, grade = false;

function setup(){
    mycanvas = createCanvas(601, 601);
    mycanvas.parent("test");
    t = width/2;
}

function draw(){
    background(255);

    mouse = { x : (mouseX - t) / s, y : (mouseY - t) / s };

    translate(t, t);
    scale(s, s);

    fill(255);
    ellipse(mouse.x, mouse.y, 14, 14);
    fill(0);
    line( mouse.x + 0, mouse.y - 10 , mouse.x, mouse.y );
    line( mouse.x - 10, mouse.y + 0 , mouse.x, mouse.y );
    line( mouse.x + 0, mouse.y + 10 , mouse.x, mouse.y );
    line( mouse.x + 10, mouse.y + 0 , mouse.x, mouse.y );

    var miw = 0 - t;
    var maw = width - t;
    var mih = 0 - t;
    var mah = height - t;
    
    if( grade ){
        for( var i = miw; i < maw; i+=10 ){
            for( var j = miw; j < maw; j+=10 ){
                line( i , mih, i, mah );
                line( miw , j, maw, j );
                // text( );
            }
        }
    }   

    textSize(12);
    text( mouse.x + ", " + mouse.y, mouse.x , mouse.y );

    var sum = undefined; 
    for( var i = 0; i < vectors.length; i++ ){
        vectors[ i ].draw();
        if( vectors[ i ].vetor != undefined ){
            
            if( sum == undefined ){
                sum = new Obj( vectors[i].pos ); 
                sum.vetor = vectors[i].vetor;
            }
            else{
                sum.vetor = sum.vetor.add( vectors[i].vetor );
            }
        }
    }
    
    if( sum && vectors.length > 1 ){ 
        stroke(147, 0, 255);
        fill(255);
        sum.draw();
        stroke(0);
        fill(0);
    }
} 

function randomize(){
    var numbers = [];
    var copyVectors = vectors;

    for(var i=0; i<vectors.length - 1; i++){
        numbers.push( i );
    }

    for(var i=0; i<vectors.length - 1; i++){
        var randN = Math.round( Math.random() * ( numbers.length - 1 ) ); 
        
        var aux = vectors[i].vetor;
        var titulo = vectors[i].titulo;

        vectors[i].vetor = copyVectors[ numbers[ randN ] ].vetor;
        copyVectors[ numbers[ randN ] ].vetor = aux;

        vectors[i].titulo = copyVectors[ numbers[ randN ] ].titulo;
        copyVectors[ numbers[ randN ] ].titulo = titulo;

        // vectors[i].titulo = "Vetor: " + randN + 1;
    }

    for(var i=1; i<vectors.length; i++){
        vectors[i].pos = vectors[ i-1 ].pos.add( vectors[i-1].vetor ); 
    }
}

function mouseClicked(){
    if( mouseX>0 && mouseY>0 ){
        var pos = new vec3( mouse.x, mouse.y );
        
        if( vectors.length ){
            var vetor = new vec3( mouse.x, mouse.y ).sub( vectors[ vectors.length - 1 ].pos );
            vectors[ vectors.length - 1 ].vetor = vetor;
        }
        
        vectors.push( new Obj( pos, vectors.length ) );
    }
}

class Obj {
    constructor( arg0, nome ){
        this.pos = arg0;
        this.vetor = undefined;
        this.titulo = nome;
    }

    draw(){
        // if( this.titulo == undefined ){
        //     this.titulo = "Vetor: " + ( vectors.indexOf( this ) + 1 );
        // }
        if( this.vetor != undefined ){
            var aux = this.pos.add( this.vetor ); 
            line( this.pos.x , this.pos.y , aux.x , aux.y );

            // var ang = aux.angle( new vec3( aux.x , aux.y - 10, 0 ) );

            var xx = aux.x - this.pos.x; 
            var yy = aux.y - this.pos.y; 
            var ang = Math.atan(yy/xx);
            if (xx<0) ang+=PI;
            if (xx>0 && yy<0) ang+=TWO_PI;

            triangle( aux.x + cos(ang) * 5, aux.y + sin(ang) * 5, 
                      aux.x + cos(ang + PI/2) * 5, aux.y + sin(ang + PI/2) * 5, 
                      aux.x + cos(ang - PI/2) * 5, aux.y + sin(ang - PI/2) * 5 );

            // line(aux.x - cos(ang) * 5, aux.y - sin(ang) * 5);
            
            var posT = this.pos.add( this.vetor.div( 2 ) );
            
            if( this.titulo != undefined ) {
                fill(255, 0, 0); stroke(255, 0, 0);
                text( "V(" + this.titulo + ")" , posT.x - 10, posT.y - 10);  
                fill(0); stroke(0);
            }
        }
        // else{
        //     line( this.pos.x , this.pos.y , mouse.x , mouse.y );
        // }
    }
}

function zoom( valor ) {
    s += valor/20;
    return false;
}

function grid(){
    grade = !grade;
}