#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) {
	return *(int *)a - *(int *)b;
}

int unique(int *res, int size) {
    int i, j = 0;

    for(i=1;i<size;i++) {
        if(res[j] == res[i])
            continue;
        res[++j] = res[i];
    }

    return ++j;
}

int binarysearch(int *res, int size, int key) {
    int low = 0, high = size - 1, mid;

    while(low <= high) {
        mid = (low + high) / 2;
        if(res[mid] < key)
            low = mid + 1;
        else if(res[mid] > key)
            high = mid - 1;
        else
            return mid;
    }
}

int solve() {
	int test;
	scanf("%d", &test);
	
	int input[test], rank[test];
	for(int i=0;i<test;i++) {
		scanf("%d", &input[i]);
		rank[i] = input[i];
	}
	
	qsort(rank, test, sizeof(int), compare);
    
    int cnt = unique(rank, test);
    for(int i=0;i<test;i++) {
        int temp = binarysearch(rank, cnt, input[i]);
        printf("%d ", temp);
    }
	printf("\n");
	
}

int main() {
	solve();
	return 0; 
}