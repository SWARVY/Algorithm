#include <stdio.h>

int solve() {
	int n, max=0;
	scanf("%d", &n);
	// printf("n/3 : %d\n", n/3);
	
	for(int i=0;i<=n/5;i++) {
		if((n - (5 * i)) % 3 == 0) 
			max = i;
	}
		
	if((max * 5) + (((n - (max * 5)) / 3) * 3) == n)
		printf("%d\n", max + ((n - (5 * max)) / 3));
	else
		printf("-1\n");
}
 
int main(){
	solve();
	return 0; 
}