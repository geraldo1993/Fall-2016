/* Includes */
#include <stdio.h>      /* Input/Output */
#include <stdlib.h>     /* General Utilities */
#include <pthread.h>    /* POSIX Threads */
#include <string.h>     /* String handling */
#include <semaphore.h>  /* Semaphore */


/* prototype for thread routine */
void sisters_process   (void *ptr);
void brothers_process  (void *ptr);

int withdraw  (int bal);
int deposit   (int bal);

/* global vars */
/* semaphores are declared global so they can be accessed
   in main() and in thread routine,
   here, the semaphore is used as a mutex */
sem_t account;
int balance = 0;



int main()
{
    int i[15];
    pthread_t brothers[15];
    pthread_t sisters [15];
    int j;
    for(j=0; j<15 ; j++)
    {
    	i[j]=j;
	}


/* third parameter = 1 initialize semaphore  to 1 which makes it mutex  */
/* second param = 0 - semaphore is local */
	sem_init(&account, 0, 1);



/* Note: you can check if thread has been successfully created by checking return value of pthread_create */
	for(j=0; j<=4 ; j++)
    {
    	pthread_create (&brothers[j], NULL, (void *) &brothers_process, (void *) &i[j]);

	}

	for(j=0; j<=4 ; j++)
    {
    	pthread_create (&sisters[j], NULL,  (void *)  &sisters_process, (void *) &i[j]);

	}

   	for(j=0; j<=4 ; j++)
    {

		pthread_join(brothers[j], NULL);
		pthread_join(sisters[j], NULL);



	}

  
    
    sem_destroy(&account); /* destroy semaphore */


    printf("Balance at the end is %d\n",  balance);


    /* exit */
    exit(0);
}  /* main() */

void sisters_process ( void *ptr )
{
    int x, balance_after_operation;
    x = *((int *) ptr);


    Sleep(rand()%1500);
    sem_wait(&account);
  	balance_after_operation = withdraw(balance);
  	balance = balance_after_operation;
    sem_post(&account);
  	printf("Sister %d: withdraw 90 dolars, balance = %d \n", x, balance_after_operation);

    pthread_exit(0); /* exit thread */
}
void brothers_process ( void *ptr )
{
    int x,balance_after_operation;
    x = *((int *) ptr);


    Sleep(rand()%1500);

    sem_wait(&account);
  	balance_after_operation = deposit(balance);
  	balance = balance_after_operation;
    sem_post(&account);
  	printf("Brother %d: deposit 100 dolars,  balance = %d \n", x, balance_after_operation);

    pthread_exit(0); /* exit thread */
}

int withdraw ( int bal)
{
	Sleep(rand()%100);
	return bal -90;
}

int deposit ( int bal)
{
	Sleep(rand()%250);
	return bal +100;
}
