#include "stdio.h"
int soma (int l, int k) 
{
	int soma;
	soma=k+l;
	return soma;	
}

int main()
	
{
	int k,l,adicao;
	printf("digite um numero");
	scanf("%i", & k);
	printf("digite outro numero");
	scanf("%i", & l);
	adicao=soma(k,l);
	printf("o resultado e: %i", adicao);	
	
	return 0;
		
}

