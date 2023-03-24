#include <stdio.h>

int solve() {
	int x, y, res, cnt = 2;
	scanf("%d %d", &x, &y);

	int distance = y - x;
	
	if(distance <= 3) {
		printf("%d\n", distance);
	}else {
		distance -= 2;
		res = 2;
		
		while(distance != 0) {
			if(distance / cnt >= 2) {
				distance -= 2 * cnt;
				res += 2;
				cnt++;
			}else{
				if(distance < cnt) {
					res++;
					distance = 0;
				}else if(distance >= cnt) {
					if(distance % cnt == 0)
						res++;
					else
						res += 2;
					distance -= cnt + distance % cnt; 
				}
			}
		}
		printf("%d\n", res);
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