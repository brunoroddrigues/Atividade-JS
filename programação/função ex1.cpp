#include "stdio.h"
int exibepalavra()
{
	char palavra[47];
	printf("Digite uma palavra: ");
	scanf(" %s",&palavra);
	printf("%s",palavra);
	return 0;	
}

int main()
{
	exibepalavra();
	return 0;
}
