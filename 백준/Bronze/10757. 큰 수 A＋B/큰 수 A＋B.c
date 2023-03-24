#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char reverse(char arr[]) {
	char temp;
	int arrlen = strlen(arr);
	
	for(int i=0;i<arrlen/2;i++) {
		temp = arr[i];
		arr[i] = arr[(arrlen-1)-i];
		arr[(arrlen-1)-i] = temp;
	}
}

int solve() {
	char arr_1[10002] = {0};
	char arr_2[10002] = {0};
	char sum[10003] = {0};
	int max = 0, sign = 0, temp;
	
	scanf("%s %s", arr_1, arr_2);
	
	if(strlen(arr_1) >= strlen(arr_2))
		max = strlen(arr_1);
	else
		max = strlen(arr_2);
	
	reverse(arr_1);
	reverse(arr_2);
		
	for(int i=0;i<max;i++) {
		//자릿수 계산~
		temp = arr_1[i] - 48 + arr_2[i] - 48 + sign;
		
		if(temp < 0) 
			temp += 48;
		if(temp > 9)
			sign = 1;
		else
			sign = 0;
		
		sum[i] = temp % 10 + 48;
	}
	
	if(sign == 1)
		sum[max] = '1';
	
	reverse(sum);
	printf("%s\n", sum);
}
 
int main(){
	solve();
	return 0; 
}