#include "stdio.h"
void soma(int a, int b)//define que a função precisa receber 2 entradas.
{
	int res;
	res=a + b;
	printf("A soma de %d + %d = %d.",a ,b, res);
}

int main()
{
	soma(5, 10);
	return 0;
}
