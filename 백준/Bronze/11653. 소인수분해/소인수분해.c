#include <stdio.h>

int solve() {
	int N, div = 2;
	scanf("%d", &N);
	
	if(N == 1) {
		return 0;
	}
	
	while(N != 1) {
		if(N % div == 0) {
			N /= div;
			printf("%d\n", div);
		}else
			div++;
	}
}
 
int main() {
	solve();
	return 0; 
}