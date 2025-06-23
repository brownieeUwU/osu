let cursor = sprites.create(img`
    . . 5 5 5 . . 
    . 5 5 5 5 5 . 
    5 5 . 5 . 5 5 
    5 5 5 5 5 5 5 
    5 5 . 5 . 5 5 
    . 5 5 5 5 5 . 
    . . 5 5 5 . . 
`, SpriteKind.Player)

controller.moveSprite(cursor)
cursor.setStayInScreen(true)
info.setScore(0)

// Spawn notes every 1.5 seconds
game.onUpdateInterval(1500, function () {
    let note = sprites.create(img`
        . . . 1 1 1 . . . 
        . 1 1 1 1 1 1 . . 
        1 1 . . . . 1 1 . 
        1 1 . . . . 1 1 . 
        1 1 . . . . 1 1 . 
        . 1 1 1 1 1 1 . . 
        . . . 1 1 1 . . . 
    `, SpriteKind.Enemy)
    note.setPosition(randint(20, 140), randint(20, 100))

    // Remove note after 2 seconds (missed)
    timer.after(2000, function () {
        if (note && note.kind() == SpriteKind.Enemy) {
            note.destroy()
            info.changeScoreBy(-1) // penalty
        }
    })
})

// Player hits note by pressing A
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let note of sprites.allOfKind(SpriteKind.Enemy)) {
        if (cursor.overlapsWith(note)) {
            note.destroy()
            info.changeScoreBy(1)
        }
    }
})

// Optional: Add a timer for challenge
info.startCountdown(30)
