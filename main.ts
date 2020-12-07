namespace SpriteKind {
    export const Dog = SpriteKind.create()
    export const HappyDog = SpriteKind.create()
    export const CORGUY = SpriteKind.create()
    export const Camera = SpriteKind.create()
}
function introSequence () {
    invisible = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Camera)
    tiles.placeOnTile(invisible, tiles.getTileLocation(25, 8))
    scene.cameraFollowSprite(invisible)
    CorGuyTheDoorGuy = sprites.create(img`
        .............................fff....
        ..fff......................ff44f....
        ..f44fff.................ff4444f....
        ...f444ff................f44334f....
        ...f4344ff...ffffff.....f444344f....
        ...f43344fffff44444ffff.f433344f....
        ...f44334ff44444444444fff44344ff....
        ...ff4444444444444444444f4444f......
        ....ff4444444444444444444444f.......
        .....ff44444444444444444444ff.......
        .....f444444f444444f4444444f........
        .....f444444f444444f4444444f........
        .....f44ddd4444444444ddd44f.........
        .....f44dddd44444444dddd44ff........
        .....f44ddddddfffdddddddd44f........
        ...fff44dddddddfddddddddd44ff.......
        ...f4444ddddffddddffddddd444f.......
        ...f444ddddddffffffdddddd44ff.......
        ....f44dddddddddddddddddd44f........
        ....f4dddddddddddddddddd444f........
        ...f44dddddddddddddddddd444f........
        ...f4ddddddddddddddddddd444ff.......
        ...f4ddddddddddddddddd44d444ff......
        ...f44dddddddddddddddd44d4444fff....
        ...f44dddddddddddddddd444d44444ff...
        ...ff44dddddddddddddd44444d444444ff.
        ....f44fdddddddddfdd444f44d4444444ff
        ....f44ffdddddddfddd44ff44444444444f
        ....ff44fddddddfddd444f4444444444dff
        .....f44ffdddddfd4444f444444f444ddf.
        ....fff4dfffffffd44fff44444ff44dddf.
        ....f444ff.....fd4ffffffffff4dddfff.
        ....fffff......ffff........ffffff...
        `, SpriteKind.CORGUY)
    tiles.placeOnTile(CorGuyTheDoorGuy, tiles.getTileLocation(28, 0))
    story.queueStoryPart(function () {
        story.spriteMoveToTile(CorGuyTheDoorGuy, tiles.getTileLocation(28, 10), 200)
    })
    story.queueStoryPart(function () {
        story.printDialog("Hey, I'm CorGuy the Door Guy! And you are a tumbleweed!", 70, 50, 50, 100)
    })
    story.queueStoryPart(function () {
        tumbleWeed = sprites.create(tumbleWeedImg, SpriteKind.Player)
        tiles.placeOnTile(tumbleWeed, tiles.getTileLocation(25, 0))
        tumbleWeed.ay = 500
    })
    story.queueStoryPart(function () {
        story.printDialog("Your mission is to play with all the good pups who live on these plains", 70, 50, 50, 100)
        createDogs()
    })
    story.queueStoryPart(function () {
        story.spriteMoveToTile(invisible, tiles.getTileLocation(0, 8), 200)
    })
    story.queueStoryPart(function () {
        story.spriteMoveToTile(invisible, tiles.getTileLocation(25, 8), 200)
    })
    story.queueStoryPart(function () {
        controller.moveSprite(tumbleWeed, 100, 0)
        scene.cameraFollowSprite(tumbleWeed)
        invisible.destroy()
        introFinished = true
    })
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Dog, function (player2, dog) {
    if (!(isPlaying)) {
        isPlaying = true
        controller.moveSprite(player2, 0, 0)
        story.queueStoryPart(function () {
            player2.x = dog.x
            player2.y = dog.y
            player2.follow(dog, 200)
            story.spriteMoveToTile(dog, tiles.getTileLocation(randint(0, 24), 11), 200)
            dog.startEffect(effects.hearts, 500)
        })
        story.queueStoryPart(function () {
            controller.moveSprite(player2, 100, 0)
            player2.follow(null)
            dog.setKind(SpriteKind.HappyDog)
            isPlaying = false
        })
    }
})
function createDogs () {
    availableTiles = tiles.getTilesByType(myTiles.tile4)
    for (let dog of dogImgs) {
        newDog = sprites.create(dog, SpriteKind.Dog)
        randomIndex = randint(0, availableTiles.length - 1)
        randomTile = availableTiles[randomIndex]
        tiles.placeOnTile(newDog, randomTile)
        availableTiles.removeAt(randomIndex)
    }
}
let happyDogs: Sprite[] = []
let randomTile: tiles.Location = null
let randomIndex = 0
let newDog: Sprite = null
let availableTiles: tiles.Location[] = []
let isPlaying = false
let introFinished = false
let tumbleWeed: Sprite = null
let CorGuyTheDoorGuy: Sprite = null
let invisible: Sprite = null
let dogImgs: Image[] = []
let tumbleWeedImg: Image = null
let location = null
tumbleWeedImg = img`
    . . 4 4 4 5 5 4 4 . . . . . . . 
    . 5 5 4 4 4 5 5 4 4 5 4 4 . . . 
    . 4 5 5 4 4 4 5 4 4 4 5 4 4 . . 
    4 4 4 4 4 4 4 4 5 4 4 5 4 4 5 . 
    4 5 5 5 4 4 4 4 5 4 4 5 4 4 5 4 
    5 5 4 5 5 4 4 4 5 4 4 4 4 4 5 4 
    4 4 4 4 4 4 4 4 5 4 5 4 4 5 5 4 
    4 4 4 4 4 4 4 4 4 4 5 4 4 4 4 4 
    4 5 5 4 4 4 4 4 5 5 5 4 5 4 4 5 
    4 5 4 4 4 5 4 4 5 5 4 5 5 4 4 5 
    4 5 4 4 4 5 4 4 4 4 4 4 4 4 5 5 
    5 5 4 4 4 5 4 4 4 4 4 4 4 5 5 4 
    5 4 4 4 4 5 5 4 4 4 4 4 5 5 4 4 
    . 4 5 4 4 4 5 5 5 5 5 4 4 4 4 . 
    . . 5 4 4 4 4 4 4 4 4 4 4 4 4 . 
    . . 5 5 5 4 4 4 4 4 5 5 5 5 5 . 
    `
