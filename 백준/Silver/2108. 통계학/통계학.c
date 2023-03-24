#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int compare(const void *a, const void *b) {
	int num1 = *(int *)a;
	int num2 = *(int *)b;
	
	if (num1 > num2)
		return 1;
	else if(num1 < num2)
		return -1;
	else if(num1 == num2)
		return 0;
	
}

int solve() {
	int N, sum = 0, freq = 0, range = 0;
	int cnt[8001] = {0,}, check[8001] = {0,};
	scanf("%d", &N);
	
	int arr[N];
	
	for(int i=0;i<N;i++) {
		scanf("%d", &arr[i]);
		if(arr[i] >= 0)
			cnt[arr[i]+4000]++;
		else
			cnt[4000-abs(arr[i])]++;
	}
	
	//산술평균을 위한 합 구하기
	for(int i=0;i<N;i++)
		sum += arr[i];
	
	//중앙값 계산을 위한 배열 정렬
	qsort(arr, sizeof(arr)/sizeof(int), sizeof(int), compare);
	
	//최빈값 계산
	for(int i=0;i<8001;i++) {
		if(cnt[i] >= freq)
			freq = cnt[i];
	}
	
	int temp = 0;
	for(int i=0;i<8001;i++) {
		if(freq == cnt[i]) {
			check[temp] = i;
			temp++;
		}
	}

	//산술평균
	if((double)sum/(double)N > -0.5 && (double)sum/(double)N < 0)
		printf("%d\n", 0);
	else
		printf("%.0lf\n", (double)sum/(double)N);
	//중앙값
	printf("%d\n", arr[N/2]);
	//최빈값
	if(temp == 1)
		printf("%d\n", check[0]-4000);
	else
		printf("%d\n", check[1]-4000);
	//범위
	printf("%d\n", arr[N-1]-arr[0]);
}

int main() {
	solve();
	return 0; 
}