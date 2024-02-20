class ChessGame:
    def __init__(self):
        self.board = [
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['d1', 'd2', 'd3', 'd4', ' ', ' ', ' ', ' '],
            ['c1', 'c2', 'c3', 'c4', ' ', ' ', ' ', ' '],
            ['b1', 'b2', 'b3', 'b4', ' ', ' ', ' ', ' '],
            ['a1', 'a2', 'a3', 'a4', ' ', ' ', ' ', ' '],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
        ]
        self.current_player = 'white'

    def print_board(self):
        for row in self.board:
            print(" ".join(str(piece) for piece in row))
        print()

    def is_valid_move(self, start, end):
        start_row, start_col = 8 - int(start[1]), ord(start[0]) - ord('a')
        end_row, end_col = 8 - int(end[1]), ord(end[0]) - ord('a')

        piece = self.board[start_row][start_col]
        if piece.islower() and self.current_player == 'white':
            return False
        elif piece.isupper() and self.current_player == 'black':
            return False

        # Implement basic movement rules (can be expanded)
        if piece.lower() == 'p':
            direction = 1 if piece.islower() else -1
            if start_col == end_col and self.board[end_row][end_col] == ' ':
                return (end_row, end_col) == (start_row + direction, start_col)
            elif abs(start_col - end_col) == 1 and end_row == start_row + direction:
                return self.board[end_row][end_col].isupper() if piece.islower() else self.board[end_row][end_col].islower()
        # Implement more rules for other pieces

        return False

    def move_piece(self, start, end):
        if self.is_valid_move(start, end):
            start_row, start_col = 8 - int(start[1]), ord(start[0]) - ord('a')
            end_row, end_col = 8 - int(end[1]), ord(end[0]) - ord('a')

            self.board[end_row][end_col] = self.board[start_row][start_col]
            self.board[start_row][start_col] = ' '
            self.current_player = 'black' if self.current_player == 'white' else 'white'
            return True
        else:
            print("Invalid move!")
            return False


if __name__ == "__main__":
    game = ChessGame()

    while True:
        game.print_board()
        start_pos = input(f"{game.current_player.capitalize()}'s turn. Enter the piece position to move (e.g., a2): ")
        end_pos = input("Enter the destination position (e.g., a4): ")

        if game.move_piece(start_pos, end_pos):
            continue
