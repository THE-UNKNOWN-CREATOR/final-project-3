class Player extends Character
{
    constructor(x, y)
    {
        var s = "red";
        super(x, y, 20, 20, s);
    }

    camFol()
    {
        camera.position.x = this.sprite.x;
        camera.position.y = this.sprite.y - (height/6);
    }

    move(val)
    {
        if(keyIsDown(RIGHT_ARROW))
            this.sprite.velocityX = val;
        else
        if(keyIsDown(LEFT_ARROW))
            this.sprite.velocityX = -val;
        else
            this.sprite.velocityX = 0;
    }

    jump()
    {
        if(this.jumpy < this.time && key == " ")
        {
            this.sprite.velocityY = -5;
            this.jumpy++;
        }
    }

    changeColor(r)
    {
        this.c = r;
        this.sprite.shapeColor = this.c;
    }
}