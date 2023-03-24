#include <stdio.h>

int solve() {
	int num[100], cnt[100] = {0}, test, res = 0;
	
	scanf("%d", &test);
	for(int i=0;i<test;i++){
		scanf("%d", &num[i]);
	}
	
	for(int i=0;i<test;i++) {
		for(int j=1;j<=num[i];j++) {
			if(num[i] % j == 0) {
				cnt[i] += 1;
			}
		}
	}
	
	for(int i=0;i<test;i++) {
		if(cnt[i] == 2)
			res++;
	}

	printf("%d\n", res);
}
 
int main() {
	solve();
	return 0; 
}