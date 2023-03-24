#include <stdio.h>
#include <stdlib.h>

typedef struct arr {
	int x;
	int y;
} axis;

int compare(const void *a, const void *b) {
	axis p1 = *(axis *)a;
	axis p2 = *(axis *)b;
	
	if(p1.x > p2.x)
		return 1;
	else if(p1.x < p2.x)
		return -1;
	else {
		if(p1.y > p2.y)
			return 1;
		else if(p1.y < p2.y)
			return -1;
		else
			return 0;
	}
}

int solve() {
	int N;
	scanf("%d", &N);
	
	axis res[N];
	
	for(int i=0;i<N;i++)
		scanf("%d %d", &res[i].x, &res[i].y);

	qsort(res, N, sizeof(axis), compare);
	
	for(int i=0;i<N;i++)
		printf("%d %d\n", res[i].x, res[i].y);
}

int main() {
	solve();
	return 0; 
}