#include <stdio.h>

int main() {
	
  	int A_price, B_price, C_price;
  	scanf("%d %d %d", &A_price, &B_price, &C_price);
	
	if(C_price - B_price <= 0) {
		printf("-1\n");
	}else{
		printf("%d", A_price/(C_price-B_price) + 1);
	}
	
	return 0;
}