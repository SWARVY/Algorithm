#include <stdio.h>
#define size 10001

int C[size] = {0};

int main() {
	int test, temp;
	scanf("%d", &test);
	
	for(int i=0;i<test;i++) {
		scanf("%d", &temp);
		C[temp]++;
	}
	
	for(int i=0;i<=size;i++) {
		if(C[i] == 0)
			continue;
		
		for(int j=0;j<C[i];j++)
			printf("%d\n", i);
	}
	
	return 0; 
}