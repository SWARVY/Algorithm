#include <stdio.h>

int solve() {
	int M, N, res[1000001];
	scanf("%d %d", &M, &N);
	
	for(int i=2;i<=N;i++) {
		res[i] = i;
	}
	
	for(int i=2;i<=N;i++) {
		if(res[i] == 0)
			continue;
		for(int j=i*2;j<=N;j+=i) {
			res[j] = 0;
		}
	}
	
	for(int i=M;i<=N;i++) {
		if(res[i] != 0)
			printf("%d\n", res[i]);
	}
}
 
int main() {
	solve();
	return 0; 
}