tiles.setTilemap(tilemap`level`)
dogImgs = [
img`
    . . . . 1 . . . . 1 . . . . . . 
    . . . . 1 1 . . 1 1 . . . . . . 
    . . . . 1 1 1 1 1 1 . . . . . . 
    . . . . 1 1 1 f f 1 . . . . . . 
    . . . . f 1 f 1 f . . . . f . . 
    . . . . 1 1 f f f . . . . . f . 
    . . . . f 1 1 1 1 1 . . . . f . 
    . . . . . . 1 1 1 1 1 . . . f . 
    . . . . . . 1 1 1 1 1 1 . f f . 
    . . . . . . 1 1 1 1 1 1 1 f f . 
    . . . . . f 1 1 1 1 1 1 1 1 f . 
    . . . . f 1 1 1 1 1 f f 1 1 1 . 
    . . . f 1 1 1 1 1 1 f 1 1 1 1 . 
    . . . f 1 1 1 1 1 f 1 1 1 1 f . 
    . . . f 1 1 1 1 1 f 1 1 1 1 f . 
    . . f 1 1 1 1 f f f 1 1 1 1 f . 
    `,
img`
    . . . . . . . . . . . . f f e . . . 
    . . . . . . . . . . . . f f 1 e . . 
    . . . . . . . . . . . . e e e e e f 
    . . . . . . . . . . . . e e e e e e 
    . . . . . . . . . . . . e e e . . . 
    . . e e e e e e e e e e e e e . . . 
    . e e e e e e e e e e e e e e . . . 
    e . e e e e e e e e e e e e e . . . 
    . . e e e e e e e e e e e e . . . . 
    . . e c . . . . . . . c . e . . . . 
    . . e e c . . . . . . c c e e . . . 
    `,
img`
    . . . . . . . . . . . e . . . . 
    . e . . . . . . . . . e e e . . 
    e . . . . . . . . . e e 1 f e e 
    e . . . . . . . . . e e e c c . 
    . e e e e e e e e e e e c . . . 
    . . . e e . . c c e e e . . . . 
    . . . e c . . d d c e e . . . . 
    . . . e . . . . . d c e . . . . 
    . . . e . . . . . . . e . . . . 
    . . . c e . . . . . . c e . . . 
    `,
img`
    . . . . . . . . 1 1 1 1 1 1 1 . 
    . . . . . . . 1 1 d 1 1 1 1 1 . 
    . . . . . . . 1 1 d 1 b 1 b 1 . 
    . . . . . . . . . 1 1 1 1 1 1 3 
    . . . . 1 1 1 1 1 1 1 1 1 1 1 1 
    . 1 1 1 1 1 1 1 1 1 1 1 d d d . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 d d . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 d d . 
    1 . 1 1 1 1 1 1 1 1 1 1 1 1 d . 
    . . 1 1 1 1 1 1 1 1 1 1 1 1 b . 
    . . . 1 1 1 b . . . . 1 1 b . . 
    . . . 1 . b . . . . . 1 . b . . 
    `,
img`
    ....................
    ....................
    ....................
    ............eeeee...
    ...........eddddde..
    ...........eddddde..
    eeeeeeeeeeeeddfdfee.
    ddddddddddddddddddde
    eeedddddddddddddddde
    ..edddddddddddddddde
    ..eddddddddddddd3ee.
    ..edddddddddddde....
    ..eddddddddddde.....
    ..eedede.edede......
    ..eedede.edede......
    ..eeeeee.eeeee......
    `,
img`
    ..dddddd........
    .d111111d.......
    d11111111d......
    d1f11f1d1d......
    d111111d1d......
    d11d1111d.......
    df1d111d........
    .dd1111d........
    d1111111d.......
    d11111111d......
    d111111111d.....
    d1111111111d....
    d111111d111d....
    .d1111d1111d....
    .d1111d11111d.dd
    ..d111d11111d..d
    ..d11d1d11111d.d
    ..d11d1dd1111dd.
    ..d1d11dd1111d..
    ..d1d11d1d1111d.
    .d11d1dd11d111d.
    `
]
introSequence()
game.onUpdate(function () {
    happyDogs = sprites.allOfKind(SpriteKind.HappyDog)
    if (happyDogs.length == dogImgs.length) {
        pause(1000)
        game.over(true)
    }
})
game.onUpdateInterval(100, function () {
    if (introFinished && tumbleWeed.isHittingTile(CollisionDirection.Bottom) && !(isPlaying)) {
        tumbleWeed.vy = -200
    }
})
