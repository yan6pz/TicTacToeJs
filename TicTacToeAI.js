var TicTacToe=function()
{
		TicTacToe.ExitValue=
    {
        
        NobodyWins:0,
        ComputerWins:1,
        PlayerWins: -1,
        NotFinished :3
    };
        var BOARD_SIZE = 3;
        var NextMoves;
		var maxValue=100000;
		var minValue=-100000;
		
    // this.start=function ()
        // { 

            // //var tiptoe =new TicTacToe();
            // while (this.CheckCurrentBoardState(Board) == this.ExitValue.NotFinished)
            // {
                // Console.WriteLine("your turn : ");
                // Console.Write("row: ");
                // int x = int.Parse(Console.ReadLine());
                // Console.Write("col: ");
                // int y = int.Parse(Console.ReadLine());
                // //TODO: Validation of input
                // Board[x][y] = 2;
                // Print(Board);

                // var next = this.SearchAlphaBeta(Board);
                // if (next != null)
                // {
                    // Board = next;
                    // Print(Board);
                // }

            // }  
        // }
		
        TicTacToe.SearchAlphaBeta=function (state)
        {
            NextMoves  ={};
            var successors = GetPossiblePossitions(state, 1);
            for (var i = 0; i < successors.length; i++)
            {
                var move = ToStringBoard(successors[i]);
                NextMoves[move]= 6;
            }
            var value = MaxPlayerTurn(state, minValue, maxValue);

            //search for the next move with the given value
			for (var key in NextMoves) {
				if (NextMoves[key]==value) {
					return ToInt(key);
				}
			}

            return null;
        }

        function MaxPlayerTurn(state, alpha, beta)
        {
            if (TicTacToe.CheckCurrentBoardState(state) !=TicTacToe.ExitValue.NotFinished)
            {
                return TicTacToe.CheckCurrentBoardState(state);
            }
            var v = minValue;

            var positions = GetPossiblePossitions(state, 1);
            //branching
            for (var i = 0; i < positions.length; i++)
            {

                var min = MinPlayerTurn(positions[i], alpha, beta);
                //if the exit of min is bigger than v we change the current state value with min
                if (min > v)
                {
                    if (ToStringBoard(positions[i]) in NextMoves)
                    {
                        delete NextMoves[ToStringBoard(positions[i])];
                        NextMoves[ToStringBoard(positions[i])]= min;
                    }
                    v = min;
                }
                //beta cut off
                if (v >= beta)
                {
                    return v;
                }
                alpha = Math.max(alpha, v);
            }
            return v;
        }



        function MinPlayerTurn( state, alpha, beta)
        {
            if (TicTacToe.CheckCurrentBoardState(state) !=TicTacToe.ExitValue.NotFinished)
            {
                return TicTacToe.CheckCurrentBoardState(state);
            }
            var v = maxValue;

           var positions = GetPossiblePossitions(state, 2);

            for (var i = 0; i < positions.length; i++)
            {
                v = Math.min(v, MaxPlayerTurn(positions[i], alpha, beta));
                //alpha cut off
                if (v <= alpha)
                {
                    return v;
                }
                beta = Math.min(beta, v);
            }
            return v;
        }

       
        
        TicTacToe.CheckCurrentBoardState= function ( board)
        {
            var result =  [ 1, -1 ];
            for (var player = 1; player <= 2; player++)
            {
                for (var column = 0; column < BOARD_SIZE; column++)
                {
                    if (board[0][column] == player && board[1][column] == player
                            && board[2][column] == player)
                    {
                        return result[player-1];
                    }
                }

                for (var row = 0; row < BOARD_SIZE; row++)
                {
                    if (board[row][0] == player && board[row][1] == player
                            && board[row][2] == player)
                    {
                        return result[player - 1];
                    }
                }

                if (board[0][0] == player && board[1][1] == player
                        && board[2][2] == player)
                {
                    return result[player - 1];
                }
                if (board[0][2] == player && board[1][1] == player
                        && board[2][0] == player)
                {
                    return result[player - 1];
                }
            }

            for (var i = 0; i < BOARD_SIZE; i++)
            {
                for (var j = 0; j < BOARD_SIZE; j++)
                {
                    if (board[i][j] == 0)
                    {
                        return this.ExitValue.NotFinished;
                    }
                }
            }
            return this.ExitValue.NobodyWins;
        }

        function GetPossiblePossitions( board,  player)
        {
            var successors = [];//new List<int[][]>();
            for (var i = 0; i < board.length; i++)
            {
                for (var j = 0; j < board.length; j++)
                {
                    if (board[i][j] == 0)
                    {
                        var newArray = clone(board);
                        newArray[i][j] = player;
                        successors.push(newArray);
                    }
                }
            }
            return successors;
        } 
		
		function clone (existingArray) {
			var newObj = (existingArray instanceof Array) ? [] : {};
			for (i in existingArray) {
				if (i == 'clone') continue;
				if (existingArray[i] && typeof existingArray[i] == "object") {
					newObj[i] = clone(existingArray[i]);
				} else {
					newObj[i] = existingArray[i]
				}
			}
			return newObj;
		}

		function ToStringBoard( board)
        {
            var move = '';
            for (var j = 0; j < board.length; j++)
            {
                for (var k = 0; k < board.length; k++)
                {
                    move+=board[j][k];
                }
            }
            return move.toString();
        }

        function ToInt(board)
        {
            var boardInt = [];
            var charBoard = board.split('');
            for (var i = 0; i < 3; i++)
            {
                boardInt[i] = [];
                for (var j = 0; j < 3; j++)
                {
                    boardInt[i][j] = board[i * 3 + j] - '0';
                }
            }
            return boardInt;
        }
    }

