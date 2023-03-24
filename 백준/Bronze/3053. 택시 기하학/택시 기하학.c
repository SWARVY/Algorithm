#include <stdio.h>
#include <math.h>
#define _USE_MATH_DEFINES

int solve() {
	float a;
	scanf("%f", &a);
	
	printf("%f\n", M_PI * pow(a, 2));
	printf("%f\n", pow(sqrt(2) * a, 2));
}
 
int main() {
	solve();
	return 0; 
}