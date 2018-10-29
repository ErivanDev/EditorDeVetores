class vec3 {
    constructor( a, b, c )
    {
        this.x = a || 0;
        this.y = b || 0;
        this.z = c || 0;
    }

    //Soma
    add( v )
    {
        return new vec3( this.x + v.x, this.y + v.y, this.z + v.z);
    }

    //Subtracao
    sub( v )
    {
        return new vec3( this.x - v.x, this.y - v.y, this.z - v.z);
    }

    //Multiplicacao
    mult( f )
    {
	    return new vec3( this.x*f, this.y*f, this.z*f);
    }

    //Divisao
    div( f )
    {
        return new vec3( this.x/f, this.y/f, this.z/f);
    }

    //Magnitude
    length()
    {
        return Math.sqrt( this.dot(this) );
    }

    //Distancia
    distance( v )
    {
        return sub(v).length();
    }

    //Normalizacao
    normalize()
    {
        return div( length() );
    }

    //Produto Escalar
    dot( v )
    {
        return this.x*v.x + this.y*v.y + this.z*v.z;
    }

    //Divisao Escalar
    scalediv( v )
    {
        return this.x/v.x + this.y/v.y + this.z/v.z;
    }

    //Produto Vetorial
    cross( v ) 
    {
        return new vec3(this.y * v.z - this.z * v.y,
                        this.z * v.x - this.x * v.z,
                        this.x * v.y - this.y * v.x);
    }

    //Projecao
    projection( v )
    {
        var d = v.normalize();
        return dot(d)/d.dot(d) * d;
    }

    //Angulo entre dois vetores
    angle( v ) 
    {
        var theta = this.dot( v ) / this.length() * v.length();
        if( theta >  1 ) theta =  1;
        if( theta < -1 ) theta = -1;
        return acos( theta );
    }
}