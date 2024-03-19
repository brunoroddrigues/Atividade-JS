#include "stdio.h"
void exibe_palavra(char entrada[])
{
	printf("%s", entrada);	
}

int main()
{
	char palavra[47];
	printf("Digite uma palavra");
	scanf("%s",&palavra);
	exibe_palavra(palavra);
	return 0;
}
