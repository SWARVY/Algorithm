#include <stdio.h>

int solve() {
	int M, N, cur, min = 10000, res = 0, check = 0, exist = 0;
	scanf("%d", &M);
	scanf("%d", &N);
	
	cur = M;
	
	while(cur <= N) {
		for(int j=1;j<=cur;j++) {
			if(cur % j == 0)
				check++;
		}
		
		if(check == 2) {
			exist = 1;
			res += cur;
			if(min > cur)
				min = cur;
		}
		check = 0;
		cur++;
	}
	
	if(exist) {
		printf("%d\n", res);
		printf("%d\n", min);
	}else
		printf("-1\n");

}
 
int main() {
	solve();
	return 0; 
}