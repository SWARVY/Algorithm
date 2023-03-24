#include <stdio.h>
#include <math.h>

int solve() {
	float x, y, w, h;
	scanf("%f %f %f %f", &x, &y, &w, &h);
	
	if(x >= w && y >= h)
		printf("%.0f\n", sqrt(pow(x-w, 2) + pow(y-h, 2)));
	else if(x > w && y < h)
		printf("%.0f\n", x - w);
	else if(x < w && y > h)
		printf("%.0f\n", y - h);
	else if(x < w && y < h) {
		if(x <= w-x && x <= h-y && x <= y)
			printf("%.0f\n", x);
		if(w-x < x && w-x < h-y && w-x < y)
			printf("%.0f\n", w-x);
		if(h-y < x && h-y < w-x && h-y < y)
			printf("%.0f\n", h-y);
		if(y < x && y < w-x && y < h-y)
			printf("%.0f\n", y);
	}
}
 
int main() {
	solve();
	return 0; 
}