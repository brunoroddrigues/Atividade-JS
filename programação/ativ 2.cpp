//exibe mensagem
#include "stdio.h"
int main()
{
	int var1=15;//cria um int na memoria
	char var2='l';//cria um char - aspas simples
	char var3[10]="Lima";
	float var4=1.78;//cria um float ou decimal
	printf("O numero na var1 eh: %i\n", var1);
	printf("A letra eh: %c\n", var2);// \n cria uma nova linha
	printf("O sobrenome eh: %s\n", var3);
	printf("Minha altura eh: %.2f\n", var4);
	printf("Uso\tdo\ttab");//tab cria espaços pre definidos
	return 0;//retorno da função
}

