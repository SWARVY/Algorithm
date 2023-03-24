#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int solve() {
	int x1, x2, y1, y2, r1, r2, cnt;
	scanf("%d %d %d %d %d %d", &x1, &y1, &r1, &x2, &y2, &r2);
	
	float distance = sqrt(pow(x1-x2, 2) + pow(y1-y2, 2));
	
	if(distance == 0 && r1 == r2)
		cnt = -1;
	else if(abs(r1-r2) < distance && distance < r1+r2)
		cnt = 2;
	else if(r1+r2 == distance || abs(r1-r2) == distance)
		cnt = 1;
	else
		cnt = 0;
	
	printf("%d\n", cnt);
}
 
int main() {
	int test;
	scanf("%d", &test);
	for(int i=0;i<test;i++) {
		solve();
	}
	return 0; 
}