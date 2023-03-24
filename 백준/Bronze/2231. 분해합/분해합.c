#include <stdio.h>

int solve() {
	int N, sum, temp, check = 0;
	scanf("%d", &N);
		
	for(int i=1;i<N;i++) {
		//분해합 계산
		temp = i;
		sum = i;
		
		while(temp > 0) {
			sum += temp % 10;
			temp /= 10;
		}
		
		//분해합과 N이 같으면 출력
		if(sum == N) {
			printf("%d\n", i);
			check = 1;
			break;
		}
	}
	
	if(check == 0)
		printf("0\n");
}
 
int main() {
	solve();
	return 0; 
}