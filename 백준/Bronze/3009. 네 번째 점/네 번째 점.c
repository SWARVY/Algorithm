#include <stdio.h>

int solve() {
	int axis[3][2];
	for(int i=0;i<3;i++) {
		for(int j=0;j<2;j++) {
			scanf("%d", &axis[i][j]);
		}
	}
	
	if(axis[0][0] != axis[1][0] && axis[0][0] != axis[2][0])
		printf("%d ", axis[0][0]);
	else if(axis[1][0] != axis[0][0] && axis[1][0] != axis[2][0])
		printf("%d ", axis[1][0]);
	else if(axis[2][0] != axis[0][0] && axis[2][0] != axis[1][0])
		printf("%d ", axis[2][0]);
	
	if(axis[0][1] != axis[1][1] && axis[0][1] != axis[2][1])
		printf("%d\n", axis[0][1]);
	else if(axis[1][1] != axis[0][1] && axis[1][1] != axis[2][1])
		printf("%d\n", axis[1][1]);
	else if(axis[2][1] != axis[0][1] && axis[2][1] != axis[1][1])
		printf("%d\n", axis[2][1]);
}
 
int main() {
	solve();
	return 0; 
}