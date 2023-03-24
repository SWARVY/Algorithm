#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) {
	int num1 = *(int *)a;
	int num2 = *(int *)b;
	
	if (num1 < num2)
		return -1;
	if (num1 > num2)
		return 1;
	if (num1 == num2)
		return 0;
	
}

int solve() {
	int N, temp;
	scanf("%d", &N);
	
	int arr[N];
	for(int i=0;i<N;i++)
		scanf("%d", &arr[i]);

	qsort(arr, sizeof(arr)/sizeof(int), sizeof(int), compare);
	
	for(int i=0;i<N;i++)
		printf("%d\n", arr[i]);
	
}
int main() {
	solve();
	return 0; 
}