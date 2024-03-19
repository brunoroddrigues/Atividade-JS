#include"stdio.h"
int main()
{
	int v1,v2,v3,v4,voto;
	char resp; 
	printf("Os candidatos sao 20 -- Julio, 05 -- Bruno, 17 -- Paloma, 15 -- Alan\n");
	do
	{
		printf("Escolha um candidato para votar\n");
		printf("Insira o seu voto:\t");
		scanf("%i", & voto);
		if(voto==5) 
		{
			v1++;
		printf ("Voce votou no bruno\n ");
		}
		else if (voto==15)
		{
			v2++;
			printf("Voce votou no allan\n");	
		}		
	
		else if (voto==17)
		{
			v3++;
			printf("Voce votou na paloma\n");
		}
		
		else if (voto==20)
		{
			v4++;
			printf("Voce votou no julio\n");
		}
		else
		{
			printf("Seu voto foi equivocado e nao foi computado, por favor leia as instrucoes");	
		}
		printf("\n Se deseja votar novamente pressione s: ");
		scanf(" %c", & resp);
	} while ( resp=='s');
	printf("Fim da votacao\n");
	
	printf("Julio teve %i votos\n",v4);
	printf("Paloma teve %i votos\n",v3);
	printf("Allan teve %i votos\n",v2);
	printf("Bruno teve %i votos\n",v1);
	return 6;
	
		
	
}
