class Character
{
    constructor(x, y, w, h, c)
    {
        this.sprite = createSprite(x, y, w, h);
        this.c = c;
        this.sprite.shapeColor = this.c;
        this.jumpy = 0;
        this.time = 500;
        this.dead = false
    }

    update()
    {
        this.sprite.velocityY += gravity;

        for(var i = 0; i < environment.length; i++)
        {
            if(environment[i].c == this.c || !environment[i].c)
            {
                if(environment[i].sprite.isTouching(this.sprite))
                {
                    this.jumpy = 0;
                }
                this.sprite.collide(environment[i].sprite);
            }
        }

        if(this.jumpy > this.time)
        {
            this.thing();
        }

        if(this.dead === true){
            this.sprite.destroy();
        }

        /*if(this.time % 90 === 0)
        {
            this.jumpy = 0;
        }*/
    }

    thing()
    {
        this.jumpy++;
    }
}