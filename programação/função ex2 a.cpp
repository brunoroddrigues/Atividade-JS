#include "stdio.h"
int soma(int a,int b)
{
	int soma;
	soma = a + b;
	return soma;
}
int main()
{
	int a, b, resultado;
	printf("Digite um valor para A e B: \n");
	printf("A: ");
	scanf("%d",&a);
	printf("B: ");
	scanf("%d",&b);
	resultado = soma(a,b);
	printf("A soma de %d e %d eh %d",a, b, resultado);
	return 0;
}
