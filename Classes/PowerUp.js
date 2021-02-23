var shMov;
shMov = false;

class PowerUp
{
    constructor(pow, Pl, x, y)
    {
        this.sprite = createSprite(x, y, 20, 4);
        this.Pl = Pl;
        this.pow = pow;
    }

    update()
    {
        if(this.sprite.isTouching(this.Pl.sprite))
        {
            this.sprite.destroy();
            switch(this.pow)
            {
                case "double jump": this.Pl.time = 2;
                    break;

                case "rewind":  Rewind();
                                shMov = true;
                    break;

                case "advance": LEVLE();
                    break;
                    
                default : console.log("Got you. Its a prank");
                    break;
            }
        }
    }
}