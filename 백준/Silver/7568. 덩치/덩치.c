#include <stdio.h>

int solve() {
	int N, rank = 1;
	scanf("%d", &N);
	
	int size[N][3];
	
	for(int i=0;i<N;i++) {
		scanf("%d %d", &size[i][0], &size[i][1]);
		size[i][2] = 0;
	}
	
	
	for(int i=0;i<N;i++) {
		rank = 1;
		for(int j=0;j<N;j++) {
			if(size[i][0] < size[j][0] && size[i][1] < size[j][1])
				rank++;
		}
		size[i][2] = rank;
	}
	
	for(int i=0;i<N;i++) 
		printf("%d ", size[i][2]);
	printf("\n");
}
 
int main() {
	solve();
	return 0; 
}