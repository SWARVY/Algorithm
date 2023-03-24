#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct arr {
	char word[51];
	int length;
} words;

int compare(const void *a, const void *b) {
	words str1 = *(words *)a;
	words str2 = *(words *)b;
	
	if(str1.length > str2.length)
		return 1;
	else if(str1.length < str2.length)
		return -1;
	else 
		return strcmp(str1.word, str2.word);
}

int solve() {
	int N;
	scanf("%d", &N);
	
	words res[N];
	for(int i=0;i<N;i++) {
		scanf("%s", &res[i].word);
		res[i].length = strlen(res[i].word);
	}
	
	qsort(res, N, sizeof(res[0]), compare);

	
	for(int i=0;i<N;i++) {
		if(strcmp(res[i-1].word, res[i].word) != 0)
			printf("%s\n", res[i].word);
	}

}

int main() {
	solve();
	return 0; 
}