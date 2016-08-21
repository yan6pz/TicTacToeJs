$(function ($) {
	window.moveCount = 0;
	var BOARD_SIZE = 3;
	this.Players=[];
	this.Board;
	var dir=[[0,1,2],[3,4,5],[6,7,8]];
	function init(){
		TicTacToe();
		this.Board=[];
		for(var i=0;i<BOARD_SIZE;i++)
		{
			this.Board.push([ 0, 0, 0 ]);
		}
	}
		
    function Block(id) {
            this.CANVAS = document.getElementById('block-'+id);
            this.CTX = this.CANVAS.getContext("2d");
            this.WIDTH = this.CANVAS.width || 0;
            this.TILEWIDTH = (this.WIDTH );
            this.CurrentId=id;
            this.CANVAS.addEventListener('selectstart', function (e) {
                e.preventDefault();
                return false;
            }, false);

    }

    Block.prototype.move = function (coor) {
        var width = this.TILEWIDTH;
        var  ctx = this.CTX;
              if (window.moveCount++ % 2 === 1) {
                 moveO(coor.top, coor.right,coor.left,coor.bottom, width, ctx);
             } else {
                 moveX(coor.top, coor.right,coor.left,coor.bottom, width, ctx);
             }
    };

    function moveO(top,right,left,bottom, r, ctx, fill, lineW) {
        var y = (bottom-top  )/ 2,
            x = (right-left ) / 2,
            r = r / 3 - (r * 0.17);
        ctx.beginPath();
        ctx.lineWidth = lineW || 3;
        ctx.strokeStyle = fill || "#333";
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
    }

    function moveX(top,right,left,bottom, w, ctx, fill, lineW) {
        var pad = w * 0.15;
		var x=(right-left)/2;
		var y=(bottom-top)/2;
 
        ctx.beginPath();
        ctx.lineWidth = lineW || 3;
        ctx.strokeStyle = fill || "#333";
		ctx.moveTo(x - pad, y - pad);
		ctx.lineTo(x + pad, y + pad);
		ctx.stroke();

		ctx.moveTo(x + pad, y - pad);
		ctx.lineTo(x - pad, y + pad);
		ctx.stroke();
    }
	    function updateCanvas(next) {
           for(var i=0;i<BOARD_SIZE;i++){
			   for(var j=0;j<BOARD_SIZE;j++){
			   if(Board[i][j]!=next[i][j]){
				   renderBot(dir[i][j]);
				   return;
			   }
			   }
		   }

    }
	function renderBot(id){
		var b = new Block(id);
		var rect = document.getElementById(id).getBoundingClientRect();
		var coor={top:rect.top,
				right:rect.right,
				bottom:rect.bottom,
				left:rect.left
		};
		b.move(coor);
		Board[Math.floor(id/3)][id%3] = 1;
	}
	function hasWin(){
		var end = TicTacToe.CheckCurrentBoardState(Board);
          switch (end)
          {
            case TicTacToe.ExitValue.ComputerWins:
              beautify(1,"red");
			  Players[1]++;
              break;
            case  TicTacToe.ExitValue.PlayerWins:
              beautify(2,"green");
			  Players[2]++;
              break;
            case TicTacToe.ExitValue.NobodyWins:
				alert("Nobody won!");
               resetGame();
               break;
          }
		  updateResult();
	}
	function beautify(player,color){
                for (var column = 0; column < BOARD_SIZE; column++)
                {
                    if (Board[0][column] == player && Board[1][column] == player
                            && Board[2][column] == player)
                    {
                         $("#"+dir[0][column]).css("background-color", color);
						$("#"+dir[1][column]).css("background-color", color);
						$("#"+dir[2][column]).css("background-color", color);
                    }
                }

                for (var row = 0; row < BOARD_SIZE; row++)
                {
                    if (Board[row][0] == player && Board[row][1] == player
                            && Board[row][2] == player)
                    {
                        $("#"+dir[row][0]).css("background-color", color);
						$("#"+dir[row][1]).css("background-color", color);
						$("#"+dir[row][2]).css("background-color", color);
                    }
                }

                if (Board[0][0] == player && Board[1][1] == player
                        && Board[2][2] == player)
                {
                    $("#"+dir[0][0]).css("background-color", color);
					$("#"+dir[1][1]).css("background-color", color);
					$("#"+dir[2][2]).css("background-color", color);
                }
                if (Board[0][2] == player && Board[1][1] == player
                        && Board[2][0] == player)
                {
                    $("#"+dir[0][2]).css("background-color", color);
					$("#"+dir[1][1]).css("background-color", color);
					$("#"+dir[2][0]).css("background-color", color);
                }
            
        }

	function resetGame(){
		location.reload();
	}
	function updateResult(){
		$("span#result1").text(this.Players[1]);
		$("span#result2").text(this.Players[2]);
	}
	init();
	$("#reset").click(function(){
		resetGame();
	})
  $("#board").on("click", "td", function(e) {
	  if(TicTacToe.CheckCurrentBoardState(Board) == TicTacToe.ExitValue.NotFinished)
	  {	  
		var b = new Block(this.id);
		var rect = this.getBoundingClientRect();
		var coor={top:rect.top,
				right:rect.right,
				bottom:rect.bottom,
				left:rect.left
		};
		b.move(coor);
		Board[Math.floor(this.id/3)][this.id%3] = 2;

        var next = TicTacToe.SearchAlphaBeta(Board);
        if (next != null)
        {
			updateCanvas(next);
            if(TicTacToe.CheckCurrentBoardState(Board) != TicTacToe.ExitValue.NotFinished)
			{
				hasWin();
			}
        }
		else{
			hasWin();
		}
	}
	else{
		  hasWin();
	}
   });

});



