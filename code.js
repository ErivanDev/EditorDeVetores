var vectors = [];

var t;
var s = 1;

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
    for( var i = miw; i < maw; i+=10 ){
        for( var j = miw; j < maw; j+=10 ){
            line( i , mih, i, mah );
            line( miw , j, maw, j );
            // text( );
        }
    }

    textSize(12);
    text( mouse.x + ", " + mouse.y, mouse.x , mouse.y );

    var sum;
    for( let i = 0; i < vectors.length; i++ ){
        vectors[ i ].draw();
        if( vectors[ i ].v2 != undefined ){
            var aux = new vec3( vectors[ i ].v2.x - vectors[ i ].v1.x, 
                                vectors[ i ].v2.y - vectors[ i ].v1.y );
            
            if(sum == undefined)
                sum = aux;
            else 
                sum = sum.add( aux );
        }
    }

    if( vectors.length && sum != undefined ) 
        line( vectors[ 0 ].v1.x , 
              vectors[ 0 ].v1.y , 
              vectors[ 0 ].v1.x + sum.x, 
              vectors[ 0 ].v1.y + sum.y );
}

function mouseClicked(){
    var pos = new vec3( mouse.x, mouse.y );
    
    if( vectors.length ){
        var vetor = new vec3( mouse.x, mouse.y ).sub( vectors[ vectors.length - 1 ].pos );
        vectors[ vectors.length - 1 ].vetor = vetor;
    }
    
    vectors.push( new Obj( pos ) );
}

class Obj {
    constructor( arg0 ){
        this.pos = arg0;
        this.vetor = undefined;
    }

    draw(){
        if( this.vetor != undefined ){
            var aux = this.pos.add( this.vetor ); 
            line( this.pos.x , this.pos.y , aux.x , aux.y );
            var posT = this.pos.add( this.vetor.div( 2 ) );
            text( "erinva", posT.x , posT.y );  
        }
        else{
            line( this.pos.x , this.pos.y , mouse.x , mouse.y );
        }
    }
}

function mouseWheel(event) {
    s += event.delta/1000;
    return false;
}