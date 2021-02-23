class Platform
{
    constructor(x, y, w, h, c, lever = false)
    {
        this.sprite = createSprite(x, y, w, h);
        this.c = c;
        this.shoLev = lever;
        this.kill = false;

        if(this.c)
            this.sprite.shapeColor = this.c;
        environment.push(this);
    }

    move(x, y)
    {
        this.sprite.velocityX = x;
        this.sprite.velocityY = y;
    }
}