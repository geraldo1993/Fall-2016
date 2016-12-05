# Comp-3318-Operating-system


# CPU-Process-Scheduling-Algorithms
CPU Process Scheduling Algorithms: FCFS; SJN; SRT; ROUND ROBIN; EDF; This program is stimulating those algorithms cycle by cycle.

A Process Scheduler schedules different processes to be assigned to the CPU based on particular scheduling algorithms. There are six popular process scheduling algorithms which we are going to discuss in this chapter −

  First-Come, First-Served (FCFS) Scheduling
  Shortest-Job-Next (SJN) Scheduling
  Shortest Remaining Time(SRT)
  Round Robin(RR) Scheduling
  Earliest Deadline First(EDF)
  
These algorithms are either non-preemptive or preemptive. Non-preemptive algorithms are designed so that once a process enters the running state, it cannot be preempted until it completes its allotted time, whereas the preemptive scheduling is based on priority where a scheduler may preempt a low priority running process anytime when a high priority process enters into a ready state.

# First Come First Serve (FCFS)                                                                               
  Jobs are executed on first come, first serve basis.                                                                               
  It is a non-preemptive, pre-emptive scheduling algorithm.                                                       
  Easy to understand and implement.                                                                                   
  Its implementation is based on FIFO queue.                                                                            
  Poor in performance as average wait time is high.
  
# Shortest Job Next (SJN)                                                                                       
  This is also known as shortest job first, or SJF.                                                                     
  This is a non-preemptive, pre-emptive scheduling algorithm.                                                                 
  Best approach to minimize waiting time.                                                                               
  Easy to implement in Batch systems where required CPU time is known in advance.                                         
  Impossible to implement in interactive systems where required CPU time is not known.                                        
  The processer should know in advance how much time process will take.
 
# Shortest Remaining Time(SRT)                                                                          
  Shortest remaining time (SRT) is the preemptive version of the SJN algorithm.                                                 
  The processor is allocated to the job closest to completion but it can be preempted by a newer ready job with shorter time to completion.                                                                                                           
  Impossible to implement in interactive systems where required CPU time is not known.                                          
  It is often used in batch environments where short jobs need to give preference.
  
# Round Robin Scheduling(RR)                                                                    
  Round Robin is the preemptive process scheduling algorithm.                                                               
  Each process is provided a fix time to execute, it is called a quantum.                                                       
  Once a process is executed for a given time period, it is preempted and other process executes for a given time period.         
  Context switching is used to save states of preempted processes.
 
# Earliest Deadline First(EDF)                                                              
  Priority scheduling is a non-preemptive algorithm and one of the most common scheduling algorithms in batch systems.                
  Each process is assigned a priority. Process with highest priority is to be executed first and so on.                           
  Processes with same priority are executed on first come first served basis.                                                   
  Priority can be decided based on memory requirements, time requirements or any other resource requirement.
  
  
  
  
  
