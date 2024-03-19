#include "stdio.h"
 int main()
 {
 	float n , media , soma, qtd;
 	char resp ;
 	do{
 	printf("insira uma nota ");
 	scanf("%f", &n);
 	printf("pressione s para inserir mais uma nota ");
 	scanf(" %c", & resp);
 	soma=soma+n;
 	 qtd++;
	 } while ( resp == 's');
	 media=soma/qtd;
	 printf (" a media eh %.2f", media);
	 return 0;
 }
