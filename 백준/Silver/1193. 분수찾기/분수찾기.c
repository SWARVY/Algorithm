#include <stdio.h>

int main() {
	int num, max = 0;
	scanf("%d", &num);
		
	while(num > 0) {
		max++;
		num -= max;
	}
		
	if(max % 2 == 0) {
		printf("%d/%d\n", max+num, 1+(-num));
	}else {
		printf("%d/%d\n", 1+(-num), max+num);
	}
	
	return 0;
}