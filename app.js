document.addEventListener ('DOMContentLoaded', () => {
    const squares = document.querySelectorAll ('.grid div')
    const scoreDisplay = document.querySelector ('span')
    const startBtn = document.querySelector ('.start')
    const gameOver = document.querySelector ('.gameOver')
        
    const width = 10
    let currentIndex = 0 // first div grid
    let appleIndex = 0 // apple location index in grid
    let currentSnake = [2,1,0] // all divs value of 2 or more = HEAD, divs valued at 0 = TAIL, 
    
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    // to start, and restart game function
    function startGame () {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple ()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 800
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval (moveOutcomes, intervalTime)        
    }

    // function that deals with ALL movement outcomes
    function moveOutcomes() {
        

        // deals snake hitting border or self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width ) || // snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || // if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //snake hits top
            squares[currentSnake[0] + direction].classList.contains('snake') //snake goes into itself
        ) {
            return clearInterval(interval) //clears interval with any of the above occurs
            
        }

        const tail = currentSnake.pop () // removes last of the array and shows it
        squares[tail].classList.remove ('snake') //removes class of snake from TAIL
        currentSnake.unshift (currentSnake[0] + direction) //gives direction to HEAD of the array
        
        // deals snake getting apple
        if (squares[currentSnake[0]].classList.contains ('apple')) {
            squares[currentSnake[0]].classList.remove ('apple')
            squares[tail].classList.add ('snake')
            currentSnake.push (tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval (interval)
            intervalTime = intervalTime * speed        
            interval = setInterval (moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add ('snake')
    }

    // generate new random apple once apple is eaten
    function randomApple () {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }


    // assign functions to keycodes
    function control(e) {
        // squares [currentIndex].classList.remove('snake')
        if (e.keyCode === 39) {
            direction = 1 // if press right arrow - goes right
        } else if (e.keyCode === 38) {
            direction = -width // if press up - goes up
        } else if (e.keyCode === 37) {
            direction = -1 // if press left - goes left
        } else if (e.keyCode === 40) {
            direction = +width
        }
    }

    document.addEventListener ('keyup', control)
    startBtn.addEventListener ('click', startGame)


});





