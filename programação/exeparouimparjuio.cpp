#include"stdio.h"
int main()
{
   int julio;
   char j;
  // printf("Digite um numero:\t");
  // scanf("%i",& julio);
   do{
   		 printf("Digite um numero:\t");
  		 scanf("%i",& julio);
   		
		   if(julio%2==0 and julio!=0)
		{
	   		printf("O numero %i eh par.",julio);
	   	}
	    else if(julio==0)
		{
	    	printf("dsclpe mas n posso fazer com esse numero.");
		}
		else{
			printf("O numero %i eh impar.",julio);
		}
		printf("\nDeseja fazer de novo essa operacao: ");
		scanf(" %c", &j);
   
	}while(j=='s');
  return 0;
   	   	
}
