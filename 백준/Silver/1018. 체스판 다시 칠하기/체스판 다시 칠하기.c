#include <stdio.h>

int solve() {
	int M, N, start_x = 0, start_y = 0; 
	int cnt = 0, min = 99999;
	char A, B;
	char board[100][100];

	scanf("%d %d", &M, &N);
	
	for(int i=0;i<M;i++)
		scanf("%s", board[i]);
	
	while(start_y + 8 <= M){

		// printf("%d %d %c\n", start_y, start_x, A);
		
		//시작점이 (start_x, start_y)일때 체스판 색 교체 횟수 측정
		for(int a=0;a<=1;a++) {
			if(a == 0)
				A = 'W';
			else if(a == 1)
				A = 'B';
			
			for(int i=start_y;i<start_y+8;i++) {

				if(A == board[i][start_x]) {
					if(board[i][start_x] == 'B')
						B = 'W';
					else if(board[i][start_x] == 'W')
						B = 'B';
				}else if(A != board[i][start_x]) {
					if(board[i][start_x] == 'B') {
						B = 'B';
						cnt++;
					}else if(board[i][start_x] == 'W') {
						B = 'W';
						cnt++;
					}
				}

				for(int j=start_x+1;j<start_x+8;j++) {
					if(B == board[i][j]) {
						if(board[i][j] == 'B')
							B = 'W';
						else if(board[i][j] == 'W')
							B = 'B';
					}else if(B != board[i][j]) {
						if(board[i][j] == 'B') {
							B = 'B';
							cnt++;
						}
						else if(board[i][j] == 'W') {
							B = 'W';
							cnt++;
						}
					}
				}

				if(A == 'B')
					A = 'W';
				else if(A == 'W')
					A = 'B';

			}
			
			// printf("%c cnt : %d\n\n", A, cnt);
			
			if(min > cnt)
			min = cnt;
			
			cnt = 0;
		}
				
		if(start_x+8 == N) {
			start_x = 0;
			start_y++;
		}else
			start_x++;	
		
	}
	
	printf("%d\n", min);
}
int main() {
	solve();
	return 0; 
}