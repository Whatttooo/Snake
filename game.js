 pause = false;
    window.onload = function(){
        canv = document.getElementById("canvas");
        ctx  = canv.getContext("2d");
        document.addEventListener("keydown", keyPush);
        if(!pause){
            setInterval(game, 1000/15);
        }else{
            console.log("bruh");
        }    
    }
    scoreNum = 0;
    playerX=playerY=10;
    gridSize=tileCount=20;
    appleX=appleY=15;
    velocityX=velocityY = 0;
    trail=[];
    tail=1;
    function game(){
        title = "Your Score: " + scoreNum;
        playerX+=velocityX;
        playerY+=velocityY;
        if(playerX < 0){
            playerX = tileCount -1;
        }
        if(playerX > tileCount -1){
            playerX = 0;
        }
        if(playerY < 0){
            playerY = tileCount -1;
        }
         if(playerY > tileCount -1){
            playerY = 0;
        }
        ctx.fillStyle = "#2E4D78";
        ctx.fillRect(0,0,canv.width,canv.height);

        ctx.font ="30px Arial";

        ctx.fillStyle = "#B08C00";
        ctx.fillText(title, 100, 50);

        ctx.fillStyle = "lime";
        for(var i =0; i<trail.length;i++){
            ctx.fillRect(trail[i].x*gridSize,trail[i].y*gridSize,gridSize-2,gridSize-2);   
            if((trail[i].x == playerX && trail[i].y == playerY) && (velocityX !=0 || velocityY != 0)){
                tail = 1;
                scoreNum = 0;
            }
        }

        if(!pause){
            trail.push({x:playerX, y:playerY});
        }
        while(trail.length > tail) {
            if(!pause){
                trail.shift();
            }
        }


          if(appleX == playerX && appleY == playerY){
                tail++;
                scoreNum +=2;
                appleX = Math.floor(Math.random()*tileCount);
                appleY = Math.floor(Math.random()*tileCount);
                for(var i=0; i<trail.length;i++){
                    if(trail[i].x == appleX && trail[i].y == appleY){
                        appleX = tileCount - appleX;
                        appleY = tileCount - appleY;
                        console.log("Clash avoided");
                        break;
                    }
                }
            }        

        ctx.fillStyle = "red";
        ctx.fillRect(appleX*gridSize,appleY*gridSize,gridSize-2,gridSize-2);        
    }
    function keyPush(e){
        switch(e.keyCode){
            case 65:
            case 37:
                pause = false;
                if(velocityX == 1){
                    break;
                }else{
                    velocityX=-1;
                    velocityY=0;
                }
                break;
            case 87:
            case 38:
                pause = false;
                 if(velocityY == 1){
                    break;
                }else{
                    velocityX=0;
                    velocityY=-1;
                }
                break;
            case 68:
            case 39:
                pause = false;
                 if(velocityX == -1){
                    break;
                }else{
                    velocityX=1;
                    velocityY=0;
                }
                break;
            case 83:
            case 40:
                pause = false; 
                 if(velocityY ==-1){
                    break;
                }else{
                    velocityX=0;
                    velocityY=1;
                }
                break;
            case 80:
            case 27:
                pause = true;
                velocityX=0;
                velocityY=0;
                break;
        }
    }