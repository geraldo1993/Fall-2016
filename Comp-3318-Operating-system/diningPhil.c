// Solution to Philosopher problem using semaphores

#include <windows.h>
#include <stdio.h>
#include <assert.h>
#include <time.h>

#define    PHILOSOPHERS    5

volatile HANDLE hSemEat=NULL; // handle to see who attempts to eat
volatile HANDLE hSemChopSticks[PHILOSOPHERS]; // binary semaphores for each chop stick
volatile HANDLE hPhilosophers[PHILOSOPHERS]; // Handle to Philosphers

volatile BOOL bStopPhilosophers[PHILOSOPHERS]; // tell philosphers to stop

///////////////// Thread Code //////////////////////////
void Philospher(int Id) // Id - 0 .... PHILOSPHERS-1
    {
    	srand (time(NULL)*Id);
    for(;;)
        {
        printf("Philosopher #%d - Thinking...\n",Id);

        if(bStopPhilosophers[Id]==TRUE) { ExitThread(0); }
       	//Sleep(1);
        //WaitForSingleObject(hSemEat,INFINITE); // wait till turn to eat

            // Pick Chop Sticks
        printf("Philosopher #%d - is waiting to get chopstick%d\n",Id,Id);
        WaitForSingleObject(hSemChopSticks[Id],INFINITE);
        printf("Philosopher #%d - got chopstick %d\n",Id, Id);
        Sleep(rand()%3);
        printf("Philosopher #%d - is waiting to get chopstick %d\n",Id, (Id+1)%PHILOSOPHERS);
		WaitForSingleObject(hSemChopSticks[(Id+1)%PHILOSOPHERS],INFINITE);
		printf("Philosopher #%d - got chopstick %d\n",Id,(Id+1)%PHILOSOPHERS);
        printf("Philosopher #%d - Eating...\n",Id);
		Sleep(rand()%14);
            // put down Chop Stick
        printf("Philosopher #%d - Stopped Eating...\n",Id);
        ReleaseSemaphore(hSemChopSticks[(Id+1)%PHILOSOPHERS],1,NULL);
        printf("Philosopher #%d - left chopstick %d\n", Id,(Id+1)%PHILOSOPHERS);
        ReleaseSemaphore(hSemChopSticks[Id],1,NULL);
        printf("Philosopher #%d - left chopstick %d\n",Id,(Id)%PHILOSOPHERS);

        //ReleaseSemaphore(hSemEat,1,NULL); // release right to eat

        }
    }



///////////////// Create Philosophers //////////////////////
void CreatePhilosophers(void)
    {    int i;
    for(i=0;i<PHILOSOPHERS;++i)
        {    DWORD dwThreadID;
        bStopPhilosophers[i]=FALSE; // set flag off for stoping

        hPhilosophers[i]=CreateThread(NULL,0
            ,(LPTHREAD_START_ROUTINE)Philospher
            ,(LPVOID)i,0,&dwThreadID);

        assert(hPhilosophers[i]!=NULL);
        }
    }



////////////////////// CreateSemaphores /////////////////////////
void CreateSemaphores(void)
    {    int i;
        // create eating semaphore
    hSemEat=CreateSemaphore(NULL,PHILOSOPHERS/2,PHILOSOPHERS/2,NULL);
    assert(hSemEat!=NULL);

    for(i=0;i<PHILOSOPHERS;++i)
        {
        hSemChopSticks[i]=CreateSemaphore(NULL,1,1,NULL);
        assert(hSemChopSticks[i]!=NULL);
        }
    }


///////////////////
void AttemptToStop(void)
    {    int i;
    printf("Attempting to stop all threads...\n\a");
    for(i=0;i<PHILOSOPHERS;++i)
        { bStopPhilosophers[i]=TRUE; }

        // wait for all threads to finish
    WaitForMultipleObjects(PHILOSOPHERS,(CONST HANDLE *)hPhilosophers,TRUE,INFINITE);
    }

/////////////////// Close All Handles //////////////////////////
void CloseAllHandles(void)
    {    int i;
    for(i=0;i<PHILOSOPHERS;++i)
        {
        CloseHandle(hPhilosophers[i]);
        CloseHandle(hSemChopSticks[i]);
        }

    CloseHandle(hSemEat);
    }


/////////////////// Main //////////////////////////////////
int main(void)
    {
    printf("Press <Return> to Start/Stop:\n"); getchar();
    CreateSemaphores(); CreatePhilosophers();

    getchar();

    AttemptToStop(); CloseAllHandles(); ExitProcess(0);

    return 0; // return never reached
    }
