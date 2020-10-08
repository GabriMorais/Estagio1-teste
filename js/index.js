var config = {
    type: Phaser.AUTO,
    parent:"phaser-example",
    width: 1350,
    height: 520,
    
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
       
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

let player;
var cursors;
let golpeesq;
var x = 0;
var keyq;
var depgolpeesq = 1;
function preload() {
    this.load.image("tiles", "assets/teste.png");
    this.load.tilemapTiledJSON("map", "assets/teste6.json")
    this.load.spritesheet("player", "assets/ teste27.png", {
        frameWidth: 51.05,
        frameHeight: 64,
    });
    this.load.spritesheet("player1", "assets/teste22.png", {
        frameWidth: 49.2,
        frameHeight: 50,
    });
    this.load.spritesheet("soco", "assets/teste3.png", {
        frameWidth: 45,
        frameHeight: 50,
    });
}

function create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("16", "tiles")

    const mapa = map.createStaticLayer("mapa", tileset, 0, 0);
    const colisao = map.createStaticLayer("colisao", tileset, 0,0);
    const depoiscol = map.createStaticLayer("depoiscol", tileset, 0, 0,);
    colisao.setCollisionByProperty({ coliders: true });
    depoiscol.setCollisionByProperty({ coliders: true });

    //player

    const spawnPoint = map.findObject(
        //player and not Player like your variable
        "player",
        (objects) => objects.name === "player"
    );

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player");
    player.setScale(1.5)
    
    this.physics.add.collider(player, colisao);
    this.physics.add.collider(player, depoiscol);
    const anims = this.anims;
    anims.create({
        key: "right",
        frames: anims.generateFrameNames("player", { start: 1, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "left",
        frames: anims.generateFrameNames("player", { start: 21, end: 14}),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "front",
        frames: anims.generateFrameNames("player", { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "back",
        frames: anims.generateFrameNames("player", { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "keyq",
        frames: anims.generateFrameNames("player", { start: 9, end:13}),
        frameRate:17, 
        repeat: -1,
    });
    anims.create({
        key: "keyq1",
        frames: anims.generateFrameNames("player", { start: 28, end:24}),
        frameRate:17, 
        repeat: -1,
    });
    anims.create({
        key: "keyS",
        frames: anims.generateFrameNames("player", { start: 29, end:33}),
        frameRate:17, 
        repeat: -1,
    });
    anims.create({
        key: "pulo",
        frames: anims.generateFrameNames("player", { start: 34, end:38}),
        frameRate:17, 
        repeat: -1,
    });
    anims.create({
        key: "parado",
        frames: [ { key: 'player', frame: 0 } ],
        frameRate:1, 
    });
    
    

    //the CAMERA
    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();
}
function update() {
    //put here  before your velocity is 0
    const prevVelocity = player.body.velocity.clone();
    //stop player when stop press the key
    player.body.setVelocity(0);
    
    keyA = this.input.keyboard.addKey(65);
    keyS = this.input.keyboard.addKey(83);
    //keyboard press to move
    if (cursors.left.isDown) {
        player.body.setVelocityX(-100);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(100);
    } else if (cursors.up.isDown) {
        player.body.setVelocityY(-80);
    } else if (cursors.down.isDown) {
        player.body.setVelocityY(80);
    }
    
        //set animations per key pressed
    if (cursors.left.isDown) {
        x = 1;
        player.anims.play("left", true);
    } else if (cursors.right.isDown) {
        x = 0;
        player.anims.play("right", true);
    } else if (cursors.up.isDown) {
        //its because when you go, you need see the back of your character
        player.anims.play("back", true);
    } else if (cursors.down.isDown) {
        player.anims.play("front", true);
    }else if (keyA.isDown && depgolpeesq == 1 && x ==1 ) {
        
       player.anims.play("keyq1", true); 
    }else if (keyA.isDown && depgolpeesq == 1 && x==0) {
        
        player.anims.play("keyq", true); 
        
            
         
       
    }else if (keyS.isDown && depgolpeesq == 1 && x ==1 ) {
        
        player.anims.play("keyS", true); 
    }else if (keyS.isDown && depgolpeesq == 1 && x==0) {
         
         player.anims.play("keyS", true); 
         
             
          
        
    }
    else if (cursors.space.isDown) {
        player.setVelocityY(-30);
            
         
       
   }else {

        player.anims.stop();
        

    }
    if(keyA.isUp){
        depgolpeesq = 1
    }

}   