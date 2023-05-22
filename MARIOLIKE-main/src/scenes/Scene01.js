import { Cube } from "../Cube.js";

export class Scene01 extends Phaser.Scene {

    constructor(){
        super("Scene01")
    }

    preload()

    {

        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('perso','assets/perso.png',
            { frameWidth: 32, frameHeight: 48 });
        
        this.load.image('left-cap', 'assets/barHorizontal_green_left.png')
        this.load.image('middle', 'assets/barHorizontal_green_mid.png')
        this.load.image('right-cap', 'assets/barHorizontal_green_right.png')

        this.load.image('left-cap-shadow', 'assets/barHorizontal_shadow_left.png')
        this.load.image('middle-shadow', 'assets/barHorizontal_shadow_mid.png')
        this.load.image('right-cap-shadow', 'assets/barHorizontal_shadow_right.png')
        
    };

    
    create(){





        this.platforms;
        this.player;
        this.xspeed = 250;
        this.yspeed = 900;
        this.slowMotion = false
        this.click = false;

        var mx = this.input.mousePointer.x;
        var my = this.input.mousePointer.y;
        

        this.timer = 0;

       
        this.cubeGroup = this.physics.add.staticGroup();
      
    
        var bg = this.add.image(400, 300, 'sky');
    
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        
    
        this.player = this.physics.add.sprite(100, 450, 'perso').setGravity(0,300);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.cubeGroup);
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', {start:0,end:3}),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'perso', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', {start:5,end:8}),
            frameRate: 10,
            repeat: -1
        });
    
        this.cursors = this.input.keyboard.createCursorKeys();


        this.input.on('pointerdown', () => {this.click = true;});
        this.input.on('pointerup', () => {this.click = false;});

            


        
        

        
    
    }
    
    update(){
    
  
    
        if (this.cursors.left.isDown){ //si la touche gauche est appuyée
            this.player.setVelocityX(-this.xspeed); //alors vitesse négative en X
            this.player.anims.play('left', true); //et animation => gauche
        }
    
        else if (this.cursors.right.isDown){ //sinon si la touche droite est appuyée
            this.player.setVelocityX(this.xspeed); //alors vitesse positive en X
            this.player.anims.play('right', true); //et animation => droite
        }
    
        else{ // sinon
            this.player.setVelocityX(0); //vitesse nulle
            this.player.anims.play('turn'); //animation fait face caméra
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.down){
            //si touche haut appuyée ET que le perso touche le sol
            this.player.setVelocityY(-this.yspeed); //alors vitesse verticale négative
            //(on saute)
        }
    
        else if (this.cursors.down.isDown){ //sinon si la touche droite est appuyée
            this.player.setVelocityY(this.yspeed); //alors vitesse positive en X
            
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.shift)) {
            this.slowMotion = true
            this.timer = 1;
        }
        if (this.cursors.shift.isDown && this.slowMotion){
            this.player.body.velocity.x = this.player.body.velocity.x/4
            this.player.body.velocity.y = this.player.body.velocity.y/2
            this.timer++;
            
            const mx = this.input.mousePointer.x;
            const my = this.input.mousePointer.y;

            if (this.click ){
                this.cubeGroup.add(new Cube(this, mx, my));
                if (this.timer >= 100){
                    this.slowMotion = false;
                    this.timer = 0;
                }

            }

            /*if (this.input.on('pointerdown',(this.pointer))) {
                this.cubeGroup.add(new Cube(this, mx, my));
            
                if (this.timer >= 100){
                    this.slowMotion = false;
                    this.timer = 0;
                }
            }*/

            /*if(this.pointer.isDown == true){
                this.cubeGroup.add(new Cube(this, mx, my));
            
                if (this.timer >= 100){
                    this.slowMotion = false;
                    this.timer = 0;
                }

            }*/

        }

        else {
            this.slowMotion = false
            this.xspeed= 250
            this.yspeed= 370
            
        }


        
    }

    createCube(mx,my){
        this.cubeGroup.add(new Cube(this, mx, my));
            
                if (this.timer >= 100){
                    this.slowMotion = false;
                    this.timer = 0;
                }

    }

    
      
}

