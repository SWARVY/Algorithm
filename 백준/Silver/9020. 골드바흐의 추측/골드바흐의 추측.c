#include <stdio.h>

int solve() {
	int N, arr[10001];
	scanf("%d", &N);
	
	for(int i=0;i<N;i++)
		arr[i] = i;
	
	for(int i=2;i<=N;i++) {
		if(arr[i] == 0)
			continue;
		for(int j=i*2;j<=N;j+=i) {
			if(arr[j] % i == 0)
				arr[j] = 0;
		}
	}
	
	for(int i=N/2;i<=N;i++) {
		for(int j=N/2;j>=0;j--) {
			if(arr[i] + arr[j] == N) {
				printf("%d %d\n", arr[j], arr[i]);
				return 0;
			}
		}
	}	

}
 
int main() {
	int test;
	scanf("%d", &test);
	for(int i=0;i<test;i++) {
		solve();	
	}
	return 0; 
}