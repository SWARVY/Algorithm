#include <stdio.h>
#include <math.h>

int solve() {
	int a = 1, b = 1, c = 1;
	while(a != 0 && b != 0 && c != 0) {
		scanf("%d %d %d", &a, &b, &c);
		
		if(a == 0 && b == 0 && c == 0)
			break;

		if(a >= b && a >= c) {
			if(pow(a, 2) == pow(b, 2) + pow(c, 2))
				printf("right\n");
			else
				printf("wrong\n");
		}

		if(b > a && b > c) {
			if(pow(b, 2) == pow(a, 2) + pow(c, 2))
				printf("right\n");
			else
				printf("wrong\n");
		}

		if(c > b && c > a) {
			if(pow(c, 2) == pow(b, 2) + pow(a, 2))
				printf("right\n");
			else
				printf("wrong\n");
		}
	}
}
 
int main() {
	solve();
	return 0; 
}