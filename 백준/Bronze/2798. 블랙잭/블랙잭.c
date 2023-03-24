#include <stdio.h>

int solve() {
	int N, M, min = 99999, sum = 0;
	int arr[100];
	scanf("%d %d", &N, &M);
	
	for(int i=0;i<N;i++) {
		scanf("%d", &arr[i]);
	}
	
	for(int i=0;i<N-2;i++) {
		for(int j=i+1;j<N-1;j++) {
			for(int k=j+1;k<N;k++) {
				if(M - (arr[i] + arr[j] + arr[k]) <= min && M - (arr[i] + arr[j] + arr[k]) >= 0) {
					min = M - (arr[i] + arr[j] + arr[k]);
					sum = arr[i] + arr[j] + arr[k];
				}
			}
		}
	}
	
	printf("%d\n", sum);
}
 
int main() {
	solve();
	return 0; 
}