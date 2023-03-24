#include <stdio.h>

int solve() {
	int N, cnt = 0, temp = 1, cur = 0, i = 0;
	scanf("%d", &N);
	
	while(cur < N){
		temp = i;
		while(temp > 0) {
			if(temp % 10 == 6)
				cnt++;
			else
				cnt = 0;
			
			if(cnt == 3) {
				cur++;
				if(cur == N)
					printf("%d\n", i);
			}
			
			temp /= 10;
		}
		
		cnt = 0;
		i++;
	}
}
 
int main() {
	solve();
	return 0; 
}