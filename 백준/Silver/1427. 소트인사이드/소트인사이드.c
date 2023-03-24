#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) {
	return *(int *)b - *(int *)a;	
}

int solve() {
	int N, temp, size = 0;
	scanf("%d", &N);
	
	temp = N;
	
	while(temp > 0) {
		temp /= 10;
		size++;
	}
	
	int res[size];
	for(int i=0;i<size;i++)
		res[i] = 0;
	
	temp = N;
	
	for(int i=0;i<size;i++) {
		res[i] = temp % 10;
		temp /= 10;
	}
	
	qsort(res, sizeof(res)/sizeof(int), sizeof(int), compare);
	
	for(int i=0;i<size;i++)
		printf("%d", res[i]);
	
}

int main() {
	solve();
	return 0; 
}